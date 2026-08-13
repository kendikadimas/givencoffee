<?php

namespace App\Models;

use App\Support\Text;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $guarded = [];

    protected $casts = [
        'name' => 'array',
    ];

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function localized(?string $locale = null): array
    {
        $locale ??= app()->getLocale();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => Text::l($this->name, $locale),
        ];
    }
}
