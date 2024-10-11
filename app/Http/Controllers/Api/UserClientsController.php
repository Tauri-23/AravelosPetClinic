<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\user_clients;
use Illuminate\Http\Request;

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
}
