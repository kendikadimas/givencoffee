<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class FaqController extends Controller
{
    public function index(): View
    {
        return view('admin.faqs.index', [
            'faqs' => Faq::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'question_en' => ['required', 'string', 'max:255'],
            'question_id' => ['required', 'string', 'max:255'],
            'answer_en' => ['required', 'string'],
            'answer_id' => ['required', 'string'],
            'active' => ['sometimes', 'boolean'],
        ]);

        Faq::create([
            'question' => ['en' => $data['question_en'], 'id' => $data['question_id']],
            'answer' => ['en' => $data['answer_en'], 'id' => $data['answer_id']],
            'sort_order' => Faq::max('sort_order') + 1,
            'active' => $request->boolean('active'),
        ]);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ created.');
    }

    public function update(Request $request, Faq $faq): RedirectResponse
    {
        $data = $request->validate([
            'question_en' => ['required', 'string', 'max:255'],
            'question_id' => ['required', 'string', 'max:255'],
            'answer_en' => ['required', 'string'],
            'answer_id' => ['required', 'string'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'active' => ['sometimes', 'boolean'],
        ]);

        $faq->update([
            'question' => ['en' => $data['question_en'], 'id' => $data['question_id']],
            'answer' => ['en' => $data['answer_en'], 'id' => $data['answer_id']],
            'sort_order' => $data['sort_order'],
            'active' => $request->boolean('active'),
        ]);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ updated.');
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        $faq->delete();

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ deleted.');
    }
}
