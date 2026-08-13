<?php

namespace App\Http\Middleware;

use App\Support\SiteSettings;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public const SUPPORTED = ['en', 'id'];

    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->route('locale');

        if (! in_array($locale, self::SUPPORTED, true)) {
            $locale = 'en';
        }

        App::setLocale($locale);

        Inertia::share('locale', $locale);
        Inertia::share('translations', function () use ($locale) {
            return json_decode(file_get_contents(lang_path("{$locale}.json")), true);
        });
        Inertia::share('settings', fn () => SiteSettings::all());

        return $next($request);
    }
}
