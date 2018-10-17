<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    public $incrementing = false;

    public $primaryKey = 'code';

    public $fillable = [
        'code',
        'usd_value',
    ];

    public const AVAILABLE = [
        'USD' => true,
        'HUF' => true,
        'EUR' => true,
        'GBP' => true,
    ];

    public function cacheExpired(): bool
    {
        return $this->updated_at->addHours(2)->isPast();
    }
}
