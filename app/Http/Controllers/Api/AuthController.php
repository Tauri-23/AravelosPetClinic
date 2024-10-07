<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateIdService;
use App\Http\Controllers\Controller;
use App\Models\user_admins;
use App\Models\user_clients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    protected $generateId;

    public function __construct(IGenerateIdService $generateId)
    {
        $this->generateId = $generateId;
    }

    public function signupPost(Request $request)
    {
        $isEmailExist = user_clients::where('email', $request->email)->exists();
        $isPhoneExist = user_clients::where('phone', $request->phone)->exists();

        if($isEmailExist)
        {
            return response()->json([
                'status' => 422,
                'message' => 'Email already exists.'
            ]);
        }

        if($isPhoneExist)
        {
            return response()->json([
                'status' => 422,
                'message' => 'Phone number aleady exists.'
            ]);
        }

        $client = new user_clients();
        $clientId = $this->generateId->generate(user_clients::class, 6);
        $client->id = $clientId;
        $client->fname = $request->fname;
        $client->mname = $request->mname == 'null' ? null : $request->mname;
        $client->lname = $request->lname;
        $client->email = $request->email;
        $client->password = bcrypt($request->password);
        $client->phone = $request->phone;

        if($client->save())
        {
            $client = user_clients::find($clientId);
            $token = $client->createToken('main')->plainTextToken;

            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'user' => $client,
                'token' => $token,
                'user_type' => 'client'
            ]);
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => 'Something went wrong please try again later.'
            ]);
        }
    }

    public function login(Request $request)
    {
        $client = user_clients::where('email', $request->email)->first();
        $admin = user_admins::where('email', $request->email)->first();

        if($client && Hash::check($request->password, $client->password))
        {
            if($client->status === 'suspended')
            {
                return response()->json([
                    'status' => 401,
                    'message' => "Account suspended."
                ]);
            }

            $token = $client->createToken('main')->plainTextToken;

            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'user' => $client,
                'token' => $token,
                'user_type' => "client"
            ]);
        }
        else if($admin && Hash::check($request->password, $admin->password))
        {
            $token = $admin->createToken('main')->plainTextToken;
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'user' => $admin,
                'token' => $token,
                'role' => $admin->role,
                'user_type' => "admin"
            ]);
        }
        else {
            return response()->json([
                'status' => 401,
                'message' => "Credentials don't match"
            ]);
        }
    }


    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user) 
        {
            $user->tokens()->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Logged out successfully.'
            ]);
        }

        return response()->json([
            'status' => 401,
            'message' => 'User not authenticated.'
        ], 401);
    }


    public function getUser(Request $request) 
    {
        $user = $request->user();
        $userType = $user instanceof user_clients ? 'client' : 'admin'; //This is for now
        return response()->json([
            'user' => $user,
            'user_type' => $userType,
        ]);
    }
}
