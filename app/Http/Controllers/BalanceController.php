<?php

namespace App\Http\Controllers;

use App\Balance;
use App\Currency;
use App\Http\Resources\StashResource;
use App\Stash;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    protected function checkPermission(Balance $balance)
    {
        if (auth()->user()->id !== $balance->stash()->first()->user_id) {
            # TODO Translate
            return response()->json(['error' => 'You can only edit your own stashes.'], 403);
        }

        return true;
    }

    public function currencies(){
        $currencies = collect(array_keys(Currency::AVAILABLE));

        return response()->json([
            'currencies' => array_keys(Currency::AVAILABLE),
        ]);
    }

    public function destroy(Balance $balance){
        $perm = $this->checkPermission($balance);
        if ($perm !== true) {
            return $perm;
        }

        $stash_id = $balance->stash_id;
        $balance->delete();

        return response()->json([
            'stash' => new StashResource(Stash::find($stash_id)->first()),
        ]);
    }
}
