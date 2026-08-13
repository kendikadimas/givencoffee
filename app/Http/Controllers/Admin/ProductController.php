<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Support\ContentParser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ProductController extends Controller
{
    public function edit(): View
    {
        return view('admin.product.edit', [
            'product' => Product::firstOrFail(),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'name_en' => ['required', 'string', 'max:255'],
            'name_id' => ['required', 'string', 'max:255'],
            'subtitle_en' => ['required', 'string', 'max:255'],
            'subtitle_id' => ['required', 'string', 'max:255'],
            'story_en' => ['required', 'string'],
            'story_id' => ['required', 'string'],
            'notes_en' => ['required', 'string'],
            'notes_id' => ['required', 'string'],
            'traits_en' => ['required', 'string'],
            'traits_id' => ['required', 'string'],
            'specs_en' => ['required', 'string'],
            'specs_id' => ['required', 'string'],
            'image_hero' => ['nullable', 'string', 'max:255'],
            'image_packaging' => ['nullable', 'string', 'max:255'],
            'spec_pdf' => ['nullable', 'string', 'max:255'],
            'active' => ['sometimes', 'boolean'],
        ]);

        $specsEn = ContentParser::labelValue($data['specs_en']);
        $specsId = ContentParser::labelValue($data['specs_id']);

        $specs = array_map(
            fn (int $i) => [
                'label' => ['en' => $specsEn[$i]['label'] ?? '', 'id' => $specsId[$i]['label'] ?? ''],
                'value' => ['en' => $specsEn[$i]['value'] ?? '', 'id' => $specsId[$i]['value'] ?? ''],
            ],
            array_keys($specsEn + $specsId),
        );

        $packaging = [];
        for ($i = 0; $i < 3; $i++) {
            $packaging[] = [
                'title' => ['en' => $request->input("packaging_title_en.$i", ''), 'id' => $request->input("packaging_title_id.$i", '')],
                'text' => ['en' => $request->input("packaging_text_en.$i", ''), 'id' => $request->input("packaging_text_id.$i", '')],
                'tag' => ['en' => $request->input("packaging_tag_en.$i", ''), 'id' => $request->input("packaging_tag_id.$i", '')],
            ];
        }

        $product->update([
            'name' => ['en' => $data['name_en'], 'id' => $data['name_id']],
            'subtitle' => ['en' => $data['subtitle_en'], 'id' => $data['subtitle_id']],
            'story' => [
                ['en' => $data['story_en'], 'id' => $data['story_id']],
            ],
            'specs' => $specs,
            'cupping' => [
                'notes' => ['en' => $data['notes_en'], 'id' => $data['notes_id']],
                'traits' => [
                    ['en' => $data['traits_en'], 'id' => $data['traits_id']],
                ],
            ],
            'packaging' => $packaging,
            'images' => [
                'hero' => $data['image_hero'] ?? '/images/real/product.jpeg',
                'packaging' => $data['image_packaging'] ?? '/images/journey-5.jpg',
            ],
            'spec_pdf' => $data['spec_pdf'] ?? null,
            'active' => $request->boolean('active'),
        ]);

        return redirect()->route('admin.product.edit')->with('success', 'Product updated.');
    }
}
