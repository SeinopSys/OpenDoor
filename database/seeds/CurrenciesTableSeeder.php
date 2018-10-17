<?php

use Illuminate\Database\Seeder;

class CurrenciesTableSeeder extends Seeder
{
    /**
     * Create the admin user
     *
     * @return void
     */
    public function run()
    {
        $codes = array_keys(\App\Currency::AVAILABLE);
        $values = die(Kint::dump(\App\Util\CurrencyHelper::fetchValue($codes)));
    }
}
