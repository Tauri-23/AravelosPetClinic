<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class appointment_pets_services extends Model
{
    use HasFactory;

    public function service()
    {
        return $this->belongsTo(clinic_services::class, "service", "id");
    }

    public function service_type()
    {
        return $this->belongsTo(clinic_service_types::class, "service_type", "id");
    }
}
