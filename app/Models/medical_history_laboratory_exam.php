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
        'blood_exam_files',
        
        'distemper_test',
        'distemper_test_result',
        'distemper_test_files',
        
        'ear_swabbing',
        'ear_swabbing_result',
        'ear_swabbing_files',
        
        'ehrlichia_test',
        'ehrlichia_test_result',
        'ehrlichia_test_files',
        
        'heartworm_test',
        'heartworm_test_result',
        'heartworm_test_files',
        
        'parvo_test',
        'parvo_test_result',
        'parvo_test_files',
        
        'skin_scraping',
        'skin_scraping_result',
        'skin_scraping_files',
        
        'stool_exam',
        'stool_exam_result',
        'stool_exam_files',
        
        'ultrasound',
        'ultrasound_result',
        'ultrasound_files',
        
        'urine_exam',
        'urine_exam_result',
        'urine_exam_files',
        
        'vaginal_smear',
        'vaginal_smear_result',
        'vaginal_smear_files',
        
        'xray',
        'xray_result',
        'xray_files',
        
        'eye_strain',
        'eye_strain_result',
        'eye_strain_files',
        
        'other_test',
        'other_test_result',
        'other_test_files',
        
    ];
}
