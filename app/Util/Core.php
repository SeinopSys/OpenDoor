<?php

declare(strict_types=1);

namespace App\Util;

use Illuminate\Support\Facades\Auth;

class Core
{
    public static function hashPassword(string $password): string
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }

    public static function getAuthTokenExpiry(): ?string
    {
        if (Auth::check()) {
            return date('c', auth()->payload()['exp']);
        }
        return null;
    }
}
