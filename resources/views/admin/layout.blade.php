<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>@yield('title', 'Admin') — Given Coffee</title>
        @vite(['resources/css/app.css'])
    </head>
    <body class="bg-bone text-ink antialiased">
        <div class="flex min-h-[100dvh]">
            <aside class="hidden w-60 shrink-0 flex-col border-r border-border bg-ink text-cream md:flex">
                <div class="px-6 py-6">
                    <p class="font-display text-lg font-semibold">Given <span class="italic">Coffee</span></p>
                    <p class="mt-0.5 text-xs uppercase tracking-[0.2em] text-cream/40">Admin</p>
                </div>
                <nav class="flex-1 space-y-1 px-3">
                    @php
                        $newInquiries = \App\Models\Inquiry::where('status', 'new')->count();
                        $nav = [
                            ['route' => 'admin.dashboard', 'label' => 'Dashboard'],
                            ['route' => 'admin.posts.index', 'label' => 'Posts'],
                            ['route' => 'admin.categories.index', 'label' => 'Categories'],
                            ['route' => 'admin.product.edit', 'label' => 'Product'],
                            ['route' => 'admin.settings.index', 'label' => 'Settings'],
                            ['route' => 'admin.inquiries.index', 'label' => 'Inquiries'],
                        ];
                    @endphp
                    @foreach ($nav as $item)
                        <a href="{{ route($item['route']) }}"
                           class="flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors {{ request()->routeIs($item['route']) || request()->routeIs($item['route'].'.*') ? 'bg-cream/10 text-cream' : 'text-cream/60 hover:bg-cream/5 hover:text-cream' }}">
                            {{ $item['label'] }}
                            @if ($item['route'] === 'admin.inquiries.index' && $newInquiries > 0)
                                <span class="rounded-full bg-terra px-2 py-0.5 text-xs font-semibold">{{ $newInquiries }}</span>
                            @endif
                        </a>
                    @endforeach
                </nav>
                <div class="space-y-2 border-t border-cream/10 p-4">
                    <a href="{{ url('/en') }}" target="_blank" class="block rounded-md px-3 py-2 text-sm text-cream/60 transition-colors hover:bg-cream/5 hover:text-cream">View site →</a>
                    <form method="POST" action="{{ url('/logout') }}">
                        @csrf
                        <button type="submit" class="w-full rounded-md px-3 py-2 text-left text-sm text-cream/60 transition-colors hover:bg-cream/5 hover:text-cream">Logout</button>
                    </form>
                </div>
            </aside>

            <div class="flex min-w-0 flex-1 flex-col">
                <header class="flex items-center justify-between border-b border-border bg-cream px-6 py-4">
                    <div>
                        <p class="text-sm font-semibold">@yield('title', 'Admin')</p>
                    </div>
                    <a href="{{ route('admin.dashboard') }}" class="text-xs text-coffee hover:text-terra">Given Coffee Admin</a>
                </header>

                <main class="flex-1 p-6 md:p-10">
                    @if (session('success'))
                        <div class="mb-6 rounded-md border border-forest/20 bg-olive px-4 py-3 text-sm text-forest-deep">{{ session('success') }}</div>
                    @endif
                    @if (session('error'))
                        <div class="mb-6 rounded-md border border-terra/30 bg-terra/10 px-4 py-3 text-sm text-terra-deep">{{ session('error') }}</div>
                    @endif

                    @yield('content')
                </main>
            </div>
        </div>
    </body>
</html>
