<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\user_admins;
use Illuminate\Http\Request;

class UserAdminsController extends Controller
{
    // GET
    public function GetAllAdminsNotDeleted()
    {
        return response()->json(user_admins::whereNot('status', 'deleted')->get());
    }



    // POST
    public function SuspendUnsuspendAdmin(Request $request)
    {
        $admin = user_admins::where('id', $request->adminId)->whereNot('status', 'deleted')->firstOr();

        if(!$admin)
        {
            return response()->json([
                'status' => 404,
                'message' => "Client doesn't exist"
            ]);
        }


        $admin->status = $admin->status === 'active' ? 'suspended' : 'active';
        $message = $admin->status === "active" ? 'Admin unsuspended' : "Admin suspended";

        if($admin->save())
        {
            return response()->json([
                'status' => 200,
                'message' => $message,
                'admin' => user_admins::whereNot('status', 'deleted')->get()
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
        $admin = user_admins::find($request->adminId);

        if(!$admin)
        {
            return response()->json([
                'status' => 404,
                'message' => 'Admin not found'
            ]);
        }

        $admin->status = 'deleted';

        if($admin->save())
        {
            return response()->json([
                'status' => 200,
                'message' => 'Admin deleted'
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Admin not found'
            ]);
        }
    }
}
