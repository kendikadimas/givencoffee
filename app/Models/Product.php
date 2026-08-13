<?php

namespace App\Models;

use App\Support\Text;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];

    protected $casts = [
        'name' => 'array',
        'subtitle' => 'array',
        'story' => 'array',
        'specs' => 'array',
        'cupping' => 'array',
        'packaging' => 'array',
        'images' => 'array',
        'active' => 'boolean',
    ];

    public function localized(?string $locale = null): array
    {
        $locale ??= app()->getLocale();

        $specs = array_map(
            fn (array $s) => [
                'label' => Text::l($s['label'], $locale),
                'value' => Text::l($s['value'], $locale),
            ],
            $this->specs ?? [],
        );

        $packaging = array_map(
            fn (array $p) => [
                'title' => Text::l($p['title'], $locale),
                'text' => Text::l($p['text'], $locale),
                'tag' => Text::l($p['tag'], $locale),
            ],
            $this->packaging ?? [],
        );

        return [
            'id' => $this->id,
            'name' => Text::l($this->name, $locale),
            'subtitle' => Text::l($this->subtitle, $locale),
            'story' => array_map(fn ($s) => Text::l($s, $locale), $this->story ?? []),
            'specs' => $specs,
            'cupping' => [
                'notes' => Text::l($this->cupping['notes'] ?? '', $locale),
                'traits' => array_map(fn ($t) => Text::l($t, $locale), $this->cupping['traits'] ?? []),
            ],
            'packaging' => $packaging,
            'images' => $this->images ?? [],
            'spec_pdf' => $this->spec_pdf,
        ];
    }
}
