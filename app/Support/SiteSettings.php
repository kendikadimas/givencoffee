<?php

namespace App\Support;

use App\Models\Setting;

class SiteSettings
{
    protected static ?array $data = null;

    public static function all(): array
    {
        if (self::$data === null) {
            $defaults = [
                'company_name' => 'Given Coffee',
                'email' => 'hello@givencoffeeid.com',
                'phone' => '+62 812 3456 7890',
                'whatsapp' => '+62 812 3456 7890',
                'whatsapp_url' => 'https://wa.me/6281234567890',
                'address' => 'Dolok Sanggul, Kec. Dolok sanggul, Kabupaten Humbang Hasundutan, Sumatera Utara 22457',
                'hours' => 'Mon – Fri, 08.00 – 17.00 WIB',
                'social_instagram' => 'https://instagram.com/givencoffee',
                'social_facebook' => 'https://facebook.com/givencoffee',
                'social_linkedin' => 'https://linkedin.com/company/givencoffee',
                'social_youtube' => '',
                'map_embed' => '<iframe src="https://www.google.com/maps/embed?pb=..." loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
                'ga_id' => '',
                'catalog_url' => '/catalog/given-coffee-catalog.pdf',
            ];

            self::$data = array_merge($defaults, Setting::pluck('value', 'key')->toArray());
        }

        return self::$data;
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        return self::all()[$key] ?? $default;
    }

    public static function forget(): void
    {
        self::$data = null;
    }
}
