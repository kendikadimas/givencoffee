<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        // Testimonials are pending client input ("menyusul" per brief).
        // Structure is ready; add rows once quotes are approved.
        Testimonial::truncate();
    }
}
