<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateIdService;
use App\Contracts\ISMSService;
use App\Http\Controllers\Controller;
use App\Models\appointment_assigned_items;
use App\Models\appointment_assigned_staffs;
use App\Models\appointments;
use App\Models\inventory;
use App\Models\inventory_items;
use App\Models\inventory_items_used;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppointmentsController extends Controller
{
    protected $generateId, $sendSms;

    public function __construct(IGenerateIdService $generateId, ISMSService $sendSms)
    {
        $this->generateId = $generateId;
        $this->sendSms = $sendSms;
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
            $appointment->note = $request->note;
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

            // Fetch all Items used in this appointment
            $appointmentItemsUsed = appointment_assigned_items::where('appointment', $appointment->id)->get();

            // Loop through it
            foreach ($appointmentItemsUsed as $item) 
            {
                $itemInventory = $item->inventory_items_used()->first(); //get from inventory_items_used table

                // Return the Item from inventory_items_used to inventory_items
                $inventoryItems = new inventory_items();
                $inventoryItems->id = $itemInventory->id;
                $inventoryItems->inventory = $itemInventory->inventory;
                $inventoryItems->expiration_date = $itemInventory->expiration_date;
                $inventoryItems->created_at = $itemInventory->created_at;
                $inventoryItems->updated_at = $itemInventory->updated_at;
                $inventoryItems->save();

                // Increment the Inventory Stocks
                $inventory = inventory::find($itemInventory->inventory);
                $inventory->qty ++;
                $inventory->save();

                // Delete the inventory_items_used
                $itemInventory->delete();
            }

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

            // Assign Staffs
            foreach($request->staffs as $staff)
            {
                $appointmentStaff = new appointment_assigned_staffs();
                $appointmentStaff->staff = $staff;
                $appointmentStaff->appointment = $request->appointmentId;
                $appointmentStaff->save();
            }

            // Loop Through Selected Items from requests
            foreach($request->items as $item) 
            {
                $decodedItem = json_decode($item);

                $inventoryItems = inventory_items::where('inventory', $decodedItem->id)
                ->orderBy('expiration_date', 'asc')
                ->take($decodedItem->qty)
                ->get();

                // Move Inventory Items to Inventory Items Used
                foreach($inventoryItems as $item)
                {
                    $inventoryItemsUsed = new inventory_items_used();
                    $inventoryItemsUsed->id = $item->id;
                    $inventoryItemsUsed->inventory = $item->inventory;
                    $inventoryItemsUsed->expiration_date = $item->expiration_date;
                    $inventoryItemsUsed->created_at = $item->created_at;
                    $inventoryItemsUsed->updated_at = $item->updated_at;
                    $inventoryItemsUsed->save();
                    

                    $appointmentItem = new appointment_assigned_items();
                    $appointmentItem->item = (int)$item->id;
                    $appointmentItem->appointment = $request->appointmentId;
                    $appointmentItem->save();

                    // Then Delete the item from the Inventory Items
                    $item->delete();
                }
                
                // Decrement the Inventory
                $inventory = inventory::find((int)$decodedItem->id);
                $inventory->qty -= (int)$decodedItem->qty;
                $inventory->save();
            }

            // SEND SMS
            $formattedDateTime = Carbon::parse($appointment->date_time)->format('M d, Y \a\t h:i A');
            $smsMessage = "Your appointment for $appointment->service on $formattedDateTime has been approved.";
            $smsStatus = $this->sendSms->sendSMS("+63" . substr($appointment->client()->first()->phone, 1), $smsMessage);

            DB::commit();
            return response()->json([
                'status' => 200,
                'message' => 'Appointment approved successfully.',
                'smsStatus' => $smsStatus
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
        return response()->json(
            appointments::where('client', $clientId)->with(['pet', 'feedback', 'service'])->get()
        );
    }

    public function getAppointmentWhereId($appointmentId)
    {
        return response()->json(appointments::with(['pet', 'client', 'feedback'])->find($appointmentId));
    }

    public function getAllAppointments()
    {
        return response()->json(appointments::with(['pet', 'feedback'])->get());
    }
    
    public function GetAllAppointmentsWhereStatus($status)
    {
        return response()->json(appointments::where('status', $status)->with(["pet", "feedback"])->get());
    }
}
