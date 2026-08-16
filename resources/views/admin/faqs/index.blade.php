@extends('admin.layout')

@section('title', 'FAQs')

@section('content')
    <form method="POST" action="{{ route('admin.faqs.store') }}" class="mb-10 max-w-2xl rounded-md border border-border bg-cream p-6">
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
                    <th class="w-16 px-5 py-3 font-semibold">Order</th>
                    <th class="px-5 py-3 font-semibold">Question (EN / ID)</th>
                    <th class="px-5 py-3 font-semibold">Active</th>
                    <th class="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-border">
                @forelse ($faqs as $faq)
                    <tr class="hover:bg-bone">
                        <td class="px-5 py-4">
                            <form method="POST" action="{{ route('admin.faqs.update', $faq) }}">
                                @csrf
                                @method('PUT')
                                <input type="hidden" name="question_en" value="{{ $faq->question['en'] }}">
                                <input type="hidden" name="question_id" value="{{ $faq->question['id'] }}">
                                <input type="hidden" name="answer_en" value="{{ $faq->answer['en'] }}">
                                <input type="hidden" name="answer_id" value="{{ $faq->answer['id'] }}">
                                <input type="number" name="sort_order" value="{{ $faq->sort_order }}" class="w-16 rounded-md border border-input bg-bone px-2 py-1.5 text-sm outline-none focus:border-terra">
                                <button type="submit" class="ml-1 text-xs text-terra hover:text-terra-deep">Save</button>
                            </form>
                        </td>
                        <td class="px-5 py-4 text-coffee">
                            <p class="font-medium text-ink">{{ $faq->question['en'] }}</p>
                            <p class="text-xs">{{ $faq->question['id'] }}</p>
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
                                <label class="flex items-center gap-2 text-sm">
                                    <input type="checkbox" name="active" value="1" @checked($faq->active) class="size-4 accent-terra" onchange="this.form.submit()"> Active
                                </label>
                            </form>
                        </td>
                        <td class="px-5 py-4 text-right">
                            <details class="group">
                                <summary class="cursor-pointer text-sm text-terra hover:text-terra-deep [&::-webkit-details-marker]:hidden">Edit</summary>
                                <form method="POST" action="{{ route('admin.faqs.update', $faq) }}" class="mt-3 space-y-3 rounded-md border border-border bg-bone p-4">
                                    @csrf
                                    @method('PUT')
                                    <input name="question_en" value="{{ $faq->question['en'] }}" class="w-full rounded-md border border-input bg-cream px-3 py-2 text-sm outline-none focus:border-terra">
                                    <input name="question_id" value="{{ $faq->question['id'] }}" class="w-full rounded-md border border-input bg-cream px-3 py-2 text-sm outline-none focus:border-terra">
                                    <textarea name="answer_en" rows="3" class="w-full rounded-md border border-input bg-cream px-3 py-2 text-sm outline-none focus:border-terra">{{ $faq->answer['en'] }}</textarea>
                                    <textarea name="answer_id" rows="3" class="w-full rounded-md border border-input bg-cream px-3 py-2 text-sm outline-none focus:border-terra">{{ $faq->answer['id'] }}</textarea>
                                    <input type="hidden" name="sort_order" value="{{ $faq->sort_order }}">
                                    <input type="hidden" name="active" value="{{ $faq->active ? 1 : 0 }}">
                                    <button type="submit" class="rounded-full bg-terra px-4 py-1.5 text-xs font-semibold text-cream hover:bg-terra-deep">Save changes</button>
                                </form>
                            </details>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4" class="px-5 py-10 text-center text-coffee">No FAQs yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
