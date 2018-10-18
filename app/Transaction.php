<?php

namespace App;

class Transaction extends BaseModel
{
    use Uuids, ISODateSerialization;

    public $incrementing = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function balance()
    {
        return $this->belongsTo(Balance::class);
    }
}
