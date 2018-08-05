<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
	use Uuids;

    public $incrementing = false;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function balance(){
        return $this->belongsTo(Balance::class);
    }
}
