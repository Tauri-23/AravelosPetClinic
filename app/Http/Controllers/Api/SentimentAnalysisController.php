<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\feedbacks;
use App\Models\sentiment_analysis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use PhpOffice\PhpSpreadsheet\IOFactory;

class SentimentAnalysisController extends Controller
{
    public function GetStatisticsFromModel()
    {
        ini_set('max_execution_time', 600);

        $pythonScriptPath = base_path("MODEL/new_best_11-11-24_4pm_model3/model3highmetrics.py");
        $output = [];
        $errorOutput = [];

        $command = "python " . escapeshellarg($pythonScriptPath) . " " . escapeshellarg(1);
        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            return response()->json([
                'success' => false,
                'message' => 'Python script failed to execute',
                'error' => implode("\n", $errorOutput),
            ], 500);
        }

        // Convert string output to JSON
        $resultString = implode("", $output); // Concatenate the output array into a single string
        $resultJson = json_decode($resultString, true); // Decode the string into a PHP array

        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to decode JSON',
                'error' => json_last_error_msg(),
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $resultJson,
        ]);
    }

    public function GetModelMetrics()
    {
        ini_set('max_execution_time', 300);

        $pythonScriptPath = base_path("MODEL/new_best_11-11-24_4pm_model3/model3highmetrics.py");
        $output = [];
        $errorOutput = [];

        $command = "python " . escapeshellarg($pythonScriptPath) . " " . escapeshellarg(2);
        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            return response()->json([
                'success' => false,
                'message' => 'Python script failed to execute',
                'error' => implode("\n", $errorOutput),
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $output,
        ]);
    }

    public function GetSentimentsFromDB()
    {
        return response()->json(sentiment_analysis::all());
    }

    public function TestModel()
    {
        try
        {
            DB::beginTransaction();
            ini_set('max_execution_time', 600);


            /**
             * Retrieve feedbacks from the database
             */
            $feedbacksDb = feedbacks::where('status', 'not-processed')->get();
            $feedbackArray = $feedbacksDb->pluck('content')->toArray();

            if(count($feedbackArray) < 1)
            {
                return response()->json([
                    'status' => 200,
                    'message' => 'There are no unprocessed feedbacks in the database.'
                ]);
            }

            $feedbackJson = json_encode($feedbackArray);


            /**
             * Path to the Python script
             */
            $pythonScriptPath = base_path("MODEL/new_best_11-11-24_4pm_model3/model3highmetrics.py");
            $command = "python " . escapeshellarg($pythonScriptPath) . " " . escapeshellarg(3) . " " . escapeshellarg($feedbackJson);

            $output = [];
            $returnVar = 0;
            exec($command, $output, $returnVar);

            if ($returnVar !== 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Python script failed to execute',
                    'error' => implode("\n", $output),
                ], 500);
            }


            /**
             * Convert string output to JSON
             */
            $resultString = implode("", $output); // Concatenate the output array into a single string
            $resultJson = json_decode($resultString, true); // Decode the string into a PHP array

            if (json_last_error() !== JSON_ERROR_NONE) {
                return response()->json([
                    'status' => 500,
                    'message' => 'Failed to decode JSON',
                    'error' => json_last_error_msg(),
                ], 500);
            }


            /**
             * Update the CSV
             */
            $datasetLocation = base_path("MODEL/cleaned_by_code.csv");

            try {
                $resultJson = json_decode($resultString, true); // Decode JSON as associative array

                if (json_last_error() !== JSON_ERROR_NONE) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to decode JSON',
                        'error' => json_last_error_msg(),
                    ], 500);
                }

                // Open the CSV file in append mode
                $fileHandle = fopen($datasetLocation, 'a');
                if ($fileHandle === false) {
                    throw new \Exception('Failed to open the CSV file for writing');
                }

                // Iterate over the array of results
                foreach ($resultJson as $result) {
                    $review = $result['Feedback'] ?? ''; // Extract Feedback field
                    $sentiment = $result['Sentiment'] ?? ''; // Extract Sentiment field

                    // Write to CSV (tab-separated values)
                    fputcsv($fileHandle, [$review, $sentiment]);
                }

                fclose($fileHandle); // Close the file

                /**
                 * Update the status of the feedback to the database
                 */
                foreach($feedbacksDb as $feedback)
                {
                    $feedback->status = 'processed';

                    $feedback->save();
                }

                DB::commit();

                return response()->json([
                    'status' => 200,
                    'message' => 'Success'
                ]);
            } 
            catch (\Exception $e) {
                DB::rollBack();
                return response()->json([
                    'status' => 500,
                    'message' => $e->getMessage(),
                ], 500);
            }
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ], 500);
        }
    }










    // POST
    public function UpdateSentimentStatisticsTable(Request $request)
    {
        try
        {
            DB::beginTransaction();

            // Fetch feedbacks that haven't been processed
            $sentiments = feedbacks::where("status", "not-processed")->get();
            $filteredSentiments = [];
            
            $newPricingFeedbacks = [];
            $newVetCareFeedbacks = [];
            $newCustomerServiceFeedbacks = [];
            $newHygieneFeedbacks = [];
            $newWaitingTimeServiceFeedbacks = [];
            $newBookingExperienceFeedbacks = [];

            if(count($sentiments) < 1)
            {
                return response([
                    "status" => 200,
                    "message" => "There are currently no unprocessed feedbacks"
                ]);
            }

            foreach($sentiments as $sentiment)
            {
                $filteredSentiments[] = $sentiment->content;
            }

            $response = Http::timeout(120)->post("http://82.25.105.148:8010/analyze", [
                'feedbacks' => $filteredSentiments
            ]);
            $results = $response->json();


            foreach($results as $result)
            {
                if($result["analysis"]["pricing"]["mentioned"])
                {
                    $newPricingFeedbacks[] = [
                        "sentiment" => $result["analysis"]["pricing"]["sentiment"],
                        "feedback" => $result["feedback"],
                    ];
                }

                if($result["analysis"]["veterinary_service"]["mentioned"])
                {
                    $newVetCareFeedbacks[] = [
                        "sentiment" => $result["analysis"]["veterinary_service"]["sentiment"],
                        "feedback" => $result["feedback"],
                    ];
                }
                
                if($result["analysis"]["customer_service"]["mentioned"])
                {
                    $newCustomerServiceFeedbacks[] = [
                        "sentiment" => $result["analysis"]["customer_service"]["sentiment"],
                        "feedback" => $result["feedback"],
                    ];
                }

                if($result["analysis"]["hygiene"]["mentioned"])
                {
                    $newHygieneFeedbacks[] = [
                        "sentiment" => $result["analysis"]["hygiene"]["sentiment"],
                        "feedback" => $result["feedback"],
                    ];
                }

                if($result["analysis"]["waiting_time"]["mentioned"])
                {
                    $newWaitingTimeServiceFeedbacks[] = [
                        "sentiment" => $result["analysis"]["waiting_time"]["sentiment"],
                        "feedback" => $result["feedback"],
                    ];
                }

                if($result["analysis"]["booking_experience"]["mentioned"])
                {
                    $newBookingExperienceFeedbacks[] = [
                        "sentiment" => $result["analysis"]["booking_experience"]["sentiment"],
                        "feedback" => $result["feedback"],
                    ];
                }
            }

            $categories = ["Pricing", "Vet Care", "Customer Service", "hygiene", "Waiting Time", "Booking Experience"];
            $resultsToPutInDB = [$newPricingFeedbacks, $newVetCareFeedbacks, $newCustomerServiceFeedbacks, $newHygieneFeedbacks, $newWaitingTimeServiceFeedbacks, $newBookingExperienceFeedbacks];

            for($i=0; $i<count($categories); $i++)
            {
                if(count($resultsToPutInDB[$i]))
                {
                    $existingSentiment = sentiment_analysis::where("aspect", $categories[$i])->first();

                    // Decode existing comments or default to empty array
                    $existingPos = json_decode($existingSentiment->positive_comments ?? '[]', true);
                    $existingNeu = json_decode($existingSentiment->neutral_comments ?? '[]', true);
                    $existingNeg = json_decode($existingSentiment->negative_comments ?? '[]', true);

                    // Get new categorized comments
                    $newPos = array_values(array_map(function ($feedback) {
                        return $feedback['feedback'];
                    }, array_filter($resultsToPutInDB[$i], function ($feedback) {
                        return strtolower(trim($feedback['sentiment'])) === 'positive';
                    })));

                    $newNeu = array_values(array_map(function ($feedback) {
                        return $feedback['feedback'];
                    }, array_filter($resultsToPutInDB[$i], function ($feedback) {
                        return strtolower(trim($feedback['sentiment'])) === 'neutral';
                    })));

                    $newNeg = array_values(array_map(function ($feedback) {
                        return $feedback['feedback'];
                    }, array_filter($resultsToPutInDB[$i], function ($feedback) {
                        return strtolower(trim($feedback['sentiment'])) === 'negative';
                    })));

                    // Append new feedbacks to the old ones
                    $updatedPos = array_merge($existingPos, $newPos);
                    $updatedNeu = array_merge($existingNeu, $newNeu);
                    $updatedNeg = array_merge($existingNeg, $newNeg);
                    

                    $positiveCount = count($updatedPos);
                    $neutralCount = count($updatedNeu);
                    $negativeCount = count($updatedNeg);
                    $total = $positiveCount + $neutralCount + $negativeCount;

                    $existingSentiment->aspect = $categories[$i];
                    $existingSentiment->positive_percent =  $total > 0 ? round(($positiveCount / $total) * 100, 2) : 0;
                    $existingSentiment->neutral_percent =  $total > 0 ? round(($neutralCount / $total) * 100, 2) : 0;
                    $existingSentiment->negative_percent =  $total > 0 ? round(($negativeCount / $total) * 100, 2) : 0;
                    $existingSentiment->positive_count = $positiveCount;
                    $existingSentiment->neutral_count = $neutralCount;
                    $existingSentiment->negative_count = $negativeCount;
                    $existingSentiment->positive_comments = json_encode($updatedPos);
                    $existingSentiment->neutral_comments = json_encode($updatedNeu);
                    $existingSentiment->negative_comments = json_encode($updatedNeg);
                    $existingSentiment->save();
                }
            }

            /**
             * Mark the sentiments as processed
             */
            foreach($sentiments as $sentiment)
            {
                $sentiment->status = "processed";
                $sentiment->save();
            }

            DB::commit();

            return response()->json([
                "status" => 200,
                "message" => "Success"
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                "status" => 500,
                "message" => $e->getMessage()
            ], 500);
        }
    }


    public function ReadResultExcelFile()
    {
        DB::beginTransaction();
        try
        {
            sentiment_analysis::truncate();
            $filePath = base_path('vet_clinic_feedback_report.xlsx');

            $spreadsheet = IOFactory::load($filePath);
            $sheet = $spreadsheet->getActiveSheet();
            // $data = $sheet->toArray();
            $dataNo1stIndex = array_slice($sheet->toArray(), 1);

            $pricingFeedbacks = [];
            $vetCareFeedbacks = [];
            $customerServiceFeedbacks = [];
            $hygieneFeedbacks = [];
            $waitingTimeFeedbacks = [];
            $bookingExperienceFeedbacks = [];

            for($i = 0; $i < count($dataNo1stIndex); $i++)
            {
                if($dataNo1stIndex[$i][5] == "TRUE")
                {
                    $pricingFeedbacks[] = [
                        "category" => "Pricing",
                        "feedback" => $dataNo1stIndex[$i][0],
                        "sentiment" => $dataNo1stIndex[$i][3]
                    ];
                }
                
                if($dataNo1stIndex[$i][8] == "TRUE")
                {
                    $vetCareFeedbacks[] = [
                        "category" => "Vet Care",
                        "feedback" => $dataNo1stIndex[$i][0],
                        "sentiment" => $dataNo1stIndex[$i][6]
                    ];
                }

                if($dataNo1stIndex[$i][11] == "TRUE")
                {
                    $customerServiceFeedbacks[] = [
                        "category" => "Customer Service",
                        "feedback" => $dataNo1stIndex[$i][0],
                        "sentiment" => $dataNo1stIndex[$i][9]
                    ];
                }

                if($dataNo1stIndex[$i][14] == "TRUE")
                {
                    $hygieneFeedbacks[] = [
                        "category" => "Hygiene",
                        "feedback" => $dataNo1stIndex[$i][0],
                        "sentiment" => $dataNo1stIndex[$i][12]
                    ];
                }

                if($dataNo1stIndex[$i][17] == "TRUE")
                {
                    $waitingTimeFeedbacks[] = [
                        "category" => "Waiting Time",
                        "feedback" => $dataNo1stIndex[$i][0],
                        "sentiment" => $dataNo1stIndex[$i][15]
                    ];
                }

                if($dataNo1stIndex[$i][20] == "TRUE")
                {
                    $bookingExperienceFeedbacks[] = [
                        "category" => "Booking Experience",
                        "feedback" => $dataNo1stIndex[$i][0],
                        "sentiment" => $dataNo1stIndex[$i][18]
                    ];
                }
            }

            $toInsertDatabase = [$pricingFeedbacks, $vetCareFeedbacks, $customerServiceFeedbacks, $hygieneFeedbacks, $waitingTimeFeedbacks, $bookingExperienceFeedbacks];
            $categories = ["Pricing", "Vet Care", "Customer Service", "hygiene", "Waiting Time", "Booking Experience"];

            for($i = 0; $i < count($categories); $i++)
            {
                $sentimentTable = new sentiment_analysis();
                $positiveReviews = array_values(array_map(function ($feedback) {
                    return $feedback['feedback'];
                }, array_filter($toInsertDatabase[$i], function ($feedback) {
                    return strtolower(trim($feedback['sentiment'])) === 'positive';
                })));
                $neutralReviews = array_values(array_map(function ($feedback) {
                    return $feedback['feedback'];
                }, array_filter($toInsertDatabase[$i], function ($feedback) {
                    return strtolower(trim($feedback['sentiment'])) === 'neutral';
                })));
                $negativeReviews = array_values(array_map(function ($feedback) {
                    return $feedback['feedback'];
                }, array_filter($toInsertDatabase[$i], function ($feedback) {
                    return strtolower(trim($feedback['sentiment'])) === 'negative';
                })));

                $positiveCount = count($positiveReviews);
                $neutralCount = count($neutralReviews);
                $negativeCount = count($negativeReviews);
                $total = $positiveCount + $neutralCount + $negativeCount;

                //return response()->json($negativeFeedbacks);
                $sentimentTable->aspect = $categories[$i];
                $sentimentTable->positive_percent =  $total > 0 ? round(($positiveCount / $total) * 100, 2) : 0;
                $sentimentTable->neutral_percent =  $total > 0 ? round(($neutralCount / $total) * 100, 2) : 0;
                $sentimentTable->negative_percent =  $total > 0 ? round(($negativeCount / $total) * 100, 2) : 0;
                $sentimentTable->positive_count = $positiveCount;
                $sentimentTable->neutral_count = $neutralCount;
                $sentimentTable->negative_count = $negativeCount;
                $sentimentTable->positive_comments = json_encode($positiveReviews);
                $sentimentTable->neutral_comments = json_encode($neutralReviews);
                $sentimentTable->negative_comments = json_encode($negativeReviews);
                $sentimentTable->save();
            }
            
            DB::commit();

            return response()->json([
                "status" => 200,
                "message" => "Success"
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                "status" => 500,
                "message" => $e->getMessage()
            ], 500);
        }
    }
}
