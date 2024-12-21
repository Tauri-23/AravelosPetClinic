<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class inventory extends Model
{
    use HasFactory;

    public function inventory_items()
    {
        return $this->hasMany(inventory_items::class, "inventory","id")->orderBy("expiration_date", "asc");
    }
}
