<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Support\SiteSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SettingController extends Controller
{
    public function index(): View
    {
        return view('admin.settings.index', [
            'settings' => SiteSettings::all(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $fields = [
            'company_name', 'email', 'phone', 'whatsapp', 'whatsapp_url',
            'address', 'hours',
            'social_instagram', 'social_facebook', 'social_linkedin', 'social_youtube',
            'map_embed', 'ga_id', 'catalog_url',
        ];

        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'whatsapp' => ['nullable', 'string', 'max:255'],
            'whatsapp_url' => ['nullable', 'url', 'max:255'],
            'address' => ['nullable', 'string'],
            'hours' => ['nullable', 'string', 'max:255'],
            'social_instagram' => ['nullable', 'url', 'max:255'],
            'social_facebook' => ['nullable', 'url', 'max:255'],
            'social_linkedin' => ['nullable', 'url', 'max:255'],
            'social_youtube' => ['nullable', 'url', 'max:255'],
            'map_embed' => ['nullable', 'string'],
            'ga_id' => ['nullable', 'string', 'max:255'],
            'catalog_url' => ['nullable', 'string', 'max:255'],
        ]);

        foreach ($fields as $field) {
            Setting::updateOrCreate(['key' => $field], ['value' => $validated[$field] ?? '']);
        }

        SiteSettings::forget();

        return redirect()->route('admin.settings.index')->with('success', 'Settings saved.');
    }
}
