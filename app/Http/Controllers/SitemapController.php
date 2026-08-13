<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Product;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $urls = [];

        foreach (['en', 'id'] as $locale) {
            foreach (['', 'about', 'product', 'process', 'contact', 'blog'] as $path) {
                $urls[] = ['loc' => url("/{$locale}/{$path}"), 'lastmod' => now()->toDateString()];
            }

            foreach (Post::published()->get() as $post) {
                $urls[] = ['loc' => url("/{$locale}/blog/{$post->slug}"), 'lastmod' => $post->updated_at?->toDateString() ?: now()->toDateString()];
            }

            foreach (Product::where('active', true)->get() as $product) {
                $urls[] = ['loc' => url("/{$locale}/product/{$product->id}"), 'lastmod' => $product->updated_at?->toDateString() ?: now()->toDateString()];
            }
        }

        return response()
            ->view('sitemap', ['urls' => $urls])
            ->header('Content-Type', 'application/xml');
    }
}
