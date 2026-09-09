@extends('admin.layout')

@section('title', 'Settings')

@section('content')
    <form method="POST" action="{{ route('admin.settings.update') }}" enctype="multipart/form-data" class="max-w-3xl space-y-8">
        @csrf

        <div>
            <h2 class="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Company</h2>
            <div class="grid gap-4 sm:grid-cols-2">
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Company name</label>
                    <input name="company_name" value="{{ old('company_name', $settings['company_name']) }}" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                </div>
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Google Analytics ID (GA4)</label>
                    <input name="ga_id" value="{{ old('ga_id', $settings['ga_id']) }}" placeholder="G-XXXXXXXXXX" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                </div>
            </div>
        </div>

        <div>
            <h2 class="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Contact</h2>
            <div class="grid gap-4 sm:grid-cols-2">
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Email</label>
                    <input type="email" name="email" value="{{ old('email', $settings['email']) }}" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                </div>
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Phone</label>
                    <input name="phone" value="{{ old('phone', $settings['phone']) }}" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                </div>
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">WhatsApp display</label>
                    <input name="whatsapp" value="{{ old('whatsapp', $settings['whatsapp']) }}" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                </div>
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">WhatsApp URL</label>
                    <input name="whatsapp_url" value="{{ old('whatsapp_url', $settings['whatsapp_url']) }}" placeholder="https://wa.me/6281234567890" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                </div>
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Address</label>
                    <input name="address" value="{{ old('address', $settings['address']) }}" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                </div>
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Hours</label>
                    <input name="hours" value="{{ old('hours', $settings['hours']) }}" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                </div>
            </div>
        </div>

        <div>
            <h2 class="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Social media</h2>
            <div class="grid gap-4 sm:grid-cols-2">
                @foreach (['instagram', 'facebook', 'tiktok', 'youtube'] as $social)
                    <div>
                        <label class="mb-2 block text-sm font-medium text-ink capitalize">{{ $social }}</label>
                        <input name="social_{{ $social }}" value="{{ old('social_'.$social, $settings['social_'.$social]) }}" placeholder="https://..." class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                    </div>
                @endforeach
            </div>
            <div class="mt-4">
                <label class="mb-2 block text-sm font-medium text-ink">Instagram feed embed code</label>
                <textarea name="instagram_embed" rows="4" placeholder="Paste Elfsight, LightWidget, or SnapWidget embed code here. Leave empty to hide the section." class="w-full rounded-md border border-input bg-bone px-4 py-2.5 font-mono text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('instagram_embed', $settings['instagram_embed']) }}</textarea>
                <p class="mt-1 text-xs text-coffee">Paste your widget code here (supports Elfsight script + div tags, or iframe from LightWidget/SnapWidget). Leave empty to hide.</p>
            </div>
        </div>

        <div>
            <h2 class="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Other</h2>
            <div class="space-y-4">
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Google Maps embed (full iframe code)</label>
                    <textarea name="map_embed" rows="4" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 font-mono text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('map_embed', $settings['map_embed']) }}</textarea>
                    <p class="mt-1 text-xs text-coffee">Use Google Maps → Share → Embed a map, then paste the iframe code here.</p>
                </div>
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Catalog PDF</label>
                    @if(!empty($settings['catalog_url']))
                        <div class="mb-2 flex items-center gap-3 rounded-md border border-input bg-bone px-4 py-2.5 text-sm">
                            <svg class="size-4 shrink-0 text-terra" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            <a href="{{ $settings['catalog_url'] }}" target="_blank" class="truncate text-terra underline underline-offset-2 hover:text-terra-deep">{{ basename($settings['catalog_url']) }}</a>
                            <span class="ml-auto shrink-0 text-xs text-coffee">Current file</span>
                        </div>
                    @endif
                    <input type="file" name="catalog_pdf" accept=".pdf" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30 file:mr-3 file:rounded file:border-0 file:bg-terra file:px-3 file:py-1 file:text-xs file:font-semibold file:text-cream hover:file:bg-terra-deep">
                    <p class="mt-1 text-xs text-coffee">Upload a PDF (max 20 MB). Uploading a new file will replace the current one.</p>
                </div>
            </div>
        </div>

        <button type="submit" class="inline-flex h-11 items-center rounded-full bg-terra px-7 text-sm font-semibold text-cream transition-colors hover:bg-terra-deep">Save settings</button>
    </form>
@endsection
