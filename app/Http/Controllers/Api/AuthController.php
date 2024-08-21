<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateIdService;
use App\Http\Controllers\Controller;
use App\Models\user_clients;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $generateId;

    public function __construct(IGenerateIdService $generateId)
    {
        $this->generateId = $generateId;
    }

    public function signupPost(Request $request)
    {
        $client = new user_clients();
        $clientId = $this->generateId->generate(user_clients::class, 6);
        $client->id = $clientId;

        if($client->save())
        {

        }
        else
        {
            
        }
    }
}
