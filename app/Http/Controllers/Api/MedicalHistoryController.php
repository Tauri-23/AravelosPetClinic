<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateFilenameService;
use App\Http\Controllers\Controller;
use App\Models\appointment_assigned_items;
use App\Models\appointments;
use App\Models\inventory;
use App\Models\inventory_items;
use App\Models\inventory_items_used;
use App\Models\medical_histories;
use App\Models\medical_history_diagnosis;
use App\Models\medical_history_laboratory_exam;
use App\Models\medical_history_physical_exam;
use DB;
use Illuminate\Http\Request;

class MedicalHistoryController extends Controller
{
    protected $generateFilename;

    public function __construct(IGenerateFilenameService $iGenerateFilename)
    {
        $this->generateFilename = $iGenerateFilename;
    }




    //POST
    public function CreateMedicalHistory(Request $request)
    {
        try
        {
            DB::beginTransaction();

            // Loop Through Selected Items from requests
            foreach($request->items as $item) 
            {
                $decodedItem = json_decode($item);

                $inventoryItems = inventory_items::where('inventory', $decodedItem->id)
                ->orderBy('expiration_date', 'asc')
                ->with("inventory")
                ->get();

                $requiredDosage = $decodedItem->dosageDeductCustom
                    ? $decodedItem->dosageDeductValue
                    : match ($decodedItem->dosageDeductValue->label) {
                        'toy'    => $inventoryItems[0]->inventory()->first()->toy_deduct,
                        'small'  => $inventoryItems[0]->inventory()->first()->sm_deduct,
                        'medium' => $inventoryItems[0]->inventory()->first()->med_deduct,
                        'large'  => $inventoryItems[0]->inventory()->first()->lg_deduct,
                        default  => 0,
                    };

                $remainingDosage = $requiredDosage;
                $itemUsedByDosage = [];

                foreach ($inventoryItems as $item) {
                    if ($remainingDosage <= 0) break;

                    $available = $item->volume_remain;

                    if ($available >= $remainingDosage) {
                        $item->volume_remain -= $remainingDosage;
                        $item->save();

                        $item->dosage_used = $remainingDosage;
                        $item->dosage_type = $item->inventory()->first()->dosage_type;

                        // return response()->json($item, 500);

                        // Record the used item
                        $itemUsedByDosage[] = $item;

                        $remainingDosage = 0;
                    } else {
                        $item->volume_remain = 0;
                        $item->save();

                        $item->dosage_used = $remainingDosage;
                        $itemUsedByDosage[] = $item;

                        $remainingDosage -= $available;
                    }
                }


                // Make a Copy of the Inventory Items Used
                foreach($itemUsedByDosage as $item)
                {
                    $inventoryItemsUsed = new inventory_items_used();
                    $inventoryItemsUsed->inventory_item_id = (string)$item->id;
                    $inventoryItemsUsed->inventory = $item->inventory;
                    $inventoryItemsUsed->expiration_date = $item->expiration_date;
                    $inventoryItemsUsed->dosage_used = $item->dosage_used;
                    $inventoryItemsUsed->dosage_type = $item->dosage_type;
                    $inventoryItemsUsed->created_at = $item->created_at;
                    $inventoryItemsUsed->updated_at = $item->updated_at;
                    $inventoryItemsUsed->save();

                    $appointmentItem = new appointment_assigned_items();
                    $appointmentItem->item = (int)$inventoryItemsUsed->id;
                    $appointmentItem->appointment_pet = $request->appointmentPet;
                    $appointmentItem->save();

                    // Decrement the Inventory if the usedMedicine is 0 dosage
                    if($item->volume_remain <= 0)
                    {
                        $inventory = inventory::find((int)$decodedItem->id);
                        $inventory->qty -= 1;
                        $inventory->save();

                        // put in transaction history
                        $invHist = new InventoryHistoryController();
                        $invHist->AddInventoryHistory($inventory->name, "-", 1, "Patient Care");
                    }
                }
            }

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

            $labTestFields = [
                'bloodExamFiles',
                'distemperTestFiles',
                'earSwabbingFiles',
                'ehrlichiaTestFiles',
                'heartwormTestFiles',
                'parvoTestFiles',
                'skinScrapingFiles',
                'stoolExamFiles',
                'ultrasoundFiles',
                'urineExamFiles',
                'vaginalSmearFiles',
                'xrayFiles',
                'eyeStrainFiles',
                'otherTestFiles',
            ];
            $savedFiles = [];
            
            // Upload the files
            foreach ($labTestFields as $field) {
                $files = $request->input($field); // gets the array of file+desc per test
                if (!is_array($files)) continue;
            
                foreach ($files as $index => $fileInfo) {
                    $fileInputName = "{$field}.{$index}.file"; // e.g. bloodExamFiles.0.file
            
                    if ($request->hasFile($fileInputName)) {
                        $uploadedFile = $request->file($fileInputName);
            
                        $targetDirectory = base_path("react/public/assets/media/medhistory");
                        $newFilename = $this->generateFilename->generate($uploadedFile, $targetDirectory);
            
                        $uploadedFile->move($targetDirectory, $newFilename);
            
                        // Optional: Save with associated description
                        $desc = $fileInfo['desc'] ?? null;
                        $savedFiles[$field][$index] = [
                            'file' => $newFilename,
                            'desc' => $desc,
                        ];
                    }
                }
            }
            

            $labExam = medical_history_laboratory_exam::create([
                'blood_exam' => $request->bloodExam,
                'blood_exam_result' => $request->bloodExam ? $request->bloodExamResult : null,
                'blood_exam_files' => $request->bloodExam ? json_encode($savedFiles["bloodExamFiles"]) : null,

                'distemper_test' => $request->distemperTest,
                'distemper_test_result' => $request->distemperTest ? $request->distemperTestResult : null,
                'distemper_test_files' => $request->distemperTest ? json_encode($savedFiles["distemperTestFiles"]) : null,

                'ear_swabbing' => $request->earSwabbing,
                'ear_swabbing_result' => $request->earSwabbing ? $request->earSwabbingResult : null,
                'ear_swabbing_files' => $request->earSwabbing ? json_encode($savedFiles["earSwabbingFiles"]) : null,

                'ehrlichia_test' => $request->ehrlichiaTest,
                'ehrlichia_test_result' => $request->ehrlichiaTest ? $request->ehrlichiaTestResult : null,
                'ehrlichia_test_files' => $request->ehrlichiaTest ? json_encode($savedFiles["ehrlichiaTestFiles"]) : null,

                'heartworm_test' => $request->heartwormTest,
                'heartworm_test_result' => $request->heartwormTest ? $request->heartwormTestResult : null,
                'heartworm_test_files' => $request->heartwormTest ? json_encode($savedFiles["heartwormTestFiles"]) : null,

                'parvo_test' => $request->parvoTest,
                'parvo_test_result' => $request->parvoTest ? $request->parvoTestResult : null,
                'parvo_test_files' => $request->parvoTest ? json_encode($savedFiles["parvoTestFiles"]) : null,

                'skin_scraping' => $request->skinScraping,
                'skin_scraping_result' => $request->skinScraping ? $request->skinScrapingResult : null,
                'skin_scraping_files' => $request->skinScraping ? json_encode($savedFiles["skinScrapingFiles"]) : null,

                'stool_exam' => $request->stoolExam,
                'stool_exam_result' => $request->stoolExam ? $request->stoolExamResult : null,
                'stool_exam_files' => $request->stoolExam ? json_encode($savedFiles["stoolExamFiles"]) : null,

                'ultrasound' => $request->ultrasound,
                'ultrasound_result' => $request->ultrasound ? $request->ultrasoundResult : null,
                'ultrasound_files' => $request->ultrasound ? json_encode($savedFiles["ultrasoundFiles"]) : null,

                'urine_exam' => $request->urineExam,
                'urine_exam_result' => $request->urineExam ? $request->urineExamResult : null,
                'urine_exam_files' => $request->urineExam ? json_encode($savedFiles["urineExamFiles"]) : null,

                'vaginal_smear' => $request->vaginalSmear,
                'vaginal_smear_result' => $request->vaginalSmear ? $request->vaginalSmearResult : null,
                'vaginal_smear_files' => $request->vaginalSmear ? json_encode($savedFiles["vaginalSmearFiles"]) : null,

                'xray' => $request->xray,
                'xray_result' => $request->xray ? $request->xrayResult : null,
                'xray_files' => $request->xray ? json_encode($savedFiles["xrayFiles"]) : null,

                'eye_strain' => $request->eyeStrain,
                'eye_strain_result' => $request->eyeStrain ? $request->eyeStrainResult : null,
                'eye_strain_files' => $request->eyeStrain ? json_encode($savedFiles["eyeStrainFiles"]) : null,

                'other_test' => $request->otherTest,
                'other_test_result' => $request->otherTestResult,
                'other_test_files' => $request->otherTest ? json_encode($savedFiles["otherTestFiles"]) : null,

            ]);
            
            $diagnosis = medical_history_diagnosis::create([
                'tentative_diagnosis' => $request->tentativeDiagnosis,
                'final_diagnosis' => $request->finalDiagnosis,
                'prognosis' => $request->prognosis,
                'vaccine_given' => $request->vaccineGiven,
                'prescribed_medication' => $request->prescribedMed,
            ]);

            medical_histories::create([
                'appointment_pet' => $request->appointmentPet,
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
            $allHaveMedicalHistory = $appointment->appointment_pets()
            ->get()
            ->every(function ($appointmentPet) {
                return count($appointmentPet->medical_history) > 0;
            });
            
            if (!$appointment) {
                throw new \Exception("Appointment not found.");
            }
            if($allHaveMedicalHistory)
            {
                $appointment->update([
                    'status' => 'Completed'
                ]);
            }
            

            DB::commit();
            return response()->json([
                "status" => 200,
                "message" => "Success",
                "allPetsDone" => $allHaveMedicalHistory
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
