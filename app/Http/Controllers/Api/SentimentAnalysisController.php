<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
