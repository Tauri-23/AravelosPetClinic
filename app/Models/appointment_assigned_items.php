<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class appointment_assigned_items extends Model
{
    use HasFactory;

    public function inventory_items_used()
    {
        return $this->belongsTo(inventory_items_used::class, "item","id")->with("inventory");
    }
}
