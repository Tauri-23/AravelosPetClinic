<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\feedbacks;
use App\Models\sentiment_analysis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            // DB::beginTransaction();
            // Delete all rows
            sentiment_analysis::truncate();

            $index = 0;
            foreach ($request->aspects as $aspect) {
                $sentimentRecord = new sentiment_analysis();

                $sentimentRecord->aspect = $aspect; // Format aspect name

                $sentimentRecord->positive_count = $request->positive_count[$index];
                $sentimentRecord->positive_percent = $request->positive_percent[$index];
                $sentimentRecord->positive_comments = $request->positive_comments[$index]; // Convert to String the datatypes of this column in LONGTEXT

                $sentimentRecord->neutral_count = $request->neutral_count[$index];
                $sentimentRecord->neutral_percent = $request->neutral_percent[$index];
                $sentimentRecord->neutral_comments = $request->neutral_comments[$index]; // Convert to String the datatypes of this column in LONGTEXT

                $sentimentRecord->negative_count = $request->negative_count[$index];
                $sentimentRecord->negative_percent = $request->negative_percent[$index];
                $sentimentRecord->negative_comments = $request->negative_comments[$index]; // Convert to String the datatypes of this column in LONGTEXT

                $sentimentRecord->save();
                $index++;
            }

            // DB::commit();

            return response()->json([
                'status' => 200,
                'message'=> 'Success',
            ]);
        }
        catch (\Exception $e)
        {
            // DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
