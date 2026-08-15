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
                'map_embed' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2208.045028876008!2d98.93323408021557!3d2.2779829967211405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x302e1bc403bba573%3A0xd18dc18f6f5d4da2!2sCoffee%20GIVEN!5e0!3m2!1sid!2sid!4v1786764755167!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
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
