<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateIdService;
use App\Http\Controllers\Controller;
use App\Models\appointment_assigned_items;
use App\Models\appointment_assigned_staffs;
use App\Models\appointments;
use App\Models\inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppointmentsController extends Controller
{
    protected $generateId;

    public function __construct(IGenerateIdService $generateId)
    {
        $this->generateId = $generateId;
    }



    /**
     * POST
     */
    public function createAppointment(Request $request)
    {
        try
        {
            DB::beginTransaction();
            $appointmentId = $this->generateId->generate(appointments::class, 12);
            $appointment = new appointments();
            $appointment->id = $appointmentId;
            $appointment->client = $request->client;
            $appointment->pet = $request->pet;
            $appointment->service = $request->service;
            $appointment->date_time = $request->dateTime;
            $appointment->status = $request->status;
            $appointment->save();

            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'Success.'
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

    public function cancelAppointment(Request $request){
        try 
        {
            DB::beginTransaction();
            $appointment = appointments::find($request->appointmentId);
            if (!$appointment) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Appointment not found.'
                ], 404);
            }

            $appointment->status = 'Cancelled';
            $appointment->cancelled_at = now();
            $appointment->reason = $request->reason;

            $appointment->save();

            DB::commit();
            
            return response()->json([
                'status' => 200,
                'message' => 'Appointment cancelled successfully.'
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
    
    public function completeAppointment(Request $request){
        try 
        {
            DB::beginTransaction();
            $appointment = appointments::find($request->appointmentId);
            if (!$appointment) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Appointment not found.'
                ], 404);
            }

            $appointment->status = 'Completed';
            $appointment->save();

            DB::commit();
            
            return response()->json([
                'status' => 200,
                'message' => 'Appointment completed successfully.'
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

    public function approveAppointment(Request $request){
        try 
        {
            DB::beginTransaction();
            $appointment = appointments::find($request->appointmentId);

            if (!$appointment) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Appointment not found.'
                ]);
            }

            $appointment->status = 'Approved';
            $appointment->approved_at = now();
            $appointment->save();

            foreach($request->staffs as $staff)
            {
                $appointmentStaff = new appointment_assigned_staffs();
                $appointmentStaff->staff = $staff;
                $appointmentStaff->appointment = $request->appointmentId;
                $appointmentStaff->save();
            }

            foreach($request->items as $item)
            {
                $decodedItem = json_decode($item);
                
                // return response()->json([
                //     'status'=> 500,
                //     'message'=> $decodedItem->qty
                // ], 500);

                $inventory = inventory::find((int)$decodedItem->id);
                $inventory->qty -= (int)$decodedItem->qty;
                $inventory->save();

                $appointmentItem = new appointment_assigned_items();
                $appointmentItem->inventory = (int)$decodedItem->id;
                $appointmentItem->qty = (int)$decodedItem->qty;
                $appointmentItem->appointment = $request->appointmentId;
                $appointmentItem->save();
            }

            DB::commit();
            return response()->json([
                'status' => 200,
                'message' => 'Appointment approved successfully.'
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                'status'=> 500,
                'message'=> $e->getMessage()
            ], 500);
        }
    }



    /**
     * GET
     */
    public function getAllAppointmentWhereClient($clientId)
    {
        return response()->json(appointments::where('client', $clientId)->with('pet')->get());
    }

    public function getAppointmentWhereId($appointmentId)
    {
        return response()->json(appointments::with('pet')->find($appointmentId));
    }

    public function getAllAppointments()
    {
        return response()->json(appointments::with('pet')->get());
    }
    
    public function GetAllAppointmentsWhereStatus($status)
    {
        return response()->json(appointments::where('status', $status)->with("pet")->get());
    }
}
