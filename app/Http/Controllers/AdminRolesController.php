<?php

namespace App\Http\Controllers;

use App\Models\admin_roles;
use Illuminate\Http\Request;

class AdminRolesController extends Controller
{
    // GET
    public function GetAllAdminRoles()
    {
        return response()->json(admin_roles::all());
    }
}
