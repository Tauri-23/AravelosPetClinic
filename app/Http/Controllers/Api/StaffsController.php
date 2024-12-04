<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\user_admins;
use Illuminate\Http\Request;

class StaffsController extends Controller
{
    // GET
    public function GetAllStaffs()
    {
        return response()->json(user_admins::whereNot("role", 1)->get());
    }
}
