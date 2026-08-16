<?php

namespace App\Models;

use App\Support\Text;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $guarded = [];

    protected $casts = [
        'name' => 'array',
        'role' => 'array',
        'quote' => 'array',
        'active' => 'boolean',
    ];

    public function localized(?string $locale = null): array
    {
        $locale ??= app()->getLocale();

        return [
            'id' => $this->id,
            'name' => Text::l($this->name, $locale),
            'role' => Text::l($this->role ?? [], $locale),
            'quote' => Text::l($this->quote, $locale),
            'image' => $this->image,
        ];
    }
}
