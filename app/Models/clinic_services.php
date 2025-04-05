<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class clinic_services extends Model
{
    use HasFactory;

    public function service_types()
    {
        return $this->hasMany(clinic_service_types::class, "service", "id");
    }
}
