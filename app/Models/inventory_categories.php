<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class inventory_categories extends Model
{
    use HasFactory;

    public function inventory()
    {
        return $this->hasMany(inventory::class, 'category', 'id');
    }
}
