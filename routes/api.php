<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('check', 'AuthController@check');
    Route::post('extend', 'AuthController@extend');
    Route::get('me', 'AuthController@me');
});

Route::group(['prefix' => 'stash'], function ($router) {
    Route::get('types', 'StashController@types');
    Route::post('{stash}/balance', 'StashController@addBalance');
});
Route::resource('stash', 'StashController');

Route::group(['prefix' => 'balance'], function ($router) {
    Route::get('currencies', 'BalanceController@currencies');
    Route::delete('{balance}', 'BalanceController@destroy');
});
