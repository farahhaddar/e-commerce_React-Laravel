<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class AssignGuard extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $guard)
    {
        if ($guard == "admins" && Auth::guard($guard)->check()) {
        } else if ($guard == "users" && Auth::guard($guard)->check()) {
        } else {
            return response()->json(['status' => 'Not authorized']);
        }

        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json(['status' => 'Token Invalid']);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json(['status' => 'Token expired']);
            } else {
                return response()->json(['status' => 'Authorization Token not found']);
            }
        }
        return $next($request);
    }
}