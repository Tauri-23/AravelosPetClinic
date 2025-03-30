<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateFilenameService;
use App\Contracts\IGenerateIdService;
use App\Http\Controllers\Controller;
use App\Models\pets;
use Illuminate\Http\Request;

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
        $petId = $this->generateId->generate(pets::class, 6);

        try
        {
            $photo = $request->file('pic');
            $targetDirectory = base_path("react/public/assets/media/pets");
            $newFilename = $this->generateFilename->generate($photo, $targetDirectory);

            $photo->move($targetDirectory, $newFilename);

            $pet = new pets();
            $pet->id = $petId;
            $pet->client = $request->client;
            $pet->name = $request->petName;
            $pet->type = $request->petType;
            $pet->gender = $request->petGender;
            $pet->dob = $request->petDOB;
            $pet->breed = $request->petBreed;
            $pet->picture = $newFilename;
            $pet->save();

            return response()->json([
                'status' => 200,
                'message' =>'Pet added.',
                'pet' => $pet
            ]);
        }
        catch(\Exception $ex)
        {
            return response()->json([
                'status' => 500,
                'message' =>'Failed to upload file: ' . $ex->getMessage()
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
}
