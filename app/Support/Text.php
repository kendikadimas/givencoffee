<?php

namespace App\Support;

class Text
{
    /**
     * Resolve a localized value (an array keyed by locale) to a string.
     */
    public static function l(mixed $value, ?string $locale = null): mixed
    {
        if (! is_array($value)) {
            return $value;
        }

        $locale ??= app()->getLocale();

        return $value[$locale] ?? $value['en'] ?? reset($value) ?? '';
    }
}
