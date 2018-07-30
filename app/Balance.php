<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Balance
 *
 * @property string $id
 * @property string $stash_id
 * @property float $value
 * @property string $currency
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Stash $stash
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Balance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Balance whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Balance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Balance whereStashId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Balance whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Balance whereValue($value)
 * @mixin \Eloquent
 */
class Balance extends Model
{
    use Uuids;

    public $incrementing = false;

    public function stash(){
        return $this->belongsTo(Stash::class);
    }
}
