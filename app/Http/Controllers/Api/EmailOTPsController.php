<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateOTPService;
use App\Contracts\ISendEmailService;
use App\Http\Controllers\Controller;
use App\Mail\ClientForgotPassOTP;
use App\Models\email_otps;
use App\Models\user_clients;
use DB;
use Illuminate\Http\Request;

class EmailOTPsController extends Controller
{
    protected $generateOtp, $sendEmail;

    public function __construct(IGenerateOTPService $generateOtp, ISendEmailService $sendEmail)
    {
        $this->generateOtp = $generateOtp;
        $this->sendEmail = $sendEmail;
    }



    // POST
    public function GenerateAndSendOTPToEmail(Request $request)
    {
        try
        {
            DB::beginTransaction();
            $otp = $this->generateOtp->generate(6);

            $client = user_clients::where('email', $request->email)->first();

            if(!$client)
            {
                return response()->json([
                    "status" => 404,
                    "message" => "Email address is not associated to any account."
                ]);
            }

            $emailOtpTable = new email_otps();
            $emailOtpTable->otp = $otp;
            $emailOtpTable->for = $request->for;
            $emailOtpTable->client = $client->id;
            $emailOtpTable->save();
            DB::commit();

            $this->sendEmail->send(new ClientForgotPassOTP($otp), $client->email);

            return response()->json([
                "status" => 200,
                "message" => "success"
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ]);
        }

        
    }
}
