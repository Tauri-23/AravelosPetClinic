<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class medical_histories extends Model
{
    use HasFactory;
    protected $fillable = [
        'weight',
        'pulse',
        'respiratory_rate',
        'temperature',
        'diet',
        'allergies',
        'previous_surgery',
        'complaints_or_requests',
        'medication_by_owner',
        'medication_by_other_vets',
        'procedure_done',
        'next_appointment_date_time',
        'physical_exams',
        'laboratory_exams',
        'diagnosis',
    ];

    public function physical_exams()
    {
        return $this->belongsTo(medical_history_physical_exam::class, "physical_exams", "id");
    }

    public function laboratory_exams()
    {
        return $this->belongsTo(medical_history_laboratory_exam::class, "laboratory_exams", "id");
    }

    public function diagnosis()
    {
        return $this->belongsTo(medical_history_diagnosis::class, "diagnosis", "id");
    }
}
