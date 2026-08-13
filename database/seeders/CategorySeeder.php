<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['slug' => 'origin', 'name' => ['en' => 'Origin', 'id' => 'Asal-usul']],
            ['slug' => 'process', 'name' => ['en' => 'Process', 'id' => 'Proses']],
            ['slug' => 'market', 'name' => ['en' => 'Market', 'id' => 'Pasar']],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
