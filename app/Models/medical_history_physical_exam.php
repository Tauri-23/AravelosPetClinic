<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class medical_history_physical_exam extends Model
{
    use HasFactory;
    protected $fillable = [
        'general_condition', 
        'general_attitude',
        'hydration',
        'mucous_membrane',
        'head_neck',
        'eyes',
        'ears',
        'gastrointestinal',
        'urogenitals',
        'respiratory',
        'circulatory',
        'musculoskeleton',
        'lymph_nodes',
        'venous_return',
        'integumentary_skin',
    ];
}
