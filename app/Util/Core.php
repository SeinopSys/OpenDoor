<?php

declare(strict_types=1);

namespace App\Util;


use Illuminate\Support\Facades\Blade;

class Core
{
    public static function hashPassword(string $password): string
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }
}
