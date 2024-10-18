<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class user_admins extends Model
{
    use HasFactory, HasApiTokens;

    public function role()
    {
        return $this->belongsTo(admin_roles::class, 'role', 'id');
    }
}
