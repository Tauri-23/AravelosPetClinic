<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class medical_history_diagnosis extends Model
{
    use HasFactory;
    protected $fillable = [
        'tentative_diagnosis',
        'final_diagnosis',
        'prognosis',
        'vaccine_given',
        'prescribed_medication',
    ];
}
