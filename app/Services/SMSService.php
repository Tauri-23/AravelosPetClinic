<?php

namespace App\Services;

use App\Contracts\ISMSService;
use Illuminate\Support\Facades\Http;

class SMSService implements ISMSService {
    protected $apiKey;
    protected $senderId;

    public function __construct()
    {
        $this->apiKey = getenv('PHILSMS_API_KEY');
        $this->senderId = getenv('PHILSMS_SENDER_ID');
    }

    public function sendSMS($to, $message) {
        $send_data = [
            'sender_id' => $this->senderId,
            'recipient' => $to,
            'message'   => $message,
        ];

        try {
            
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Authorization' => "Bearer $this->apiKey",
            ])->post('https://app.philsms.com/api/v3/sms/send', $send_data);

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json(),
                ];
            }

            return [
                'success' => false,
                'error' => $response->json()
            ];


        } catch (\Exception $e) {
            // \Log::error('SMS sending failed: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }
}
