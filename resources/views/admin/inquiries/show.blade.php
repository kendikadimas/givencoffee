@extends('admin.layout')

@section('title', 'Inquiry')

@section('content')
    <div class="max-w-2xl">
        <a href="{{ route('admin.inquiries.index') }}" class="mb-6 inline-block text-sm text-coffee hover:text-ink">← Back to inquiries</a>

        <div class="rounded-md border border-border bg-cream p-6">
            <div class="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-5">
                <div>
                    <h1 class="font-display text-2xl text-ink">{{ $inquiry->name }}</h1>
                    <p class="mt-1 text-sm text-coffee">{{ $inquiry->company ? $inquiry->company.' · ' : '' }}{{ $inquiry->country ?? '' }}</p>
                </div>
                <span class="rounded-full px-3 py-1 text-xs font-medium {{ $inquiry->status === 'new' ? 'bg-terra/15 text-terra-deep' : ($inquiry->status === 'read' ? 'bg-olive text-forest-deep' : 'bg-border text-coffee') }}">
                    {{ ucfirst($inquiry->status) }}
                </span>
            </div>

            <dl class="grid gap-4 py-5 text-sm sm:grid-cols-2">
                <div>
                    <dt class="text-xs uppercase tracking-[0.16em] text-coffee">Email</dt>
                    <dd class="mt-1 font-medium text-ink"><a href="mailto:{{ $inquiry->email }}" class="text-terra hover:text-terra-deep">{{ $inquiry->email }}</a></dd>
                </div>
                <div>
                    <dt class="text-xs uppercase tracking-[0.16em] text-coffee">Quantity</dt>
                    <dd class="mt-1 font-medium text-ink">{{ $inquiry->quantity ?? '—' }}</dd>
                </div>
                <div>
                    <dt class="text-xs uppercase tracking-[0.16em] text-coffee">Received</dt>
                    <dd class="mt-1 font-medium text-ink">{{ $inquiry->created_at->format('d M Y H:i') }}</dd>
                </div>
            </dl>

            <div class="border-t border-border pt-5">
                <dt class="text-xs uppercase tracking-[0.16em] text-coffee">Message</dt>
                <p class="mt-2 whitespace-pre-line leading-relaxed text-ink">{{ $inquiry->message }}</p>
            </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-4">
            <form method="POST" action="{{ route('admin.inquiries.update', $inquiry) }}">
                @csrf
                @method('PUT')
                <select name="status" class="rounded-md border border-input bg-bone px-3 py-2 text-sm outline-none focus:border-terra">
                    @foreach (['new', 'read', 'replied'] as $status)
                        <option value="{{ $status }}" @selected($inquiry->status === $status)>{{ ucfirst($status) }}</option>
                    @endforeach
                </select>
                <button type="submit" class="ml-3 inline-flex h-10 items-center rounded-full bg-terra px-5 text-sm font-semibold text-cream transition-colors hover:bg-terra-deep">Update status</button>
            </form>

            @if ($inquiry->email)
                <a href="mailto:{{ $inquiry->email }}?subject=Re: Your inquiry to Given Coffee" class="inline-flex h-10 items-center rounded-full border border-ink/20 px-5 text-sm font-semibold text-ink transition-colors hover:border-ink">Reply by email</a>
            @endif
        </div>
    </div>
@endsection
