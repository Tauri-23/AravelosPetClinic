<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class appointments extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'medical_history',
    ];


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

    public function service()
    {
        return $this->belongsTo(clinic_services::class, 'service', 'id');
    }

    public function assigned_staffs()
    {
        return $this->hasMany(appointment_assigned_staffs:: class, "appointment", "id")->with("staff");
    }

    public function assigned_items()
    {
        return $this->hasMany(appointment_assigned_items::class, "appointment", "id")->with("inventory_items_used");
    }

    public function medical_history()
    {
        return $this->belongsTo(medical_histories::class, "medical_history", "id")->with(["physical_exams", "laboratory_exams", "diagnosis"]);
    }
}
