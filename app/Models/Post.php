<?php

namespace App\Models;

use App\Support\Text;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    protected $guarded = [];

    protected $casts = [
        'title' => 'array',
        'excerpt' => 'array',
        'content' => 'array',
        'featured' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }

    public function localized(?string $locale = null): array
    {
        $locale ??= app()->getLocale();

        $content = $this->content[$locale] ?? [];

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => Text::l($this->title, $locale),
            'excerpt' => Text::l($this->excerpt, $locale),
            'content' => $content,
            'cover_image' => $this->cover_image,
            'featured' => $this->featured,
            'published_at' => optional($this->published_at)->format('d M Y'),
            'category' => $this->category?->localized($locale),
        ];
    }
}
