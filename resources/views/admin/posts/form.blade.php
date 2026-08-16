@extends('admin.layout')

@section('title', $post ? 'Edit post' : 'New post')

@section('content')
    @php
        $defaults = $post ? [
            'slug' => $post->slug,
            'title_en' => $post->title['en'] ?? '',
            'title_id' => $post->title['id'] ?? '',
            'excerpt_en' => $post->excerpt['en'] ?? '',
            'excerpt_id' => $post->excerpt['id'] ?? '',
            'content_en' => \App\Support\ContentParser::toText($post->content['en'] ?? []),
            'content_id' => \App\Support\ContentParser::toText($post->content['id'] ?? []),
            'category_id' => $post->category_id,
            'cover_image' => $post->cover_image,
            'featured' => $post->featured,
            'published' => (bool) $post->published_at,
        ] : [
            'slug' => '', 'title_en' => '', 'title_id' => '', 'excerpt_en' => '', 'excerpt_id' => '',
            'content_en' => '', 'content_id' => '', 'category_id' => '', 'cover_image' => '',
            'featured' => false, 'published' => false,
        ];
        $action = $post ? route('admin.posts.update', $post) : route('admin.posts.store');
        $method = $post ? 'PUT' : 'POST';
    @endphp

    <form method="POST" action="{{ $action }}" enctype="multipart/form-data" class="max-w-3xl space-y-8">
        @csrf
        @method($method)

        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Title (EN) <span class="text-terra">*</span></label>
                <input name="title_en" value="{{ old('title_en', $defaults['title_en']) }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                @error('title_en')<p class="mt-1 text-xs text-terra-deep">{{ $message }}</p>@enderror
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Judul (ID) <span class="text-terra">*</span></label>
                <input name="title_id" value="{{ old('title_id', $defaults['title_id']) }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                @error('title_id')<p class="mt-1 text-xs text-terra-deep">{{ $message }}</p>@enderror
            </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Slug</label>
                <input name="slug" value="{{ old('slug', $defaults['slug']) }}" placeholder="auto-generated from title" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Category</label>
                <select name="category_id" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                    <option value="">— none —</option>
                    @foreach ($categories as $category)
                        <option value="{{ $category->id }}" @selected((string) $defaults['category_id'] === (string) $category->id)>{{ $category->name['en'] }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div>
            <label class="mb-2 block text-sm font-medium text-ink">Cover image</label>
            <input type="file" name="cover_image" accept="image/*" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            <p class="mt-1 text-xs text-coffee">Current: {{ $defaults['cover_image'] ?: '—' }}</p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Excerpt (EN) <span class="text-terra">*</span></label>
                <textarea name="excerpt_en" rows="3" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('excerpt_en', $defaults['excerpt_en']) }}</textarea>
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Excerpt (ID) <span class="text-terra">*</span></label>
                <textarea name="excerpt_id" rows="3" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('excerpt_id', $defaults['excerpt_id']) }}</textarea>
            </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Content (EN) <span class="text-terra">*</span></label>
                <textarea name="content_en" rows="14" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 font-mono text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30" placeholder="Each line = paragraph. Start a line with '## ' for a heading.">{{ old('content_en', $defaults['content_en']) }}</textarea>
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Content (ID) <span class="text-terra">*</span></label>
                <textarea name="content_id" rows="14" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 font-mono text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30" placeholder="Each line = paragraph. Start a line with '## ' for a heading.">{{ old('content_id', $defaults['content_id']) }}</textarea>
            </div>
        </div>

        <div class="flex items-center gap-6">
            <label class="flex items-center gap-2 text-sm text-ink">
                <input type="checkbox" name="featured" value="1" @checked($defaults['featured']) class="size-4 accent-terra"> Featured
            </label>
            <label class="flex items-center gap-2 text-sm text-ink">
                <input type="checkbox" name="published" value="1" @checked($defaults['published']) class="size-4 accent-terra"> Published
            </label>
        </div>

        <div class="flex items-center gap-3">
            <button type="submit" class="inline-flex h-11 items-center rounded-full bg-terra px-7 text-sm font-semibold text-cream transition-colors hover:bg-terra-deep">Save post</button>
            <a href="{{ route('admin.posts.index') }}" class="text-sm text-coffee hover:text-ink">Cancel</a>
        </div>
    </form>
@endsection
