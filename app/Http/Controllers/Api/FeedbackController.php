<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateIdService;
use App\Http\Controllers\Controller;
use App\Models\feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    protected $generateId;
    public function __construct(IGenerateIdService $generateId)
    {
        $this->generateId = $generateId;
    }

    public function createFeedback(Request $request)
    {
        $feedbackId = $this->generateId->generate(feedback::class, 12);
        $feedback = new feedback();
        $feedback->id = $feedbackId;
        $feedback->client = $request->client;
        $feedback->service = $request->service;
        $feedback->date_time = $request->dateTime;
        $feedback->content = $request->content;

        if($feedback->save())
        {
            return response()->json([
                'status' => 200,
                'message' => 'Success.'
            ]);
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => 'Something went wrong please try again later.'
            ]);
        }
    }
}
