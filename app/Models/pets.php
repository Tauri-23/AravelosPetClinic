<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pets extends Model
{
    use HasFactory;

    public function allergies()
    {
        return $this->hasMany(pet_medical_history_allergies::class, 'pet', 'id');
    }

    public function medications()
    {
        return $this->hasMany(pet_medical_history_medications::class, 'pet', 'id');
    }

    public function diseases()
    {
        return $this->hasMany(pet_medical_history_diseases::class, 'pet', 'id');
    }
}
