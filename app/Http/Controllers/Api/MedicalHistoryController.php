<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\appointments;
use App\Models\medical_histories;
use App\Models\medical_history_diagnosis;
use App\Models\medical_history_laboratory_exam;
use App\Models\medical_history_physical_exam;
use DB;
use Illuminate\Http\Request;

class MedicalHistoryController extends Controller
{
    //POST
    public function CreateMedicalHistory(Request $request)
    {
        try
        {
            DB::beginTransaction();

            $physicalExam = medical_history_physical_exam::create([
                'general_condition' => $request->genCon,
                'general_attitude' => $request->genAttitude,
                'hydration' => $request->hydration,
                'mucous_membrane' => $request->mucousMembrane,
                'head_neck' => $request->headNeck,
                'eyes' => $request->eyes,
                'ears' => $request->ears,
                'gastrointestinal' => $request->gastrointestinal,
                'urogenitals' => $request->urogenitals,
                'respiratory' => $request->respiratory,
                'circulatory' => $request->circulatory,
                'musculoskeleton' => $request->musculoskeleton,
                'lymph_nodes' => $request->lymphNodes,
                'venous_return' => $request->venousReturn,
                'integumentary_skin' => $request->integumentarySkin,
            ]);

            $labExam = medical_history_laboratory_exam::create([
                'blood_exam' => $request->bloodExam,
                'blood_exam_result' => $request->bloodExam ? $request->bloodExamResult : null,
                'distemper_test' => $request->distemperTest,
                'distemper_test_result' => $request->distemperTest ? $request->distemperTestResult : null,
                'ear_swabbing' => $request->earSwabbing,
                'ear_swabbing_result' => $request->earSwabbing ? $request->earSwabbingResult : null,
                'ehrlichia_test' => $request->ehrlichiaTest,
                'ehrlichia_test_result' => $request->ehrlichiaTest ? $request->ehrlichiaTestResult : null,
                'heartworm_test' => $request->heartwormTest,
                'heartworm_test_result' => $request->heartwormTest ? $request->heartwormTestResult : null,
                'parvo_test' => $request->parvoTest,
                'parvo_test_result' => $request->parvoTest ? $request->parvoTestResult : null,
                'skin_scraping' => $request->skinScraping,
                'skin_scraping_result' => $request->skinScraping ? $request->skinScrapingResult : null,
                'stool_exam' => $request->stoolExam,
                'stool_exam_result' => $request->stoolExam ? $request->stoolExamResult : null,
                'ultrasound' => $request->ultrasound,
                'ultrasound_result' => $request->ultrasound ? $request->ultrasoundResult : null,
                'urine_exam' => $request->urineExam,
                'urine_exam_result' => $request->urineExam ? $request->urineExamResult : null,
                'vaginal_smear' => $request->vaginalSmear,
                'vaginal_smear_result' => $request->vaginalSmear ? $request->vaginalSmearResult : null,
                'xray' => $request->xray,
                'xray_result' => $request->xray ? $request->xrayResult : null,
                'other_test' => $request->otherTest,
                'other_test_result' => $request->otherTestResult,
            ]);
            
            $diagnosis = medical_history_diagnosis::create([
                'tentative_diagnosis' => $request->tentativeDiagnosis,
                'final_diagnosis' => $request->finalDiagnosis,
                'prognosis' => $request->prognosis,
                'vaccine_given' => $request->vaccineGiven,
                'prescribed_medication' => $request->prescribedMed,
            ]);

            // return response()->json([
            //     "status" => 500,
            //     "message" => [
            //         "weight" => $request->weight,
            //         "pulse" => $request->pulse,
            //         "respiratoryRate" => $request->respiratoryRate,
            //         "temp" => $request->temp,
            //         "diet" => $request->diet != "" ? $request->diet: null,
            //         "allergies" => $request->allergies != "" ? $request->allergies: null,
            //         "prevSurg" => $request->prevSurg != "" ? $request->prevSurg: null,
            //         "request" => $request->requestOrComplaints != "" ? $request->requestOrComplaints: null,
            //         "medByOwner" => $request->medByOwner != "" ? $request->medByOwner: null,
            //         "medByOtherVet" => $request->medByOtherVet != "" ? $request->medByOtherVet: null,
            //         "procedure" => $request->procedure != "" ? $request->procedure: null,
            //         "selectedNextAptDateTime" => $request->selectedNextAptDateTime != "" ? $request->selectedNextAptDateTime: null,
            //         "physicalExamid" => $physicalExam->id,
            //         "labExamid" => $labExam->id,
            //         "diagnosisid" => $diagnosis->id,
            //     ],
            // ], 500);

            $medHistory = medical_histories::create([
                'weight' => $request->weight,
                'pulse' => $request->pulse,
                'respiratory_rate' => $request->respiratoryRate,
                'temperature' => $request->temp,
                'diet' => $request->diet != "" ? $request->diet: null,
                'allergies' => $request->allergies != "" ? $request->allergies: null,
                'previous_surgery' => $request->prevSurg != "" ? $request->prevSurg: null,
                'complaints_or_requests' => $request->requestOrComplaints != "" ? $request->requestOrComplaints: null,
                'medication_by_owner' => $request->medByOwner != "" ? $request->medByOwner: null,
                'medication_by_other_vets' => $request->medByOtherVet != "" ? $request->medByOtherVet: null,
                'procedure_done' => $request->procedure != "" ? $request->procedure: null,
                'next_appointment_date' => $request->selectedNextAptDate != "" ? $request->selectedNextAptDate: null,
                'physical_exams' => $physicalExam->id,
                'laboratory_exams' => $labExam->id,
                'diagnosis' => $diagnosis->id,
                'note' => $request->note
            ]);

            // UPDATE THE APPOINTMENT
            $appointment = appointments::find($request->appointmentId);
            if (!$appointment) {
                throw new \Exception("Appointment not found.");
            }
            $appointment->update([
                'status' => 'Completed',
                'medical_history' => $medHistory->id,
            ]);

            DB::commit();
            return response()->json([
                "status" => 200,
                "message" => "Success"
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();

            return response()->json([
                "status" => 500,
                "message" => $e->getMessage(),
            ], 500);
        }
    }
}
