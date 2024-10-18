<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateFilenameService;
use App\Contracts\IGenerateIdService;
use App\Http\Controllers\Controller;
use App\Models\user_admins;
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
    public function GetAllAdminsNotDeleted()
    {
        return response()->json(user_admins::with('role')->whereNot('status', 'deleted')->get());
    }



    // POST
    public function CreateAdmin(Request $request)
    {
        $adminId = $this->generateId->generate(user_admins::class, 6);
        try
        {
            $photo = $request->file('pic');
            $targetDirectory = base_path('react/public/assets/media/pfp');
            $newFilename = $this->generateFilename->generate($photo, $targetDirectory);
            $photo->move($targetDirectory, $newFilename);

            $admin = new user_admins();
            $admin->id = $adminId;
            $admin->fname = $request->fname;
            $admin->mname = $request->mname ? $request->mname : null;
            $admin->lname = $request->lname;
            $admin->email = $request->email;
            $admin->password = bcrypt($request->password);
            $admin->bday = $request->adminDOB;
            $admin->gender = $request->Gender;
            $admin->address = $request->address;
            $admin->phone = $request->phone;
            $admin->role = $request->role;
            $admin->picture = $newFilename;

            $admin->save();

            return response()->json([
                'status' => 200,
                'message' => 'Admin added',
                'admin' => $admin
            ]);
        }
        catch (\Exception $ex)
        {
            return response()->json([
                'status' => 500,
                'message' =>'Failed to upload file: ' . $ex->getMessage()
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
                'admins' => user_admins::whereNot('status', 'deleted')->get()
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
