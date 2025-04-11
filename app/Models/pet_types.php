<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pet_types extends Model
{
    use HasFactory;

    public function pet_breeds()
    {
        return $this->hasMany(pet_breeds::class, "pet_type", "id");
    }
}
