<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateIdService;
use App\Http\Controllers\Controller;
use App\Models\inventory;
use App\Models\inventory_items;
use DB;
use Illuminate\Http\Request;
use Ramsey\Uuid\Type\Integer;

class InventoryItemsController extends Controller
{
    protected $generateId;

    public function __construct(IGenerateIdService $generateId)
    {
        $this->generateId = $generateId;
    }

    // POST
    public function AddInventoryItem(Request $request)
    {
        try
        {
            DB::beginTransaction();

            for($i = 0; $i < (int) $request->qty; $i++) {
                $inventoryItem = new inventory_items();
                $inventoryItem->id = $this->generateId->generate(inventory_items::class, 12);
                $inventoryItem->inventory = $request->inventoryId;
                $inventoryItem->expiration_date = $request->expirationDate;
                $inventoryItem->save();

                $inventory = inventory::find($request->inventoryId);
                $inventory->qty++;
                $inventory->save();
            }
            

            DB::commit();

            return response()->json([
                'status' => 200,
                'message'=> 'Item successfully added.',
                'inventory' => inventory::with('inventory_items')->find($request->inventoryId)
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message'=> $e->getMessage()
            ], 500);
        }
    }

    public function DelInventoryItem(Request $request)
    {
        try
        {
            DB::beginTransaction();
            $inventoryItem = inventory_items::find($request->itemId);

            if(!$inventoryItem) 
            {
                return response()->json([
                    'status'=> 404,
                    'message'=> 'Item not found.'
                ]);
            }
            $inventory = inventory::find($request->inventoryId);
            $inventory->qty--;
            $inventory->save();
            $inventoryItem->delete();

            DB::commit();

            return response()->json([
                'status'=> 200,
                'message'=> 'Item deleted.',
                'inventory' => inventory::with('inventory_items')->find($request->inventoryId)
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
