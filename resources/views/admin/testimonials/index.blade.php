@extends('admin.layout')

@section('title', 'Testimonials')

@section('content')
    <form method="POST" action="{{ route('admin.testimonials.store') }}" class="mb-10 max-w-2xl rounded-md border border-border bg-cream p-6">
        @csrf
        <h2 class="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Add testimonial</h2>
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Name (EN) <span class="text-terra">*</span></label>
                <input name="name_en" value="{{ old('name_en') }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Nama (ID) <span class="text-terra">*</span></label>
                <input name="name_id" value="{{ old('name_id') }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Role (EN)</label>
                <input name="role_en" value="{{ old('role_en') }}" placeholder="e.g. Head Roaster, Berlin" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Jabatan (ID)</label>
                <input name="role_id" value="{{ old('role_id') }}" placeholder="cth. Kepala Roaster, Berlin" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
        </div>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Quote (EN) <span class="text-terra">*</span></label>
                <textarea name="quote_en" rows="4" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('quote_en') }}</textarea>
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Kutipan (ID) <span class="text-terra">*</span></label>
                <textarea name="quote_id" rows="4" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('quote_id') }}</textarea>
            </div>
        </div>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Photo path (optional)</label>
                <input name="image" value="{{ old('image') }}" placeholder="/images/testimonial-1.jpg" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
            <div class="flex items-end pb-1">
                <label class="flex items-center gap-2 text-sm text-ink">
                    <input type="checkbox" name="active" value="1" checked class="size-4 accent-terra"> Active on site
                </label>
            </div>
        </div>
        <button type="submit" class="mt-5 inline-flex h-10 items-center rounded-full bg-terra px-5 text-sm font-semibold text-cream transition-colors hover:bg-terra-deep">Add</button>
    </form>

    <div class="overflow-hidden rounded-md border border-border bg-cream">
        <table class="w-full text-left text-sm">
            <thead class="border-b border-border text-xs uppercase tracking-[0.14em] text-coffee">
                <tr>
                    <th class="w-16 px-5 py-3 font-semibold">Order</th>
                    <th class="px-5 py-3 font-semibold">Name</th>
                    <th class="px-5 py-3 font-semibold">Active</th>
                    <th class="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-border">
                @forelse ($testimonials as $testimonial)
                    @php
                        $nameEn = is_array($testimonial->name) ? ($testimonial->name['en'] ?? '') : $testimonial->name;
                        $nameId = is_array($testimonial->name) ? ($testimonial->name['id'] ?? '') : $testimonial->name;
                        $roleEn = is_array($testimonial->role) ? ($testimonial->role['en'] ?? '') : ($testimonial->role ?? '');
                        $roleId = is_array($testimonial->role) ? ($testimonial->role['id'] ?? '') : ($testimonial->role ?? '');
                        $quoteEn = is_array($testimonial->quote) ? ($testimonial->quote['en'] ?? '') : $testimonial->quote;
                        $quoteId = is_array($testimonial->quote) ? ($testimonial->quote['id'] ?? '') : $testimonial->quote;
                    @endphp
                    <tr class="hover:bg-bone">
                        <td class="px-5 py-4 text-coffee">{{ $testimonial->sort_order }}</td>
                        <td class="px-5 py-4">
                            <p class="font-medium text-ink">{{ $nameEn }}</p>
                            <p class="line-clamp-2 max-w-xl text-xs text-coffee">{{ $quoteEn }}</p>
                        </td>
                        <td class="px-5 py-4">
                            <span class="rounded-full px-2.5 py-1 text-xs font-medium {{ $testimonial->active ? 'bg-olive text-forest-deep' : 'bg-border text-coffee' }}">
                                {{ $testimonial->active ? 'Active' : 'Hidden' }}
                            </span>
                        </td>
                        <td class="px-5 py-4 text-right">
                            <div class="flex items-center justify-end gap-3">
                                <details class="group relative inline-block text-left">
                                    <summary class="cursor-pointer text-sm font-semibold text-terra hover:text-terra-deep [&::-webkit-details-marker]:hidden">Edit</summary>
                                    <div class="fixed inset-0 z-40 bg-ink/20" onclick="this.parentElement.removeAttribute('open')"></div>
                                    <form method="POST" action="{{ route('admin.testimonials.update', $testimonial) }}" class="absolute right-0 z-50 mt-2 w-96 space-y-3 rounded-md border border-border bg-cream p-5 shadow-earth-lg">
                                        @csrf
                                        @method('PUT')
                                        <p class="font-display font-bold text-ink">Edit Testimonial</p>
                                        <div class="grid gap-3 sm:grid-cols-2">
                                            <div>
                                                <label class="mb-1 block text-xs font-semibold text-coffee">Name (EN)</label>
                                                <input name="name_en" value="{{ $nameEn }}" required class="w-full rounded-md border border-input bg-bone px-3 py-1.5 text-sm outline-none focus:border-terra">
                                            </div>
                                            <div>
                                                <label class="mb-1 block text-xs font-semibold text-coffee">Nama (ID)</label>
                                                <input name="name_id" value="{{ $nameId }}" required class="w-full rounded-md border border-input bg-bone px-3 py-1.5 text-sm outline-none focus:border-terra">
                                            </div>
                                        </div>
                                        <div class="grid gap-3 sm:grid-cols-2">
                                            <div>
                                                <label class="mb-1 block text-xs font-semibold text-coffee">Role (EN)</label>
                                                <input name="role_en" value="{{ $roleEn }}" class="w-full rounded-md border border-input bg-bone px-3 py-1.5 text-sm outline-none focus:border-terra">
                                            </div>
                                            <div>
                                                <label class="mb-1 block text-xs font-semibold text-coffee">Jabatan (ID)</label>
                                                <input name="role_id" value="{{ $roleId }}" class="w-full rounded-md border border-input bg-bone px-3 py-1.5 text-sm outline-none focus:border-terra">
                                            </div>
                                        </div>
                                        <div>
                                            <label class="mb-1 block text-xs font-semibold text-coffee">Quote (EN)</label>
                                            <textarea name="quote_en" rows="3" required class="w-full rounded-md border border-input bg-bone px-3 py-1.5 text-sm outline-none focus:border-terra">{{ $quoteEn }}</textarea>
                                        </div>
                                        <div>
                                            <label class="mb-1 block text-xs font-semibold text-coffee">Kutipan (ID)</label>
                                            <textarea name="quote_id" rows="3" required class="w-full rounded-md border border-input bg-bone px-3 py-1.5 text-sm outline-none focus:border-terra">{{ $quoteId }}</textarea>
                                        </div>
                                        <div>
                                            <label class="mb-1 block text-xs font-semibold text-coffee">Photo path (optional)</label>
                                            <input name="image" value="{{ $testimonial->image ?? '' }}" class="w-full rounded-md border border-input bg-bone px-3 py-1.5 text-sm outline-none focus:border-terra">
                                        </div>
                                        <div class="flex items-center justify-between pt-2">
                                            <div class="flex items-center gap-4">
                                                <input type="number" name="sort_order" value="{{ $testimonial->sort_order }}" class="w-16 rounded-md border border-input bg-bone px-2 py-1 text-sm outline-none focus:border-terra">
                                                <label class="flex items-center gap-2 text-xs cursor-pointer">
                                                    <input type="hidden" name="active" value="0">
                                                    <input type="checkbox" name="active" value="1" @checked($testimonial->active) class="size-4 accent-terra"> Active
                                                </label>
                                            </div>
                                            <button type="submit" class="rounded-full bg-terra px-4 py-1.5 text-xs font-semibold text-cream hover:bg-terra-deep">Save</button>
                                        </div>
                                    </form>
                                </details>

                                <form method="POST" action="{{ route('admin.testimonials.destroy', $testimonial) }}" onsubmit="return confirm('Hapus testimoni ini?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-sm text-coffee/60 hover:text-terra-deep">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4" class="px-5 py-10 text-center text-coffee">No testimonials yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
