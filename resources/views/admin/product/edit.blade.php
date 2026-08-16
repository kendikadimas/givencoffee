@extends('admin.layout')

@section('title', 'Product')

@section('content')
    @php
        $p = $product;
        $cupping = $p->cupping ?? ['notes' => ['en' => '', 'id' => ''], 'traits' => [['en' => '', 'id' => '']]];
        $traitsEn = collect($cupping['traits'] ?? [])->pluck('en')->implode(', ');
        $traitsId = collect($cupping['traits'] ?? [])->pluck('id')->implode(', ');
        $story = $p->story ?? [['en' => '', 'id' => '']];
    @endphp

    <form method="POST" action="{{ route('admin.product.update', $p) }}" enctype="multipart/form-data" class="max-w-3xl space-y-8">
        @csrf
        @method('PUT')

        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Name (EN) <span class="text-terra">*</span></label>
                <input name="name_en" value="{{ old('name_en', $p->name['en'] ?? '') }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Nama (ID) <span class="text-terra">*</span></label>
                <input name="name_id" value="{{ old('name_id', $p->name['id'] ?? '') }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Subtitle (EN) <span class="text-terra">*</span></label>
                <input name="subtitle_en" value="{{ old('subtitle_en', $p->subtitle['en'] ?? '') }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Subtitle (ID) <span class="text-terra">*</span></label>
                <input name="subtitle_id" value="{{ old('subtitle_id', $p->subtitle['id'] ?? '') }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Story (EN) <span class="text-terra">*</span></label>
                <textarea name="story_en" rows="6" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('story_en', $story[0]['en'] ?? '') }}</textarea>
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Story (ID) <span class="text-terra">*</span></label>
                <textarea name="story_id" rows="6" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('story_id', $story[0]['id'] ?? '') }}</textarea>
            </div>
        </div>

        <div>
            <h2 class="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Specifications</h2>
            <p class="mb-2 text-xs text-coffee">One spec per line, format <code>Label: Value</code>. Keep the same number of lines and order in both languages.</p>
            <div class="grid gap-5 sm:grid-cols-2">
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Specs (EN) <span class="text-terra">*</span></label>
                    <textarea name="specs_en" rows="12" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 font-mono text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30" placeholder="Origin: West Java, Indonesia">{{ old('specs_en', \App\Support\ContentParser::labelValueToText($p->specs ?? [])) }}</textarea>
                </div>
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Specs (ID) <span class="text-terra">*</span></label>
                    <textarea name="specs_id" rows="12" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 font-mono text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30" placeholder="Asal: Jawa Barat, Indonesia">{{ old('specs_id', \App\Support\ContentParser::labelValueToText(array_map(fn ($s) => ['label' => $s['label']['id'] ?? '', 'value' => $s['value']['id'] ?? ''], $p->specs ?? []))) }}</textarea>
                </div>
            </div>
        </div>

        <div>
            <h2 class="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Cupping notes</h2>
            <div class="grid gap-5 sm:grid-cols-2">
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Notes (EN) <span class="text-terra">*</span></label>
                    <textarea name="notes_en" rows="4" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('notes_en', $cupping['notes']['en'] ?? '') }}</textarea>
                </div>
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Notes (ID) <span class="text-terra">*</span></label>
                    <textarea name="notes_id" rows="4" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('notes_id', $cupping['notes']['id'] ?? '') }}</textarea>
                </div>
            </div>
            <div class="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Flavor traits (EN)</label>
                    <input name="traits_en" value="{{ old('traits_en', $traitsEn) }}" placeholder="Chocolate, Nuts, Citrus" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                </div>
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Flavor traits (ID)</label>
                    <input name="traits_id" value="{{ old('traits_id', $traitsId) }}" placeholder="Cokelat, Kacang, Citrus" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                </div>
            </div>
        </div>

        <div>
            <h2 class="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Packaging options</h2>
            @for ($i = 0; $i < 3; $i++)
                <div class="mb-5 rounded-md border border-border bg-bone p-4">
                    <div class="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label class="mb-1 block text-sm font-medium text-ink">Title (EN)</label>
                            <input name="packaging_title_en[{{ $i }}]" value="{{ old('packaging_title_en.'.$i, $p->packaging[$i]['title']['en'] ?? '') }}" class="w-full rounded-md border border-input bg-cream px-3 py-2 text-sm outline-none focus:border-terra">
                        </div>
                        <div>
                            <label class="mb-1 block text-sm font-medium text-ink">Title (ID)</label>
                            <input name="packaging_title_id[{{ $i }}]" value="{{ old('packaging_title_id.'.$i, $p->packaging[$i]['title']['id'] ?? '') }}" class="w-full rounded-md border border-input bg-cream px-3 py-2 text-sm outline-none focus:border-terra">
                        </div>
                        <div>
                            <label class="mb-1 block text-sm font-medium text-ink">Text (EN)</label>
                            <textarea name="packaging_text_en[{{ $i }}]" rows="3" class="w-full rounded-md border border-input bg-cream px-3 py-2 text-sm outline-none focus:border-terra">{{ old('packaging_text_en.'.$i, $p->packaging[$i]['text']['en'] ?? '') }}</textarea>
                        </div>
                        <div>
                            <label class="mb-1 block text-sm font-medium text-ink">Text (ID)</label>
                            <textarea name="packaging_text_id[{{ $i }}]" rows="3" class="w-full rounded-md border border-input bg-cream px-3 py-2 text-sm outline-none focus:border-terra">{{ old('packaging_text_id.'.$i, $p->packaging[$i]['text']['id'] ?? '') }}</textarea>
                        </div>
                        <div>
                            <label class="mb-1 block text-sm font-medium text-ink">Tag (EN)</label>
                            <input name="packaging_tag_en[{{ $i }}]" value="{{ old('packaging_tag_en.'.$i, $p->packaging[$i]['tag']['en'] ?? '') }}" class="w-full rounded-md border border-input bg-cream px-3 py-2 text-sm outline-none focus:border-terra">
                        </div>
                        <div>
                            <label class="mb-1 block text-sm font-medium text-ink">Tag (ID)</label>
                            <input name="packaging_tag_id[{{ $i }}]" value="{{ old('packaging_tag_id.'.$i, $p->packaging[$i]['tag']['id'] ?? '') }}" class="w-full rounded-md border border-input bg-cream px-3 py-2 text-sm outline-none focus:border-terra">
                        </div>
                    </div>
                </div>
            @endfor
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Hero image</label>
                <input type="file" name="image_hero" accept="image/*" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                <p class="mt-1 text-xs text-coffee">Current: {{ $p->images['hero'] ?? '—' }}</p>
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Packaging image</label>
                <input type="file" name="image_packaging" accept="image/*" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                <p class="mt-1 text-xs text-coffee">Current: {{ $p->images['packaging'] ?? '—' }}</p>
            </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Spec sheet PDF</label>
                <input type="file" name="spec_pdf" accept="application/pdf" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                <p class="mt-1 text-xs text-coffee">Current: {{ $p->spec_pdf ?? 'none' }}</p>
            </div>
            <div class="flex items-end pb-1">
                <label class="flex items-center gap-2 text-sm text-ink">
                    <input type="checkbox" name="active" value="1" @checked($p->active) class="size-4 accent-terra"> Active on site
                </label>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <button type="submit" class="inline-flex h-11 items-center rounded-full bg-terra px-7 text-sm font-semibold text-cream transition-colors hover:bg-terra-deep">Save product</button>
            <a href="{{ url('/en/product') }}" target="_blank" class="text-sm text-coffee hover:text-ink">View on site</a>
        </div>
    </form>
@endsection
