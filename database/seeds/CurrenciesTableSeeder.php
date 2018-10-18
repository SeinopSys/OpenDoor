<?php

use Illuminate\Database\Seeder;

class CurrenciesTableSeeder extends Seeder
{
    /**
     * Fetch conversion rates for all supported currencies
     *
     * @return void
     */
    public function run()
    {
        $codes = array_keys(\App\Currency::AVAILABLE);
        $values = \App\Util\CurrencyHelper::fetchValue($codes);
        foreach ($values as $code => $usdValue) {
            $c = new \App\Currency();
            $c->code = $code;
            $c->usd_value = $usdValue;
            $c->save();
        }
    }
}
