<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Transaction
 *
 * @property string $id
 * @property string $user_id
 * @property string $balance_id
 * @property float $amount
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Balance $balance
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Transaction whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Transaction whereBalanceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Transaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Transaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Transaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Transaction whereUserId($value)
 * @mixin \Eloquent
 */
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
