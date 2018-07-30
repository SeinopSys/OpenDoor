<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;
use Teto\HTTP\AcceptLanguage;

class Language {
	public function handle($request, Closure $next){
		if (Auth::check()){
			/** @var User $user */
			$user = Auth::user();
			/** @noinspection NullPointerExceptionInspection */
			App::setLocale($user->lang);
		}
		else {
			$languages = Config::get('languages');
			if (Session::has('lang') && array_key_exists(Session::get('lang'), $languages)){
				App::setLocale(Session::get('lang'));
			}
			else {
				$lang = 'en';
				foreach (AcceptLanguage::get() as $accepts){
					if (!isset($languages[$accepts['language']]))
						continue;

					$lang = $accepts['language'];
					break;
				}
				Session::put('lang', $lang, 1576800);
				App::setLocale($lang);
			}
		}

		return $next($request);
	}
}
