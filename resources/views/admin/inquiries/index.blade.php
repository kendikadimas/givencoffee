@extends('admin.layout')

@section('title', 'Inquiries')

@section('content')
    <div class="mb-6">
        <p class="text-sm text-coffee">{{ $inquiries->count() }} inquiries</p>
    </div>

    <div class="overflow-hidden rounded-md border border-border bg-cream">
        <table class="w-full text-left text-sm">
            <thead class="border-b border-border text-xs uppercase tracking-[0.14em] text-coffee">
                <tr>
                    <th class="px-5 py-3 font-semibold">Name</th>
                    <th class="hidden px-5 py-3 font-semibold md:table-cell">Company / Country</th>
                    <th class="hidden px-5 py-3 font-semibold lg:table-cell">Quantity</th>
                    <th class="hidden px-5 py-3 font-semibold lg:table-cell">Received</th>
                    <th class="px-5 py-3 font-semibold">Status</th>
                    <th class="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-border">
                @forelse ($inquiries as $inquiry)
                    <tr class="hover:bg-bone">
                        <td class="px-5 py-4">
                            <p class="font-medium text-ink">{{ $inquiry->name }}</p>
                            <p class="text-xs text-coffee">{{ $inquiry->email }}</p>
                        </td>
                        <td class="hidden px-5 py-4 text-coffee md:table-cell">
                            <p>{{ $inquiry->company ?? '—' }}</p>
                            <p class="text-xs">{{ $inquiry->country ?? '' }}</p>
                        </td>
                        <td class="hidden px-5 py-4 text-coffee lg:table-cell">{{ $inquiry->quantity ?? '—' }}</td>
                        <td class="hidden px-5 py-4 text-coffee lg:table-cell">{{ $inquiry->created_at->format('d M Y H:i') }}</td>
                        <td class="px-5 py-4">
                            <span class="rounded-full px-2.5 py-1 text-xs font-medium {{ $inquiry->status === 'new' ? 'bg-terra/15 text-terra-deep' : ($inquiry->status === 'read' ? 'bg-olive text-forest-deep' : 'bg-border text-coffee') }}">
                                {{ ucfirst($inquiry->status) }}
                            </span>
                        </td>
                        <td class="px-5 py-4">
                            <div class="flex justify-end gap-3">
                                <a href="{{ route('admin.inquiries.show', $inquiry) }}" class="text-terra hover:text-terra-deep">Open</a>
                                <form method="POST" action="{{ route('admin.inquiries.destroy', $inquiry) }}" onsubmit="return confirm('Delete this inquiry?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-terra-deep hover:text-destructive">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6" class="px-5 py-10 text-center text-coffee">No inquiries yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
