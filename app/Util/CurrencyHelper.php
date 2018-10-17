<?php


namespace App\Util;

use App\Currency;
Use OceanApplications\currencylayer;

class CurrencyHelper
{
    static function cachedCurrency(string $id): Currency
    {
        /** @var $currency Currency */
        $currency = Currency::find($id);
        $empty = empty($currency);
        if ($empty || $currency->cacheExpired()) {
            $value = self::fetchValue([$id]);
            if (!$empty) {
                $currency = new Currency();
            }
            $currency->code = $id;
            $currency->usd_value = $value;
            $currency->save();
        }
        return $currency;
    }

    /**
     * @param string $code
     * @param int|double $value
     */
    static function cacheCurrency(string $code, $value)
    {
        // TODO
    }

    /**
     * @param string[] $currency_codes
     * @return array
     */
    static function fetchValue(array $currency_codes)
    {
        $currencylayer = new currencylayer\client(env('CURRENCY_LAYER_API_KEY'));
        $results = $currencylayer->source('USD')->currencies(implode(',', $currency_codes))->live();
        if (empty($results) || $results['success'] !== true) {
            throw new \RuntimeException("Could not fetch currencies. Response:\n" . var_export($results, true));
        }

        $values = [];
        foreach ($results['quotes'] as $k => $value) {
            $code = preg_replace("~^{$results['source']}~", '', $k);

            $values[$code] = $value;
        }

        return $values;
    }
}
