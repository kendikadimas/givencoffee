<?php

namespace App\Http\Controllers;

use App\Mail\NewInquiry;
use App\Models\Inquiry;
use App\Support\SiteSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class InquiryController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'annual_demand' => ['required', 'string', 'max:255'],
            'shipping_address' => ['required', 'string', 'max:1000'],
        ]);

        // ponytail: brief has no message field; keep column for legacy rows
        $validated['message'] = '';

        $inquiry = Inquiry::create($validated);

        try {
            Mail::to(SiteSettings::get('email'))->send(new NewInquiry($inquiry));
        } catch (\Throwable $e) {
            // ponytail: email failure should not lose the lead; inquiry is already stored
        }

        return back();
    }
}
