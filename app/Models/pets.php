<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pets extends Model
{
    use HasFactory;

    public function client()
    {
        return $this->belongsTo(user_clients::class, "client", "id");
    }

    public function type()
    {
        return $this->belongsTo(pet_types::class, "type", "id");
    }
    
    public function breed()
    {
        return $this->belongsTo(pet_breeds::class, "breed", "id");
    }
}
