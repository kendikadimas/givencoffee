<?php

namespace App\Http\Controllers;

use App\Mail\NewInquiry;
use App\Models\Inquiry;
use App\Support\SiteSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;

class InquiryController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'quantity' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $inquiry = Inquiry::create($validated);

        try {
            Mail::to(SiteSettings::get('email'))->send(new NewInquiry($inquiry));
        } catch (\Throwable $e) {
            // ponytail: email failure should not lose the lead; inquiry is already stored
        }

        return back();
    }
}
