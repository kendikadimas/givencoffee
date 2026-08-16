<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\View\View;

class InquiryController extends Controller
{
    public function index(): View
    {
        return view('admin.inquiries.index', [
            'inquiries' => Inquiry::latest()->get(),
        ]);
    }

    public function export(): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $rows = Inquiry::latest()->get();

        $output = fopen('php://temp', 'r+');

        fputcsv($output, ['Date', 'Name', 'Company', 'Email', 'Country', 'Quantity', 'Message', 'Status']);

        foreach ($rows as $inquiry) {
            fputcsv($output, [
                $inquiry->created_at->format('d M Y H:i'),
                $inquiry->name,
                $inquiry->company,
                $inquiry->email,
                $inquiry->country,
                $inquiry->quantity,
                $inquiry->message,
                $inquiry->status,
            ]);
        }

        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);

        return Response::streamDownload(fn () => print $csv, 'inquiries-'.now()->format('Y-m-d').'.csv', [
            'Content-Type' => 'text/csv',
        ]);
    }

    public function show(Inquiry $inquiry): View
    {
        if ($inquiry->status === Inquiry::STATUS_NEW) {
            $inquiry->update(['status' => Inquiry::STATUS_READ]);
        }

        return view('admin.inquiries.show', [
            'inquiry' => $inquiry,
        ]);
    }

    public function update(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'in:new,read,replied'],
        ]);

        $inquiry->update(['status' => $request->input('status')]);

        return redirect()->route('admin.inquiries.show', $inquiry)->with('success', 'Status updated.');
    }

    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        $inquiry->delete();

        return redirect()->route('admin.inquiries.index')->with('success', 'Inquiry deleted.');
    }
}
