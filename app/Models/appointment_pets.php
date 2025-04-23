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
}
