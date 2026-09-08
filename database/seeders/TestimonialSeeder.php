<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => [
                    'en' => 'Marcus Vance',
                    'id' => 'Marcus Vance',
                ],
                'role' => [
                    'en' => 'Head of Sourcing, Apex Coffee Roasters (UK)',
                    'id' => 'Head of Sourcing, Apex Coffee Roasters (UK)',
                ],
                'quote' => [
                    'en' => 'Given Coffee’s Lintong Arabica has become an essential single-origin anchor in our seasonal lineup. The lot consistency, moisture control, and deep herbal notes are exceptional.',
                    'id' => 'Kopi Arabika Lintong dari Given Coffee telah menjadi jangkar single-origin utama dalam menu musiman kami. Konsistensi lot, kontrol kadar air, dan catatan rasa herbalnya sangat luar biasa.',
                ],
                'sort_order' => 0,
                'active' => true,
            ],
            [
                'name' => [
                    'en' => 'Hitoshi Tanaka',
                    'id' => 'Hitoshi Tanaka',
                ],
                'role' => [
                    'en' => 'Quality Director, Pacific Green Import (Japan)',
                    'id' => 'Direktur Kualitas, Pacific Green Import (Jepang)',
                ],
                'quote' => [
                    'en' => 'Full farm-gate traceability and impeccable giling basah processing. Their documentation is flawless and containers always arrive on target moisture window.',
                    'id' => 'Keterlacakan hingga kebun mitra dan pengolahan giling basah yang sempurna. Dokumentasi mereka tanpa cela dan kontainer selalu tiba dalam batas kadar air yang pas.',
                ],
                'sort_order' => 1,
                'active' => true,
            ],
            [
                'name' => [
                    'en' => 'Elena Rostova',
                    'id' => 'Elena Rostova',
                ],
                'role' => [
                    'en' => 'Green Coffee Buyer, Nordik Specialty (Germany)',
                    'id' => 'Green Coffee Buyer, Nordik Specialty (Jerman)',
                ],
                'quote' => [
                    'en' => 'Finding a reliable Sumatran exporter with continuous SCA 85.5+ scoring lots was a challenge until we partnered with Given Coffee. Their sample accuracy is 100%.',
                    'id' => 'Mencari eksportir Sumatra yang andal dengan lot bernilai SCA 85.5+ secara konsisten adalah tantangan sampai kami bermitra dengan Given Coffee. Akurasi sampel mereka 100%.',
                ],
                'sort_order' => 2,
                'active' => true,
            ],
        ];

        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(
                ['name->en' => $t['name']['en']],
                $t
            );
        }
    }
}

