<?php
namespace App\Contracts;

interface ISMSService {
    public function sendSMS($to, $message);
}