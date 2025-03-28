<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateFilenameService;
use App\Contracts\IGenerateIdService;
use App\Http\Controllers\Controller;
use App\Models\user_admins;
use App\Models\user_clients;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserAdminsController extends Controller
{
    protected $generateId, $generateFilename;

    public function __construct(IGenerateIdService $generateId, IGenerateFilenameService $generateFilename)
    {
        $this->generateId = $generateId;
        $this->generateFilename = $generateFilename;
    }



    // GET
    public function GetAllAdminsNotDeleted($adminId)
    {
        return response()->json(user_admins::with('role')
        ->whereNot('status', 'deleted')
        ->whereNot('id', $adminId)
        ->get());
    }



    // POST
    public function CreateAdmin(Request $request)
    {
        try
        {
            DB::beginTransaction();

            $isEmailExistOnAdmins = user_admins::where("email", $request->email)->exists();
            $isEmailExistOnClients = user_clients::where("email", $request->email)->exists();

            $isPhoneExistOnAdmins = user_admins::where("phone", $request->phone)->exists();
            $isPhoneExistOnClients = user_clients::where("phone", $request->phone)->exists();

            if($isEmailExistOnAdmins || $isEmailExistOnClients)
            {
                return response()->json([
                    'status' => 401,
                    'message' => 'Email already exist.',
                ]);
            }

            if($isPhoneExistOnAdmins || $isPhoneExistOnClients)
            {
                return response()->json([
                    'status' => 401,
                    'message' => 'Phone already exist.',
                ]);
            }
            
            $photo = $request->file('pic');
            $targetDirectory = base_path('react/public/assets/media/pfp');
            $newFilename = $this->generateFilename->generate($photo, $targetDirectory);
            
            $adminId = $this->generateId->generate(user_admins::class, 6);
            $admin = new user_admins();
            $admin->id = $adminId;
            $admin->fname = $request->fname;
            $admin->mname = $request->mname ?? null;
            $admin->lname = $request->lname;
            $admin->email = $request->email;
            $admin->password = bcrypt($request->password);
            $admin->bday = $request->adminDOB;
            $admin->gender = $request->gender;
            $admin->address = $request->address;
            $admin->phone = $request->phone;
            $admin->role = $request->role;
            $admin->picture = $newFilename;

            $admin->save();

            DB::commit();

            $photo->move($targetDirectory, $newFilename);

            return response()->json([
                'status' => 200,
                'message' => 'Admin added',
                'admin' => user_admins::with("role")->find($adminId)
            ]);
        }
        catch (\Exception $e)
        {
            DB::rollBack();

            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function SuspendUnsuspendAdmin(Request $request)
    {
        $admin = user_admins::where('id', $request->adminId)->whereNot('status', 'deleted')->firstOr();

        if(!$admin)
        {
            return response()->json([
                'status' => 404,
                'message' => "Admin doesn't exist"
            ]);
        }


        $admin->status = $admin->status === 'active' ? 'suspended' : 'active';
        $message = $admin->status === "active" ? 'Admin unsuspended' : "Admin suspended";

        if($admin->save())
        {
            return response()->json([
                'status' => 200,
                'message' => $message,
                'admins' => user_admins::whereNot('status', 'deleted')
                ->whereNot('id', $request->signedId)
                ->with("role")
                ->get()
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
