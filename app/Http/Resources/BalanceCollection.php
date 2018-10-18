<?php

namespace App\Http\Resources;

use Gerardojbaez\Money\Money;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BalanceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $data = parent::toArray($request);
        foreach ($data as &$value) {
            $money = new Money($value['amount'], $value['currency']);
            $value['readable'] = $money->format();
        }
        return $data;
    }
}
