<?php


namespace App\Util;


use App\Currency;

class CurrencyHelper
{
    static function cachedCurrency(string $id):Currency {
        $currency = Currency::find($id);
    }
}
