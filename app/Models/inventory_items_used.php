<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class inventory_items_used extends Model
{
    use HasFactory;

    public function inventory()
    {
        return $this->belongsTo(inventory::class, "inventory", "id");
    }
}
