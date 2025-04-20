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



    // POST
    public function createInventory(Request $request)
    {
        try 
        {
            $photo = $request->file('img');
            $targetDirectory = base_path("react/public/assets/media/items");
            $newFilename = $this->generateFilename->generate($photo, $targetDirectory);

            $photo->move($targetDirectory, $newFilename);

            $inventory = new inventory();
            $inventory->category = $request->category;
            $inventory->name = $request->name;
            $inventory->qty = 0;
            $inventory->price = $request->price;
            $inventory->desc = $request->desc;
            $inventory->picture = $newFilename;

            if($request->measurementValue && $request->measurementUnit) 
            {
                $inventory->measurement_value = $request->measurementValue;
                $inventory->measurement_unit = $request->measurementUnit;
            }

            $inventory->save();

            return response()->json([
                'status' => 200,
                'message' =>'Item added.'
            ]);
        } 
        catch(\Exception $ex)
        {
            return response()->json([
                'status' => 500,
                'message' =>'Failed to upload file: ' . $ex->getMessage()
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



    // GET
    public function GetAllInventory()
    {
        return response()->json(inventory::all());
    }

    public function GetFullInventoryWhereId($id)
    {
        return response()->json(inventory::with('inventory_items')->find($id));
    }
}
