<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateFilenameService;
use App\Http\Controllers\Controller;
use App\Models\inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    protected $generateFilename;

    public function __construct(IGenerateFilenameService $generateFilename)
    {
       $this->generateFilename = $generateFilename;
    }

    // POST
    public function createInventoryItem(Request $request)
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
            $inventory->qty = $request->stock;
            $inventory->desc = $request->desc;
            $inventory->picture = $newFilename;

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
    public function editInventoryItem(Request $request)
    {
        $inventoryItem = inventory::find($request->id);

        if(!$inventoryItem)
        {
            return response()->json([
                'status' => 404,
                'message' => 'Item not found'
            ]);
        }

        $inventoryItem->name = $request->name;
        $inventoryItem->qty = $request->qty;
        $inventoryItem->desc = $request->desc;
        $inventoryItem->save();

        return response()->json([
            'status' => 200,
            'message' => 'Item edited',
            'inventoryItems' => inventory::all()
        ]);
    }



    // GET
    public function GetAllInventory()
    {
        return response()->json(inventory::all());
    }
}
