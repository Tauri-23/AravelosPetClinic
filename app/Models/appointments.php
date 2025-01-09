<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class appointments extends Model
{
    use HasFactory;

    public function pet()
    {
        return $this->belongsTo(pets::class, 'pet', 'id');
    }

    public function client()
    {
        return $this->belongsTo(user_clients::class, 'client','id');
    }

    public function feedback()
    {
        return $this->belongsTo(feedbacks::class, 'id', 'appointment');
    }
}
