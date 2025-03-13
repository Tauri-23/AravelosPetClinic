<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ClientForgotPassOTP extends Mailable
{
    use Queueable, SerializesModels;

    public $otp;
    
    public function __construct($otp)
    {
        $this->otp = $otp;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('pembopayapp@gmail.com', 'BDDRHomes')
        ->subject('BDDRHomes verify your email.')
        ->view('EmailSend.ClientForgotPassOTP')
        ->with([
            'otp' => $this->otp
        ]);
    }
}
