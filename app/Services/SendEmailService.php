<?php
namespace App\Services;

use App\Contracts\ISendEmailService;
use Illuminate\Support\Facades\Mail;

class SendEmailService implements ISendEmailService 
{
    public function send($mailObject, $email)
    {
        try
        {
            Mail::to($email)->queue($mailObject);
        }
        catch(\Exception $e)
        {
            return response()->json([
                "status" => 500,
                "message" => $e->getMessage()
            ], 500);
        }
    }
}