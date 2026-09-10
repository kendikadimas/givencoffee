@extends('admin.layout')

@section('title', 'Dashboard')

@section('content')
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        @php
            $gaId = \App\Support\SiteSettings::all()['ga_id'] ?? 'G-HG7PSJTN85';
            // Extract numeric property ID from measurement ID (G-XXXXXXX) for deep link
            $gaUrl = 'https://analytics.google.com/analytics/web/';
            $cards = [
                ['label' => 'Inquiries', 'value' => $inquiryCount, 'extra' => "$newInquiryCount new", 'route' => 'admin.inquiries.index', 'external' => null],
                ['label' => 'Posts', 'value' => $postCount, 'extra' => '', 'route' => 'admin.posts.index', 'external' => null],
                ['label' => 'Categories', 'value' => $categoryCount, 'extra' => '', 'route' => 'admin.categories.index', 'external' => null],
                ['label' => 'Products', 'value' => $productCount, 'extra' => '', 'route' => 'admin.product.edit', 'external' => null],
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

        {{-- Google Analytics shortcut --}}
        <a href="{{ $gaUrl }}" target="_blank" rel="noreferrer" class="group rounded-md border border-border bg-cream p-6 transition-shadow hover:shadow-sm">
            <div class="flex items-center justify-between">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-coffee">Analytics</p>
                <svg class="size-4 text-coffee transition-colors group-hover:text-terra" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </div>
            {{-- Mini bar chart icon --}}
            <div class="mt-3 flex items-end gap-1" aria-hidden="true">
                <div class="w-2 rounded-sm bg-terra/30" style="height:12px"></div>
                <div class="w-2 rounded-sm bg-terra/50" style="height:20px"></div>
                <div class="w-2 rounded-sm bg-terra/70" style="height:16px"></div>
                <div class="w-2 rounded-sm bg-terra" style="height:28px"></div>
                <div class="w-2 rounded-sm bg-terra/60" style="height:22px"></div>
                <div class="w-2 rounded-sm bg-terra/40" style="height:14px"></div>
            </div>
            <p class="mt-3 text-xs text-coffee group-hover:text-terra">Open Google Analytics →</p>
        </a>
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
