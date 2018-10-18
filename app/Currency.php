<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use ISODateSerialization;

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

    /**
     * Cached currencies expire after 2 hours
     *
     * This function checks whether the data needs updating
     *
     * @return bool
     */
    public function cacheExpired(): bool
    {
        return $this->updated_at->addHours(2)->isPast();
    }
}
