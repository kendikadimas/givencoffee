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

    /**
     * @return BelongsTo<Category, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }

    public function getLocalizedContent(?string $locale = null): array
    {
        $locale ??= app()->getLocale();
        $raw = $this->getAttribute('content');

        if (! is_array($raw)) {
            return [];
        }

        if (isset($raw[$locale]) && is_array($raw[$locale])) {
            return $raw[$locale];
        }

        $blocks = [];
        foreach ($raw as $block) {
            if (is_array($block) && isset($block[$locale]) && is_array($block[$locale])) {
                $blocks[] = $block[$locale];
            }
        }

        return $blocks;
    }

    public function localized(?string $locale = null): array
    {
        $locale ??= app()->getLocale();

        /** @var Category|null $category */
        $category = $this->category;

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => Text::l($this->title, $locale),
            'excerpt' => Text::l($this->excerpt, $locale),
            'content' => $this->getLocalizedContent($locale),
            'cover_image' => $this->cover_image,
            'featured' => $this->featured,
            'published_at' => optional($this->published_at)->format('d M Y'),
            'category' => $category?->localized($locale),
        ];
    }
}
