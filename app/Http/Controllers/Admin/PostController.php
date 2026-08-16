<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Support\ContentParser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class PostController extends Controller
{
    public function index(): View
    {
        return view('admin.posts.index', [
            'posts' => Post::with('category')->latest()->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.posts.form', [
            'post' => null,
            'categories' => Category::orderBy('slug')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validatePost($request);
        $data['slug'] = $this->uniqueSlug($request->input('slug'), $request->input('title_en'));

        Post::create($data);

        return redirect()->route('admin.posts.index')->with('success', 'Post created.');
    }

    public function edit(Post $post): View
    {
        return view('admin.posts.form', [
            'post' => $post,
            'categories' => Category::orderBy('slug')->get(),
        ]);
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $data = $this->validatePost($request);

        if (! $request->hasFile('cover_image')) {
            $data['cover_image'] = $post->cover_image;
        }

        if ($request->filled('slug') && $request->input('slug') !== $post->slug) {
            $data['slug'] = $this->uniqueSlug($request->input('slug'));
        }

        $post->update($data);

        return redirect()->route('admin.posts.index')->with('success', 'Post updated.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Post deleted.');
    }

    private function validatePost(Request $request): array
    {
        $data = $request->validate([
            'title_en' => ['required', 'string', 'max:255'],
            'title_id' => ['required', 'string', 'max:255'],
            'excerpt_en' => ['required', 'string'],
            'excerpt_id' => ['required', 'string'],
            'content_en' => ['required', 'string'],
            'content_id' => ['required', 'string'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'cover_image' => ['nullable', 'file', 'image', 'max:5120'],
            'featured' => ['sometimes', 'boolean'],
            'published' => ['sometimes', 'boolean'],
        ]);

        $cover = $request->hasFile('cover_image')
            ? '/uploads/'.$request->file('cover_image')->store('posts', 'uploads')
            : ($data['cover_image'] ?? null);

        return [
            'title' => ['en' => $data['title_en'], 'id' => $data['title_id']],
            'excerpt' => ['en' => $data['excerpt_en'], 'id' => $data['excerpt_id']],
            'content' => [
                'en' => ContentParser::blocks($data['content_en']),
                'id' => ContentParser::blocks($data['content_id']),
            ],
            'category_id' => $data['category_id'] ?? null,
            'cover_image' => $cover,
            'featured' => $request->boolean('featured'),
            'published_at' => $request->boolean('published') ? now() : null,
        ];
    }

    private function uniqueSlug(?string $slug, ?string $titleEn = null): string
    {
        $base = $slug ?: Str::slug($titleEn ?? 'untitled');

        if ($base === '') {
            $base = 'untitled';
        }

        $candidate = $base;
        $i = 2;

        while (Post::where('slug', $candidate)->exists()) {
            $candidate = $base.'-'.$i++;
        }

        return $candidate;
    }
}
