<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateFilenameService;
use App\Http\Controllers\Controller;
use App\Models\inventory;
use DB;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    protected $generateFilename;

    public function __construct(IGenerateFilenameService $generateFilename)
    {
       $this->generateFilename = $generateFilename;
    }



    // GET
    public function GetAllInventory()
    {
        return response()->json(inventory::all());
    }

    public function GetFullInventoryWhereId($id)
    {
        return response()->json(inventory::with('inventory_items')->find($id));
    }



    // POST
    public function createMedicine(Request $request)
    {
        try 
        {
            DB::beginTransaction();
            $addMedIn = json_decode($request->input("addMedicineIn"));

            if($request->hasMedPic === "true")
            {
                $photo = $request->file('medPic');
                $targetDirectory = base_path("react/public/assets/media/medicines");
                $newFilename = $this->generateFilename->generate($photo, $targetDirectory);
                
                $photo->move($targetDirectory, $newFilename);
            }

            

            $inventory = new inventory();
            $inventory->name = $addMedIn->name;
            $inventory->qty = 0;
            $inventory->desc = $addMedIn->desc;
            $inventory->picture = $request->hasMedPic === "true" ? $newFilename : null;
            $inventory->measurement_value = $addMedIn->measurementValue;
            $inventory->measurement_unit = $addMedIn->measurementUnit;
            $inventory->dosage_value = $addMedIn->dosageValue;
            $inventory->dosage_type = $addMedIn->dosageType;
            $inventory->price = $addMedIn->price;
            $inventory->toy_deduct = $addMedIn->toyDeduct;
            $inventory->sm_deduct = $addMedIn->smDeduct;
            $inventory->med_deduct = $addMedIn->medDeduct;
            $inventory->lg_deduct = $addMedIn->lgDeduct;
            $inventory->status = "active";

            $inventory->save();

            

            DB::commit();

            return response()->json([
                'status' => 200,
                'message' =>'Medicine Added.'
            ]);
        } 
        catch(\Exception $ex)
        {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $ex->getMessage()
            ], 500);
        }
        
    }

    public function editInventory(Request $request)
    {
        try
        {
            DB::beginTransaction();

            $inventoryItem = inventory::find($request->id);

            if(!$inventoryItem)
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Item not found'
                ]);
            }

            $inventoryItem->name = $request->newName;
            $inventoryItem->desc = $request->newDesc;
            
            $inventoryItem->measurement_value = $request->hasMeasurement === "false" ? null : $request->measurementVal;
            $inventoryItem->measurement_unit = $request->hasMeasurement === "false" ? null : $request->measurementUnit;

            if($request->newPic) {
                $photo = $request->file('newPic');
                $targetDirectory = base_path("react/public/assets/media/items");
                $newFilename = $this->generateFilename->generate($photo, $targetDirectory);
    
                $photo->move($targetDirectory, $newFilename);

                $inventoryItem->picture = $newFilename;
            }

            $inventoryItem->save();

            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'Item edited',
                'inventory' => inventory::with("inventory_items")->find($request->id)
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
}
