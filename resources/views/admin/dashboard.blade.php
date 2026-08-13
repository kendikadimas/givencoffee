@extends('admin.layout')

@section('title', 'Dashboard')

@section('content')
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        @php
            $cards = [
                ['label' => 'Inquiries', 'value' => $inquiryCount, 'extra' => "$newInquiryCount new", 'route' => 'admin.inquiries.index'],
                ['label' => 'Posts', 'value' => $postCount, 'extra' => '', 'route' => 'admin.posts.index'],
                ['label' => 'Categories', 'value' => $categoryCount, 'extra' => '', 'route' => 'admin.categories.index'],
                ['label' => 'Products', 'value' => $productCount, 'extra' => '', 'route' => 'admin.product.edit'],
            ];
        @endphp
        @foreach ($cards as $card)
            <a href="{{ route($card['route']) }}" class="rounded-md border border-border bg-cream p-6 transition-shadow hover:shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-coffee">{{ $card['label'] }}</p>
                <p class="mt-2 font-display text-4xl text-ink">{{ $card['value'] }}</p>
                @if ($card['extra'])
                    <p class="mt-1 text-sm text-terra">{{ $card['extra'] }}</p>
                @endif
            </a>
        @endforeach
    </div>

    <div class="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
            <h2 class="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Recent inquiries</h2>
            <div class="overflow-hidden rounded-md border border-border bg-cream">
                @forelse ($recentInquiries as $inquiry)
                    <a href="{{ route('admin.inquiries.show', $inquiry) }}" class="flex items-center justify-between gap-4 border-b border-border px-5 py-4 transition-colors last:border-0 hover:bg-bone">
                        <div class="min-w-0">
                            <p class="truncate text-sm font-semibold text-ink">{{ $inquiry->name }} <span class="font-normal text-coffee">— {{ $inquiry->company }}</span></p>
                            <p class="truncate text-xs text-coffee">{{ $inquiry->email }} · {{ $inquiry->country ?? '—' }}</p>
                        </div>
                        <span class="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium {{ $inquiry->status === 'new' ? 'bg-terra/15 text-terra-deep' : ($inquiry->status === 'read' ? 'bg-olive text-forest-deep' : 'bg-border text-coffee') }}">
                            {{ ucfirst($inquiry->status) }}
                        </span>
                    </a>
                @empty
                    <p class="px-5 py-8 text-sm text-coffee">No inquiries yet.</p>
                @endforelse
            </div>
        </div>

        <div>
            <h2 class="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Recent posts</h2>
            <div class="overflow-hidden rounded-md border border-border bg-cream">
                @forelse ($recentPosts as $post)
                    <a href="{{ route('admin.posts.edit', $post) }}" class="flex items-center justify-between gap-4 border-b border-border px-5 py-4 transition-colors last:border-0 hover:bg-bone">
                        <div class="min-w-0">
                            <p class="truncate text-sm font-semibold text-ink">{{ $post->title['en'] }}</p>
                            <p class="truncate text-xs text-coffee">{{ $post->category?->name['en'] ?? 'No category' }} · {{ $post->published_at?->diffForHumans() ?? 'Draft' }}</p>
                        </div>
                        <span class="shrink-0 text-xs {{ $post->published_at ? 'text-forest' : 'text-coffee' }}">{{ $post->published_at ? 'Published' : 'Draft' }}</span>
                    </a>
                @empty
                    <p class="px-5 py-8 text-sm text-coffee">No posts yet.</p>
                @endforelse
            </div>
        </div>
    </div>
@endsection
