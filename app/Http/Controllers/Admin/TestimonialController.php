<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class TestimonialController extends Controller
{
    public function index(): View
    {
        return view('admin.testimonials.index', [
            'testimonials' => Testimonial::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name_en' => ['required', 'string', 'max:255'],
            'name_id' => ['required', 'string', 'max:255'],
            'role_en' => ['nullable', 'string', 'max:255'],
            'role_id' => ['nullable', 'string', 'max:255'],
            'quote_en' => ['required', 'string'],
            'quote_id' => ['required', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
            'active' => ['sometimes', 'boolean'],
        ]);

        Testimonial::create([
            'name' => ['en' => $data['name_en'], 'id' => $data['name_id']],
            'role' => ['en' => $data['role_en'] ?? '', 'id' => $data['role_id'] ?? ''],
            'quote' => ['en' => $data['quote_en'], 'id' => $data['quote_id']],
            'image' => $data['image'] ?: null,
            'sort_order' => Testimonial::max('sort_order') + 1,
            'active' => $request->boolean('active'),
        ]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial created.');
    }

    public function update(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $data = $request->validate([
            'name_en' => ['required', 'string', 'max:255'],
            'name_id' => ['required', 'string', 'max:255'],
            'role_en' => ['nullable', 'string', 'max:255'],
            'role_id' => ['nullable', 'string', 'max:255'],
            'quote_en' => ['required', 'string'],
            'quote_id' => ['required', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'active' => ['sometimes', 'boolean'],
        ]);

        $testimonial->update([
            'name' => ['en' => $data['name_en'], 'id' => $data['name_id']],
            'role' => ['en' => $data['role_en'] ?? '', 'id' => $data['role_id'] ?? ''],
            'quote' => ['en' => $data['quote_en'], 'id' => $data['quote_id']],
            'image' => $data['image'] ?: null,
            'sort_order' => $data['sort_order'],
            'active' => $request->boolean('active'),
        ]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial deleted.');
    }
}
