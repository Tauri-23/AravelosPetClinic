<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class appointment_pets extends Model
{
    use HasFactory;

    public function appointment_pet_services() 
    {
        return $this->hasMany(appointment_pets_services::class, "appointment_pet", "id")->with(["service", "service_type"]);
    }

    public function pet()
    {
        return $this->belongsTo(pets::class, "pet", "id")->with("breed");
    }

    public function medical_history()
    {
        return $this->hasMany(medical_histories::class, "appointment_pet", "id")->with(["physical_exams", "laboratory_exams", "diagnosis"]);
    }

    public function assigned_items()
    {
        return $this->hasMany(appointment_assigned_items::class, "appointment_pet", "id")->with(["inventory_items_used"]);;
    }
}
