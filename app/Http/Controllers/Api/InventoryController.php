<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function GetAllInventory()
    {
        return response()->json(inventory::all());
    }
}
