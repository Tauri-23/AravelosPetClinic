<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateIdService;
use App\Contracts\ISMSService;
use App\Http\Controllers\Controller;
use App\Models\appointment_assigned_items;
use App\Models\appointment_assigned_staffs;
use App\Models\appointment_pets;
use App\Models\appointment_pets_services;
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
     * GET
     */
    public function getAllAppointmentWhereClient($clientId)
    {
        return response()->json(
            appointments::where('client', $clientId)->with(['feedback', "assigned_staffs", 'appointment_pets'])->get()
        );
    }
    
    public function GetAllAppointmentsWhereClientIdAndStatus($clientId, $status)
    {
        return response()->json(
            appointments::where('client', $clientId)
            ->where("status", $status)
            ->with(['feedback', "assigned_staffs", 'appointment_pets'])
            ->get()
        );
    }

    public function getAppointmentWhereId($appointmentId)
    {
        return response()->json(appointments::with(['feedback', "assigned_staffs", 'appointment_pets'])
        ->find($appointmentId));
    }

    public function getAllAppointments()
    {
        return response()->json(appointments::with(["assigned_staffs", "appointment_pets", 'feedback'])->get());
    }
    
    public function GetAllAppointmentsWhereStatus($status)
    {
        return response()->json(appointments::where('status', $status)
        ->with(["client", "feedback", "assigned_staffs", "appointment_pets"])
        ->get());
    }
    
    public function GetAllAppointmentsWherePetAndStatus($petId, $status)
    {
        return response()->json(appointments::where("pet", $petId)
        ->where('status', $status)
        ->with(["assigned_staffs", "feedback", "appointment_pets"])
        ->orderBy("appointment_date", "desc")
        ->get());
    }

    public function GetAllAppointmentsWhereStatusMonthAndYear($status, $month, $year)
    {
        return response()->json(appointments::with(["client", "feedback", "assigned_staffs", "appointment_pets"])
        ->where("status", $status)
        ->whereMonth("created_at", $month)
        ->whereYear("created_at", $year)
        ->get());
    }

    public function GetAllPendingApprovedAptsThisWeekWhereClient($clientId)
    {
        $appointments = Appointments::whereIn('status', ["Pending", "Approved"])
        ->where("client", $clientId)
        ->whereBetween('created_at', [
            Carbon::now()->startOfWeek(), 
            Carbon::now()->endOfWeek()
        ])
        ->get();

        return response()->json($appointments);
    }




    /**
     * POST
     */
    public function createAppointment(Request $request)
    {
        try
        {
            DB::beginTransaction();

            $selectedPets = json_decode($request->input("selectedPets"));
            $selectedServices = json_decode($request->input("selectedServices"));

            /**
             * First Add The Appointment
             */
            $appointmentId = $this->generateId->generate(appointments::class, 12);
            $appointment = new appointments();
            $appointment->id = $appointmentId;

            $appointment->client = $request->client;
            $appointment->type = "Online";
            $appointment->note = $request->note;
            $appointment->status = "Pending";

            $appointment->save();

            /**
             * Second Add The Appointment Pet
             */
            foreach($selectedPets as $index => $selectedPet )
            {
                $aptPet = new appointment_pets();
                $aptPet->appointment = $appointmentId;
                $aptPet->pet = $selectedPet->id;
                $aptPet->save();

                /**
                 * Third Add The Services
                 */
                if (isset($selectedServices[$index])) {
                    foreach ($selectedServices[$index] as $selectedService) {
                        $aptPetSer = new appointment_pets_services();
                        $aptPetSer->appointment_pet = $aptPet->id;
                        $aptPetSer->service = $selectedService->serviceId;
                        $aptPetSer->service_type = $selectedService->serviceTypeId ?? null;
                        $aptPetSer->save();
                    }
                }
            }

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

    public function createAppointmentOTC(Request $request)
    {
        try
        {
            DB::beginTransaction();

            $bookedApt = json_decode($request->input("otcApt"));
            $appointmentId = $this->generateId->generate(appointments::class, 12);
            $appointment = new appointments();

            $appointment->id = $appointmentId;

            $appointment->otc_client = $bookedApt->otcClient;
            $appointment->otc_pet_name = $bookedApt->otcPetName;
            $appointment->otc_pet_type = $bookedApt->otcPetType;
            $appointment->otc_pet_breed = $bookedApt->otcPetBreed;
            
            $appointment->service = $bookedApt->service;
            $appointment->service_type = $bookedApt->service === 1 ? null : $bookedApt->serviceType;
            $appointment->date_time = $bookedApt->date;
            $appointment->type = "OTC";
            $appointment->status = "Approved";
            $appointment->approved_at = now();
            $appointment->save();

            // Assign Staffs
            foreach($request->staffs as $staff)
            {
                $appointmentStaff = new appointment_assigned_staffs();
                $appointmentStaff->staff = $staff;
                $appointmentStaff->appointment = $appointmentId;
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
                    $appointmentItem->appointment = $appointmentId;
                    $appointmentItem->save();

                    // Then Delete the item from the Inventory Items
                    $item->delete();
                }
                
                // Decrement the Inventory
                $inventory = inventory::find((int)$decodedItem->id);
                $inventory->qty -= (int)$decodedItem->qty;
                $inventory->save();

                // put in transaction history
                $invHist = new InventoryHistoryController();
                $invHist->AddInventoryHistory($inventory->name, "-", $decodedItem->qty, "Patient Care");
            }

            DB::commit();
            return response()->json([
                'status' => 200,
                'message' => 'Appointment approved successfully.',
            ]);       

        }
        catch(\Exception $e)
        {
            DB::rollBack();

            return response()->json([
                "status" => 500,
                "message" => $e->getMessage()
            ], 500);
        }
    }


    public function cancelAppointment(Request $request){
        try 
        {
            DB::beginTransaction();
            $appointment = appointments::with(["pet", "client", "feedback", "service", "assigned_staffs", "assigned_items", "medical_history"])->find($request->appointmentId);
            
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

                // put to inventory histories
                $invHist = new InventoryHistoryController();
                $invHist->AddInventoryHistory($inventory->name, "+", 1, "Cancelled Patient Care");

                // Delete the inventory_items_used
                $itemInventory->delete();
            }

            DB::commit();
            
            return response()->json([
                'status' => 200,
                'message' => 'Appointment cancelled successfully.',
                'appointment' => $appointment
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

            $appointment->status = "Approved";
            $appointment->approved_at = now();
            $appointment->appointment_date = $request->appointmentDate;
            $appointment->appointment_time = $request->appointmentTime;
            $appointment->save();

            // Assign Staffs
            foreach($request->staffs as $staff)
            {
                $appointmentStaff = new appointment_assigned_staffs();
                $appointmentStaff->staff = $staff;
                $appointmentStaff->appointment = $request->appointmentId;
                $appointmentStaff->save();
            }

            // SEND SMS
            $formattedDate = Carbon::parse($appointment->appointment_date)->format('M d, Y');
            $formattedTime = Carbon::parse($appointment->appointment_time)->format('h:i A');
            $smsMessage = "Your appointment (Appointment Ticket: $appointment->id) has been approved and scheduled on $formattedDate at $formattedTime.";
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
}
