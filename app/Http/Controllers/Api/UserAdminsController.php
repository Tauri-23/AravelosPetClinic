<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\user_admins;
use Illuminate\Http\Request;

class UserAdminsController extends Controller
{
    // GET
    public function GetAllAdminsNotDeleted($adminId)
    {
        $admins = $adminId === '' 
        ? user_admins::whereNot('status', 'deleted')->get() 
        : user_admins::whereNot('status', 'deleted')->whereNot('id', $adminId)->get();
        return response()->json($admins);
    }



    // POST
    public function SuspendUnsuspendAdmin(Request $request)
    {
        $client = user_admins::where('id', $request->adminId)->whereNot('status', 'deleted')->firstOr();

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
                'clients' => user_admins::whereNot('status', 'deleted')->get()
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

    public function DeleteAdmin(Request $request)
    {
        $client = user_admins::find($request->adminId);

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
