<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stash extends Model
{
    use Uuids;

    const TYPES = [
        'cash' => true,
        'bank_account' => true,
    ];
    const LABEL_MAX_LENGTH = 64;

    public $incrementing = false;

    public $fillable = ['label'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function balances(){
        return $this->hasMany(Balance::class);
    }
}
