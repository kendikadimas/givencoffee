<?php

namespace App\Models;

use App\Support\Text;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $guarded = [];

    protected $casts = [
        'question' => 'array',
        'answer' => 'array',
        'active' => 'boolean',
    ];

    public function localized(?string $locale = null): array
    {
        $locale ??= app()->getLocale();

        return [
            'id' => $this->id,
            'question' => Text::l($this->question, $locale),
            'answer' => Text::l($this->answer, $locale),
        ];
    }
}
