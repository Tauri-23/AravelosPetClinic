<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateFilenameService;
use App\Contracts\IGenerateIdService;
use App\Http\Controllers\Controller;
use App\Models\pets;
use App\Models\dog_breeds;
use App\Models\cat_breeds;
use App\Models\pet_types;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PetsController extends Controller
{
    protected $generateId, $generateFilename;

    public function __construct(IGenerateIdService $generateId, IGenerateFilenameService $generateFilename)
    {
        $this->generateId = $generateId;
        $this->generateFilename = $generateFilename;
    }


    // POST
    public function CreatePet(Request $request)
    {
        

        try
        {
            DB::beginTransaction();
            
            $petIn = json_decode($request->input("petIn"), true);
            $petId = $this->generateId->generate(pets::class, 6);
            $pet = new pets();


            if($request->pic)
            {
                $photo = $request->file('pic');
                $targetDirectory = base_path("react/public/assets/media/pets");
                $newFilename = $this->generateFilename->generate($photo, $targetDirectory);

                $photo->move($targetDirectory, $newFilename);

                $pet->picture = $newFilename;
            }


            $pet->id = $petId;
            $pet->client = $petIn["client"];
            $pet->name = $petIn["name"];
            $pet->type = $petIn["type"];
            $pet->gender = $petIn["gender"];
            $pet->dob = $petIn["dob"];
            $pet->breed = $petIn["breed"];
            
            $pet->save();

            DB::commit();

            return response()->json([
                'status' => 200,
                'message' =>'Pet added.',
                'pet' => $pet
            ]);
        }
        catch(\Exception $ex)
        {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $ex->getMessage()
            ], 500);
        }


    }

    public function UpdatePet(Request $request)
    {
        try
        {
            DB::beginTransaction();
            $petData = json_decode($request->input('petData'), true); // true = associative array

            // return response()->json([
            //     "message" => $petData
            // ], 500);

            $pet = pets::find($petData["id"]);
            $pet->name = $petData["name"];
            $pet->type = $petData["type"];
            $pet->breed = $petData["breed"];
            $pet->gender = $petData["gender"];

            if($request->petPic)
            {
                $photo = $request->file("petPic");
                $targetDirectory = base_path("react/public/assets/media/pets");
                $newFilename = $this->generateFilename->generate($photo, $targetDirectory);

                $photo->move($targetDirectory, $newFilename);

                $pet->picture = $newFilename;
            }

            $pet->save();

            DB::commit();

            return response()->json([
                "status" => 200,
                "message" => "success",
                "pet" => $pet
            ]);

        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                "status" => 500,
                "message" => $e->getMessage()
            ], 500);
        }
    }

    public function EditPetLabel(Request $request)
    {
        try
        {
            DB::beginTransaction();

            $pet = pets::with("client")->find($request->petId);

            if(!$pet)
            {
                return response()->json([
                    "status" => 404,
                    "message" => "Pet doesn't exist"
                ]);
            }

            $pet->label = $request->label;
            $pet->save();

            DB::commit();

            return response()->json([
                "status" => 200,
                "message" => "Success",
                "pet" => $pet
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                "status" => 500,
                "message" => $e->getMessage()
            ], 500);
        }
    }



    // GET
    public function GetPetsWhereClient($clientId)
    {
        return response()->json(pets::where('client', $clientId)->get());
    }

    public function GetPetInfoWhereId($petId)
    {
        return response()->json(pets::with("client")->find($petId));
    }

    public function UpdatePetProfile(Request $request)
    {
        $pet = pets::find($request->petId);

        if (!$pet) {
            return response()->json([
                'status' => 404,
                'message' => 'Pet not found'
            ]);
        }

        try {
            // Update the pet details if they exist in the request
            if ($request->has('name')) {
                $pet->name = $request->name;
            }

            if ($request->has('type')) {
                $pet->type = $request->type;
            }

            if ($request->has('breed')) {
                // You may want to store the breed ID instead of the breed name
                $pet->breed = $request->breed; // Ensure you're passing the breed ID here
            }

            if ($request->has('gender')) {
                $pet->gender = $request->gender;
            }

            if ($request->has('dob')) {
                $pet->dob = $request->dob;
            }

            // Handle picture upload (if present)
            if ($request->hasFile('pic')) {
                // Delete the old picture if it exists
                if ($pet->picture && file_exists(public_path('assets/media/pets/' . $pet->picture))) {
                    unlink(public_path('assets/media/pets/' . $pet->picture));
                }

                $photo = $request->file('pic');
                $targetDirectory = public_path('assets/media/pets');
                $newFilename = $this->generateFilename->generate($photo, $targetDirectory);

                $photo->move($targetDirectory, $newFilename);

                $pet->picture = $newFilename;
            }

            // Save the updated pet profile to the database
            $pet->save();

            return response()->json([
                'status' => 200,
                'message' => 'Pet profile updated successfully',
                'pet' => $pet
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to update pet profile: ' . $ex->getMessage()
            ], 500);
        }
    }

    public function GetAllPetTypesWithBreeds()
    {
        return response()->json(pet_types::with("pet_breeds")->get());
    }

}
