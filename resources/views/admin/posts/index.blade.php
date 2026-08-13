@extends('admin.layout')

@section('title', 'Posts')

@section('content')
    <div class="mb-6 flex items-center justify-between">
        <p class="text-sm text-coffee">{{ $posts->count() }} posts</p>
        <a href="{{ route('admin.posts.create') }}" class="inline-flex h-10 items-center rounded-full bg-terra px-5 text-sm font-semibold text-cream transition-colors hover:bg-terra-deep">New post</a>
    </div>

    <div class="overflow-hidden rounded-md border border-border bg-cream">
        <table class="w-full text-left text-sm">
            <thead class="border-b border-border text-xs uppercase tracking-[0.14em] text-coffee">
                <tr>
                    <th class="px-5 py-3 font-semibold">Title (EN)</th>
                    <th class="hidden px-5 py-3 font-semibold md:table-cell">Category</th>
                    <th class="hidden px-5 py-3 font-semibold md:table-cell">Status</th>
                    <th class="hidden px-5 py-3 font-semibold lg:table-cell">Published</th>
                    <th class="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-border">
                @forelse ($posts as $post)
                    <tr class="hover:bg-bone">
                        <td class="px-5 py-4 font-medium text-ink">{{ $post->title['en'] }}</td>
                        <td class="hidden px-5 py-4 text-coffee md:table-cell">{{ $post->category?->name['en'] ?? '—' }}</td>
                        <td class="hidden px-5 py-4 md:table-cell">
                            <span class="rounded-full px-2.5 py-1 text-xs font-medium {{ $post->published_at ? 'bg-olive text-forest-deep' : 'bg-border text-coffee' }}">
                                {{ $post->published_at ? 'Published' : 'Draft' }}
                            </span>
                        </td>
                        <td class="hidden px-5 py-4 text-coffee lg:table-cell">{{ $post->published_at?->format('d M Y') ?? '—' }}</td>
                        <td class="px-5 py-4">
                            <div class="flex justify-end gap-3">
                                <a href="{{ route('admin.posts.edit', $post) }}" class="text-terra hover:text-terra-deep">Edit</a>
                                @if ($post->published_at)
                                    <a href="{{ url('/en/blog/'.$post->slug) }}" target="_blank" class="text-coffee hover:text-ink">View</a>
                                @endif
                                <form method="POST" action="{{ route('admin.posts.destroy', $post) }}" onsubmit="return confirm('Delete this post?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-terra-deep hover:text-destructive">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-5 py-10 text-center text-coffee">No posts yet. Create your first article.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
