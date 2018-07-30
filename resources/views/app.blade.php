<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="format-detection" content="telephone=no">
	<meta name="theme-color" content="#076f00">
	<meta property="og:type" content="website">
	<meta property='og:title' content='{{ config('app.name') }}'>
    <meta property='og:description' content='@lang('global.description')'>
    <meta property='og:image' content='/img/logo.png'>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name') }}</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <noscript><div class="alert alert-danger no-js">@lang('global.js_required')</div></noscript>
    <div id="app"></div>
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
