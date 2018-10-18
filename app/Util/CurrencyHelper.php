<?php


namespace App\Util;

use App\Currency;
use OceanApplications\currencylayer;

class CurrencyHelper
{
    public static function cachedCurrency(string $id): Currency
    {
        /** @var $currency Currency */
        $currency = Currency::find($id);
        $cache_miss = empty($currency);
        if ($cache_miss || $currency->cacheExpired()) {
            $value = self::fetchValue([$id]);
            if (!$cache_miss) {
                $currency = new Currency();
            }
            $currency->code = $id;
            $currency->usd_value = $value;
            $currency->save();
        }
        return $currency;
    }

    /**
     * @param string[] $currency_codes
     * @return array
     */
    public static function fetchValue(array $currency_codes)
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
