<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Stash
 *
 * @property string $id
 * @property string $user_id
 * @property string $label
 * @property string $type
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Balance[] $balances
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Stash whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Stash whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Stash whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Stash whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Stash whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Stash whereUserId($value)
 * @mixin \Eloquent
 */
class Stash extends Model
{
    use Uuids;

    const STASH_TYPES = [
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
