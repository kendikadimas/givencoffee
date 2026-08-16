<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Faq;
use App\Models\Post;
use App\Models\Product;
use App\Models\Testimonial;
use App\Support\SiteSettings;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SiteController extends Controller
{
    public function home(): Response
    {
        $products = Product::where('active', true)->get()->map(fn ($p) => $p->localized());

        return Inertia::render('site/home', [
            'product' => $products->first(),
            'products' => $products,
            'testimonials' => Testimonial::where('active', true)
                ->orderBy('sort_order')
                ->get()
                ->map(fn (Testimonial $t) => $t->localized()),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('site/about');
    }

    public function product(): Response
    {
        $products = Product::where('active', true)->get()->map(fn ($p) => $p->localized());

        return Inertia::render('site/product', [
            'products' => $products,
        ]);
    }

    public function productShow(Request $request): Response
    {
        $product = Product::where('active', true)
            ->whereKey($request->route('product'))
            ->firstOrFail()
            ->localized();

        return Inertia::render('site/product/show', [
            'product' => $product,
            'products' => Product::where('active', true)
                ->get()
                ->map(fn ($p) => $p->localized()),
        ]);
    }

    public function process(): Response
    {
        return Inertia::render('site/process');
    }

    public function contact(): Response
    {
        return Inertia::render('site/contact', [
            'settings' => SiteSettings::all(),
            'faqs' => Faq::where('active', true)
                ->orderBy('sort_order')
                ->get()
                ->map(fn (Faq $faq) => $faq->localized()),
        ]);
    }

    public function blogIndex(Request $request): Response
    {
        $query = Post::published()->with('category')->orderByDesc('published_at');

        if ($request->has('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->string('category')));
        }

        $posts = $query->get()->map(fn (Post $post) => $post->localized());

        $categories = Category::withCount(['posts' => fn ($q) => $q->published()])
            ->get()
            ->map(fn (Category $category) => $category->localized() + ['count' => $category->posts_count]);

        return Inertia::render('site/blog/index', [
            'posts' => $posts,
            'categories' => $categories,
            'activeCategory' => $request->string('category')->toString() ?: null,
        ]);
    }

    public function blogShow(Request $request): Response
    {
        $post = Post::published()->where('slug', $request->route('post'))->firstOrFail();

        $recent = Post::published()
            ->whereKeyNot($post->id)
            ->with('category')
            ->orderByDesc('published_at')
            ->limit(3)
            ->get()
            ->map(fn (Post $p) => $p->localized());

        return Inertia::render('site/blog/show', [
            'post' => $post->localized(),
            'recent' => $recent,
        ]);
    }
}
