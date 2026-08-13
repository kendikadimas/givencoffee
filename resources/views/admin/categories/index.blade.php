@extends('admin.layout')

@section('title', 'Categories')

@section('content')
    <form method="POST" action="{{ route('admin.categories.store') }}" class="mb-10 max-w-xl rounded-md border border-border bg-cream p-6">
        @csrf
        <h2 class="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Add category</h2>
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Name (EN) <span class="text-terra">*</span></label>
                <input name="name_en" value="{{ old('name_en') }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Nama (ID) <span class="text-terra">*</span></label>
                <input name="name_id" value="{{ old('name_id') }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
        </div>
        <div class="mt-4">
            <label class="mb-2 block text-sm font-medium text-ink">Slug</label>
            <input name="slug" value="{{ old('slug') }}" placeholder="auto-generated from name" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
        </div>
        <button type="submit" class="mt-5 inline-flex h-10 items-center rounded-full bg-terra px-5 text-sm font-semibold text-cream transition-colors hover:bg-terra-deep">Add</button>
    </form>

    <div class="overflow-hidden rounded-md border border-border bg-cream">
        <table class="w-full text-left text-sm">
            <thead class="border-b border-border text-xs uppercase tracking-[0.14em] text-coffee">
                <tr>
                    <th class="px-5 py-3 font-semibold">Slug</th>
                    <th class="px-5 py-3 font-semibold">Name (EN / ID)</th>
                    <th class="hidden px-5 py-3 font-semibold md:table-cell">Posts</th>
                    <th class="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-border">
                @forelse ($categories as $category)
                    <tr class="hover:bg-bone">
                        <td class="px-5 py-4 font-medium text-ink">{{ $category->slug }}</td>
                        <td class="px-5 py-4 text-coffee">
                            <form method="POST" action="{{ route('admin.categories.update', $category) }}" class="flex flex-wrap items-center gap-2">
                                @csrf
                                @method('PUT')
                                <input name="name_en" value="{{ $category->name['en'] }}" class="w-28 rounded-md border border-input bg-bone px-2 py-1.5 text-sm outline-none focus:border-terra">
                                <input name="name_id" value="{{ $category->name['id'] }}" class="w-28 rounded-md border border-input bg-bone px-2 py-1.5 text-sm outline-none focus:border-terra">
                                <input name="slug" value="{{ $category->slug }}" class="w-28 rounded-md border border-input bg-bone px-2 py-1.5 text-sm outline-none focus:border-terra">
                                <button type="submit" class="text-sm text-terra hover:text-terra-deep">Save</button>
                            </form>
                        </td>
                        <td class="hidden px-5 py-4 text-coffee md:table-cell">{{ $category->posts_count }}</td>
                        <td class="px-5 py-4 text-right">
                            <form method="POST" action="{{ route('admin.categories.destroy', $category) }}" onsubmit="return confirm('Delete this category?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-sm text-terra-deep hover:text-destructive">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4" class="px-5 py-10 text-center text-coffee">No categories yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
