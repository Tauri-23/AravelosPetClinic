<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\clinic_services;
use Illuminate\Http\Request;

class ClinicServiceControllers extends Controller
{
    // GET
    public function GetAllClinicServices()
    {
        return response()->json(clinic_services::all());
    }
}
