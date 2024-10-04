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
    public function cancelAppointment(Request $request){
        $appointment = appointments::where('id', $request->appointmentId)->first();
        $request->validate([
            'appointmentId' => 'required|exists:appointments,id', // Ensure the appointment exists
            'reason' => 'nullable|string|max:255', // Optional reason for cancellation
        ]);
        if (!$appointment) {
            return response()->json([
                'status' => 404,
                'message' => 'Appointment not found.'
            ], 404);
        } $appointment->status = 'Cancelled';
        // Update the status to 'Cancelled'
        $appointment->status = 'Cancelled';

        // Set the current timestamp to 'cancelled_at'
        $appointment->cancelled_at = now();

        // Save the cancellation reason if provided
        $appointment->cancellation_reason = $request->input('reason', 'No reason provided');
        if ($appointment->save()) {
            return response()->json([
                'status' => 200,
                'message' => 'Appointment cancelled successfully.'
            ]);
        }

        return response()->json([
            'status' => 500,
            'message' => 'Failed to cancel appointment. Please try again later.'
        ], 500);
    }


    // GET
    public function getAllAppointmentWhereClient($clientId)
    {
        return response()->json(appointments::where('client', $clientId)->get());
    }
}
