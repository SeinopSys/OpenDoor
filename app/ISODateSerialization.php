<?php


namespace App;

use Carbon\Carbon;

trait ISODateSerialization
{
    protected function asDateTime($value)
    {
        return new Carbon($value);
    }

    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('c');
    }
}
