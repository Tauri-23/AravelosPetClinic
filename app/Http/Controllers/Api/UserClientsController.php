<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateFilenameService;
use App\Http\Controllers\Controller;
use App\Models\user_clients;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserClientsController extends Controller
{
    protected $generateFilename;


    public function __construct(IGenerateFilenameService $generateFilename)
    {
        $this->generateFilename = $generateFilename;
    }

    
    // GET
    public function GetAllClientsNotDeleted()
    {
        return response()->json(user_clients::whereNot('status', 'deleted')->get());
    }

    public function GetClientInformationWhereId($clientId)
    {
        return response()->json(user_clients::with("pets")->find($clientId));
    }





    // POST
    public function SuspendUnsuspendClient(Request $request)
    {
        $client = user_clients::where('id', $request->clientId)->whereNot('status', 'deleted')->firstOr();

        if(!$client)
        {
            return response()->json([
                'status' => 404,
                'message' => "Client doesn't exist"
            ]);
        }

        
        $client->status = $client->status === 'active' ? 'suspended' : 'active';
        $message = $client->status === "active" ? 'Client unsuspended' : "Client suspended";

        if($client->save())
        {
            return response()->json([
                'status' => 200,
                'message' => $message,
                'clients' => user_clients::whereNot('status', 'deleted')->get()
            ]);
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => "Something went wrong please try again later"
            ]);
        }
    }

    public function DeleteClient(Request $request)
    {
        $client = user_clients::find($request->clientId);

        if(!$client)
        {
            return response()->json([
                'status' => 404,
                'message' => 'Client not found'
            ]);
        }

        $client->status = 'deleted';

        if($client->save())
        {
            return response()->json([
                'status' => 200,
                'message' => 'Client deleted'
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 404,
                'message' => 'Client not found'
            ]);
        }
    }

    public function UpdateClientProfile(Request $request)
    {
        try
        {
            DB::beginTransaction();

            $client = user_clients::find($request->clientId);

            if(!$client)
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Client not found'
                ]);
            }

            if(!(Hash::check($request->password, $client->password)))
            {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid password'
                ]);
            }

            switch($request->editType)
            {
                case "name":
                    $client->fname = $request->fname;
                    $client->mname = $request->mname ?? null;
                    $client->lname = $request->lname;
                    break;
                case "gender":
                    $client->gender = $request->gender;
                    break;
                case "pfp":
                    $photo = $request->file("newPFP");
                    $targetDirectory = base_path("react/public/assets/media/pfp");
                    $newFilename = $this->generateFilename->generate($photo, $targetDirectory);

                    $photo->move($targetDirectory, $newFilename);

                    $client->picture = $newFilename;
                    break;
                case "phone":
                    $client->phone = $request->newPhone;
                    break;
                case "password":
                    $client->password = bcrypt($request->newPassword);
                    break;
                default:
                    return response()->json([
                        'status' => 500,
                        'message' => 'Invalid edit type (Controller)'
                    ]);
            }

            $client->save();
            DB::commit();
            return response()->json([
                'status' => 200,
                'message' => 'Profile updated',
                'client' => $client
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

    public function ChangeClientPassword(Request $request)
    {
        try
        {
            DB::beginTransaction();
            $client = user_clients::where('email', $request->email)->firstOrFail();

            $client->password = bcrypt($request->password);
            $client->save();
            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'Password changed successfully'
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }
}
