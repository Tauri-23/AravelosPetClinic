<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\user_clients;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserClientsController extends Controller
{
    // GET
    public function GetAllClientsNotDeleted()
    {
        return response()->json(user_clients::whereNot('status', 'deleted')->get());
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
            default:
                return response()->json([
                    'status' => 500,
                    'message' => 'Invalid edit type'
                ]);
        }

        $client->save();
        return response()->json([
            'status' => 200,
            'message' => 'Profile updated',
            'client' => $client
        ]);
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
