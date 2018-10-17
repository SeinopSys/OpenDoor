<?php

use App\Util\Core;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Create the admin user
     *
     * @return void
     */
    public function run()
    {
        $user = new \App\User();
        $user->name = 'admin';
        $user->email = 'admin@example.com';
        $user->password = Core::hashPassword('ValidPassword1234');
        $user->save();
    }
}
