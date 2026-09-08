@extends('admin.layout')

@section('title', 'FAQs')

@section('content')
    <form method="POST" action="{{ route('admin.faqs.store') }}" class="mb-10 max-w-2xl rounded-md border border-border bg-cream p-6" onsubmit="this.querySelector('button[type=submit]').disabled = true">
        @csrf
        <h2 class="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-coffee">Add FAQ</h2>
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Question (EN) <span class="text-terra">*</span></label>
                <input name="question_en" value="{{ old('question_en') }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Pertanyaan (ID) <span class="text-terra">*</span></label>
                <input name="question_id" value="{{ old('question_id') }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
            </div>
        </div>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Answer (EN) <span class="text-terra">*</span></label>
                <textarea name="answer_en" rows="4" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('answer_en') }}</textarea>
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-ink">Jawaban (ID) <span class="text-terra">*</span></label>
                <textarea name="answer_id" rows="4" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">{{ old('answer_id') }}</textarea>
            </div>
        </div>
        <label class="mt-4 flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="active" value="1" checked class="size-4 accent-terra"> Active on site
        </label>
        <button type="submit" class="mt-5 inline-flex h-10 items-center rounded-full bg-terra px-5 text-sm font-semibold text-cream transition-colors hover:bg-terra-deep">Add</button>
    </form>

    <div class="overflow-hidden rounded-md border border-border bg-cream">
        <table class="w-full text-left text-sm">
            <thead class="border-b border-border text-xs uppercase tracking-[0.14em] text-coffee">
                <tr>
                    <th class="w-24 px-5 py-3 font-semibold">Order</th>
                    <th class="px-5 py-3 font-semibold">Question (EN / ID)</th>
                    <th class="px-5 py-3 font-semibold">Active</th>
                    <th class="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-border">
                @forelse ($faqs as $faq)
                    <tr class="hover:bg-bone">
                        <td class="px-5 py-4">
                            <form method="POST" action="{{ route('admin.faqs.update', $faq) }}" class="flex items-center gap-1">
                                @csrf
                                @method('PUT')
                                <input type="hidden" name="question_en" value="{{ $faq->question['en'] }}">
                                <input type="hidden" name="question_id" value="{{ $faq->question['id'] }}">
                                <input type="hidden" name="answer_en" value="{{ $faq->answer['en'] }}">
                                <input type="hidden" name="answer_id" value="{{ $faq->answer['id'] }}">
                                <input type="hidden" name="active" value="{{ $faq->active ? 1 : 0 }}">
                                <input type="number" name="sort_order" value="{{ $faq->sort_order }}" class="w-14 rounded-md border border-input bg-bone px-2 py-1 text-sm outline-none focus:border-terra">
                                <button type="submit" class="text-xs text-terra hover:text-terra-deep font-semibold">Save</button>
                            </form>
                        </td>
                        <td class="px-5 py-4 text-coffee">
                            <p class="font-medium text-ink">{{ $faq->question['en'] }}</p>
                            <p class="text-xs text-coffee/80 mt-0.5">{{ $faq->question['id'] }}</p>
                        </td>
                        <td class="px-5 py-4">
                            <form method="POST" action="{{ route('admin.faqs.update', $faq) }}">
                                @csrf
                                @method('PUT')
                                <input type="hidden" name="question_en" value="{{ $faq->question['en'] }}">
                                <input type="hidden" name="question_id" value="{{ $faq->question['id'] }}">
                                <input type="hidden" name="answer_en" value="{{ $faq->answer['en'] }}">
                                <input type="hidden" name="answer_id" value="{{ $faq->answer['id'] }}">
                                <input type="hidden" name="sort_order" value="{{ $faq->sort_order }}">
                                <input type="hidden" name="active" value="0">
                                <label class="flex items-center gap-2 text-sm cursor-pointer">
                                    <input type="checkbox" name="active" value="1" @checked($faq->active) class="size-4 accent-terra" onchange="this.form.submit()"> Active
                                </label>
                            </form>
                        </td>
                        <td class="px-5 py-4 text-right">
                            <div class="flex items-center justify-end gap-3">
                                <details class="group relative inline-block text-left">
                                    <summary class="cursor-pointer text-sm font-semibold text-terra hover:text-terra-deep [&::-webkit-details-marker]:hidden">Edit</summary>
                                    <div class="fixed inset-0 z-40 bg-ink/20" onclick="this.parentElement.removeAttribute('open')"></div>
                                    <form method="POST" action="{{ route('admin.faqs.update', $faq) }}" class="absolute right-0 z-50 mt-2 w-96 space-y-3 rounded-md border border-border bg-cream p-5 shadow-earth-lg">
                                        @csrf
                                        @method('PUT')
                                        <p class="font-display font-bold text-ink">Edit FAQ</p>
                                        <div>
                                            <label class="mb-1 block text-xs font-semibold text-coffee">Question (EN)</label>
                                            <input name="question_en" value="{{ $faq->question['en'] }}" required class="w-full rounded-md border border-input bg-bone px-3 py-1.5 text-sm outline-none focus:border-terra">
                                        </div>
                                        <div>
                                            <label class="mb-1 block text-xs font-semibold text-coffee">Pertanyaan (ID)</label>
                                            <input name="question_id" value="{{ $faq->question['id'] }}" required class="w-full rounded-md border border-input bg-bone px-3 py-1.5 text-sm outline-none focus:border-terra">
                                        </div>
                                        <div>
                                            <label class="mb-1 block text-xs font-semibold text-coffee">Answer (EN)</label>
                                            <textarea name="answer_en" rows="3" required class="w-full rounded-md border border-input bg-bone px-3 py-1.5 text-sm outline-none focus:border-terra">{{ $faq->answer['en'] }}</textarea>
                                        </div>
                                        <div>
                                            <label class="mb-1 block text-xs font-semibold text-coffee">Jawaban (ID)</label>
                                            <textarea name="answer_id" rows="3" required class="w-full rounded-md border border-input bg-bone px-3 py-1.5 text-sm outline-none focus:border-terra">{{ $faq->answer['id'] }}</textarea>
                                        </div>
                                        <div class="flex items-center justify-between pt-2">
                                            <input type="hidden" name="sort_order" value="{{ $faq->sort_order }}">
                                            <label class="flex items-center gap-2 text-xs">
                                                <input type="checkbox" name="active" value="1" @checked($faq->active) class="size-4 accent-terra"> Active
                                            </label>
                                            <button type="submit" class="rounded-full bg-terra px-4 py-1.5 text-xs font-semibold text-cream hover:bg-terra-deep">Save changes</button>
                                        </div>
                                    </form>
                                </details>

                                <form method="POST" action="{{ route('admin.faqs.destroy', $faq) }}" onsubmit="return confirm('Hapus FAQ ini?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-sm text-coffee/60 hover:text-terra-deep">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4" class="px-5 py-10 text-center text-coffee">No FAQs yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
