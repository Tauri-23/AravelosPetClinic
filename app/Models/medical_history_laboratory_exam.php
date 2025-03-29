<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class medical_history_laboratory_exam extends Model
{
    use HasFactory;
    protected $fillable = [
        'blood_exam',
        'blood_exam_result',
        'distemper_test',
        'distemper_test_result',
        'ear_swabbing',
        'ear_swabbing_result',
        'ehrlichia_test',
        'ehrlichia_test_result',
        'heartworm_test',
        'heartworm_test_result',
        'parvo_test',
        'parvo_test_result',
        'skin_scraping',
        'skin_scraping_result',
        'stool_exam',
        'stool_exam_result',
        'ultrasound',
        'ultrasound_result',
        'urine_exam',
        'urine_exam_result',
        'vaginal_smear',
        'vaginal_smear_result',
        'xray',
        'xray_result',
        'other_test',
        'other_test_result',
    ];
}
