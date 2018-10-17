<?php

namespace App\Http\Controllers;

use App\Http\Requests\Login;
use App\Http\Requests\Registration;
use App\Http\Resources\UserResource;
use App\Util\Core;
use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Registration $request)
    {
        $data = $request->validated();
        $user = new User();
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = Core::hashPassword($data['password']);
        $user->save();

        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }

    public function login(Login $request)
    {
        $credentials = $request->validated();

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['message' => trans('login.errors.invalid_credentials')], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully signed out']);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(new UserResource(auth()->user()));
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function check()
    {
        return response()->json([
            'user' => new UserResource(auth()->user()),
        ]);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * MINUTE_IN_SECONDS,
            'user' => new UserResource(auth()->user()),
        ]);
    }
}
