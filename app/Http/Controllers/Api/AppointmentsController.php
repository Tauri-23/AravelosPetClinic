<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateIdService;
use App\Http\Controllers\Controller;
use App\Models\appointments;
use Illuminate\Http\Request;

class AppointmentsController extends Controller
{
    protected $generateId;

    public function __construct(IGenerateIdService $generateId)
    {
        $this->generateId = $generateId;
    }



    // POST
    public function createAppointment(Request $request)
    {
        $appointmentId = $this->generateId->generate(appointments::class, 12);
        $appointment = new appointments();
        $appointment->id = $appointmentId;
        $appointment->client = $request->client;
        $appointment->pet = $request->pet;
        $appointment->service = $request->service;
        $appointment->date_time = $request->dateTime;
        $appointment->status = $request->status;

        if($appointment->save())
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


    // GET
    public function getAllAppointmentWhereClient($clientId)
    {
        return response()->json(appointments::where('client', $clientId)->get());
    }
}
