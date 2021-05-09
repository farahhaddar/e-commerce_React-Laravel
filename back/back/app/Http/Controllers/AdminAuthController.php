<?php
namespace App\Http\Controllers;

use App\Admins;
use Illuminate\Http\Request;
use App\Http\Requests\AdminRequest;

class AdminAuthController extends Controller
{
    public function register(AdminRequest $request)
    {
        $admin = Admins::create([
             'name' => $request->name,
             'email'    => $request->email,
             'password' => $request->password,
         ]);

        $token = auth('admins')->login($admin);

        return $this->respondWithToken($token);
    }

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('admins')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth('admins')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60,
            'Admin'         => auth()->user()
        ]);
    }
}
