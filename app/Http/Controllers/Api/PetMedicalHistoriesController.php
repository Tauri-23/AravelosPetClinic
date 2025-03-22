<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\pet_medical_history_allergies;
use App\Models\pet_medical_history_diseases;
use App\Models\pet_medical_history_medications;
use App\Models\pets;
use DB;
use Illuminate\Http\Request;

class PetMedicalHistoriesController extends Controller
{
    //
    public function AddPetAllergies(Request $request)
    {
        try 
        {
            DB::beginTransaction();
            $allergies = new pet_medical_history_allergies();
            $allergies->pet = $request->petId;
            $allergies->allergy = $request->allergy;
            $allergies->save();
            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'success',
                'pets' => pets::where('client', $request->client)->with(["allergies", "medications", "diseases"])->get()
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function AddPetMedications(Request $request)
    {
        try 
        {
            DB::beginTransaction();
            $medications = new pet_medical_history_medications();
            $medications->pet = $request->petId;
            $medications->medication = $request->medication;
            $medications->save();
            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'success',
                'pets' => pets::where('client', $request->client)->with(["allergies", "medications", "diseases"])->get()
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function AddPetDiseases(Request $request)
    {
        try 
        {
            DB::beginTransaction();
            $diseases = new pet_medical_history_diseases();
            $diseases->pet = $request->petId;
            $diseases->disease = $request->disease;
            $diseases->save();
            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'success',
                'diseases' => $diseases
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
