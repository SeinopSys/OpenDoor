<?php

namespace App\Http\Controllers;

use App\Currency;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function currencies(){
        return response()->json([
            'currencies' => array_keys(Currency::AVAILABLE),
        ]);
    }
}
