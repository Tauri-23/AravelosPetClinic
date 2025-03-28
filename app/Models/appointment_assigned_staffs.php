<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class appointment_assigned_staffs extends Model
{
    use HasFactory;

    public function staff()
    {
        return $this->belongsTo(user_admins::class, "staff", "id");
    }
}
