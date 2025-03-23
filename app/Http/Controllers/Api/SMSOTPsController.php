<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateOTPService;
use App\Contracts\ISMSService;
use App\Http\Controllers\Controller;
use App\Models\sms_otps;
use App\Models\user_clients;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class SMSOTPsController extends Controller
{
    protected $generateOtp, $sendSms;

    public function __construct(IGenerateOTPService $generateOtp, ISMSService $sendSms)
    {
        $this->generateOtp = $generateOtp;
        $this->sendSms = $sendSms;
    }



    // POST
    public function GenerateOTPAndSendToSMS(Request $request)
    {
        try
        {
            DB::beginTransaction();
            $otp = $this->generateOtp->generate(6);
            $client = user_clients::find($request->client);

            if(!$client)
            {
                return response()->json([
                    "status" => 404,
                    "message" => "Phone number is not associated to any account."
                ]);
            }

            // Mark as Expired passed otps
            sms_otps::where([
                ['for', '=', $request->for],
                ['status', '=', 'active'],
                ['client', '=', $client->id]
            ])->update(['status' => 'Expired']);

            $smsOtp = new sms_otps();
            $smsOtp->otp = $otp;
            $smsOtp->for = $request->for;
            $smsOtp->client = $client->id;
            $smsOtp->save(); 

            DB::commit();

            // Send OTP phone
            $otpMessage = match($request->for)
            {
                "phone verification" => "Your phone verification code is $otp, it will expire in 5 minutes."
            };

            $phoneNum = "+63" . substr_replace($client->phone, "", 0, 1);
            $smsStatus = $this->sendSms->sendSMS($phoneNum, $otpMessage);


            return response()->json([
                "status" => 200,
                "message" => "success",
                'smsStatus' => $smsStatus
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


    public function verifyPhoneOTP(Request $request)
    {
        try
        {
            DB::beginTransaction();
            $client = user_clients::find($request->client);
            $phoneOtp = sms_otps::where("otp", $request->otp)
            ->where("for", $request->for)
            ->where("client", $client->id)
            ->where("status", "Active")
            ->first();

            if(!$phoneOtp)
            {
                return response()->json([
                    'status' => 401,
                    'message' => "Invalid OTP."
                ]);
            }

            if(Carbon::parse($phoneOtp->created_at)->diffInMinutes(now()) > 5)
            {
                $phoneOtp->status = "Expired";
                $phoneOtp->save();

                DB::commit();

                return response()->json([
                    'status' => 401,
                    'message' => "OTP Expired."
                ]);
            }

            $client->phone_verified = 1;
            $client->save();
            
            DB::commit();

            return response()->json([
                "status" => 200,
                "message" => "success",
                "client" => $client
            ]);
        }
        catch(\Exception $e)
        {

            return response()->json([
                "status" => 500,
                "message" => $e->getMessage()
            ]);
        }
    }
}
