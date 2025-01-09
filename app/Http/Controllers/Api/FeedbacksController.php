<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\appointments;
use App\Models\feedbacks;
use DB;
use Illuminate\Http\Request;

class FeedbacksController extends Controller
{
    // GET
    public function GetAllFeedbacks()
    {
        return response()->json(feedbacks::all());
    }



    // POST
    public function PostFeedback(Request $request)
    {
        try
        {
            DB::beginTransaction();
            $feedbacks = new feedbacks();
            $feedbacks->client = $request->client;
            $feedbacks->appointment = $request->appointment;
            $feedbacks->content = $request->feedback;

            $feedbacks->save();

            DB::commit();
            return response()->json([
                'status' => 200,
                'message' => 'Feedback posted',
                'appointment' => appointments::with(['pet', 'feedback'])->find($request->appointment)
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
