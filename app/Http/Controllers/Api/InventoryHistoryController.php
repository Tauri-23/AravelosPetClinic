<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\inventory_history;
use DB;
use Illuminate\Http\Request;

class InventoryHistoryController extends Controller
{
    public function AddInventoryHistory($itemName, $operator, $qty)
    {
        try
        {
            DB::beginTransaction();
            $history = new inventory_history();
            $history->item_name = $itemName;
            $history->operator = $operator;
            $history->qty = $qty;

            $history->save();
            DB::commit();
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
