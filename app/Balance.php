<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Balance extends Model
{
    use Uuids;

    public $incrementing = false;

    public function stash(){
        return $this->belongsTo(Stash::class);
    }
}
