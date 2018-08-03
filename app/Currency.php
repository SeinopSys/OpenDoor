<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Currency
 *
 * @property string $id
 * @property float $usd_value
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Currency whereUsdValue($value)
 * @mixin \Eloquent
 */
class Currency extends Model
{
    public $incrementing = false;

    public $fillable = [
        'id', 'usd_value',
    ];

    public const AVAILABLE = [
        'USD' => true,
        'HUF' => true,
        'EUR' => true,
        'GBP' => true,
    ];
}
