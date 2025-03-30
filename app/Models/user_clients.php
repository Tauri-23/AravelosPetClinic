<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class user_clients extends Model
{
    use HasFactory, HasApiTokens;

    public function pets()
    {
        return $this->hasMany(pets::class, "client", "id");
    }
}
