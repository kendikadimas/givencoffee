<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Product 1: Specialty Green Beans (B2B export)
        Product::updateOrCreate(
            ['id' => 1],
            [
                'name' => [
                    'en' => 'Specialty Green Beans — Indonesian Highlands',
                    'id' => 'Green Bean Spesialti — Dataran Tinggi Indonesia',
                ],
                'subtitle' => [
                    'en' => 'Pure origin, fully traceable',
                    'id' => 'Asal murni, terlacak penuh',
                ],
                'story' => [
                    [
                        'en' => 'Given Coffee exports specialty green beans sourced from partner farms in the Indonesian highlands — volcanic soil, cool nights and generations of farming expertise. Lots are combined from several partner farms with the same variety, so you get a consistent product shipment after shipment.',
                        'id' => 'Given Coffee mengekspor green bean spesialti dari kebun mitra di dataran tinggi Indonesia — tanah vulkanik, malam sejuk, dan pengalaman bertani lintas generasi. Lot digabung dari beberapa kebun mitra dengan varietas yang sama, sehingga Anda mendapat produk yang konsisten setiap pengiriman.',
                    ],
                    [
                        'en' => 'Every lot is graded, moisture-checked and cupped before export, and ships with full documentation. NIB & Halal certified, with a production capacity of 100 tonnes per year.',
                        'id' => 'Setiap lot digrading, dicek kadar air, dan dicupping sebelum ekspor, serta dikirim dengan dokumentasi lengkap. Tersertifikasi NIB & Halal, dengan kapasitas produksi 100 ton per tahun.',
                    ],
                ],
                'specs' => [
                    ['label' => ['en' => 'Origin', 'id' => 'Asal'], 'value' => ['en' => 'Indonesian highlands — on request per lot', 'id' => 'Dataran tinggi Indonesia — atas permintaan per lot']],
                    ['label' => ['en' => 'Form', 'id' => 'Bentuk'], 'value' => ['en' => 'Specialty green beans', 'id' => 'Green bean spesialti']],
                    ['label' => ['en' => 'Altitude', 'id' => 'Ketinggian'], 'value' => ['en' => 'On request per lot', 'id' => 'Tersedia atas permintaan per lot']],
                    ['label' => ['en' => 'Variety', 'id' => 'Varietas'], 'value' => ['en' => 'Combined by variety — on request', 'id' => 'Digabung per varietas — atas permintaan']],
                    ['label' => ['en' => 'Process', 'id' => 'Proses'], 'value' => ['en' => 'On request per lot', 'id' => 'Tersedia atas permintaan per lot']],
                    ['label' => ['en' => 'Cupping score', 'id' => 'Skor cupping'], 'value' => ['en' => 'On request per lot', 'id' => 'Tersedia atas permintaan per lot']],
                    ['label' => ['en' => 'Moisture', 'id' => 'Kadar air'], 'value' => ['en' => 'Export grade — on request', 'id' => 'Standar ekspor — atas permintaan']],
                    ['label' => ['en' => 'Packaging', 'id' => 'Kemasan'], 'value' => ['en' => 'GrainPro hermetic inner bag + gunny jute bag, 60 kg / 30 kg', 'id' => 'Kantong hermetik GrainPro + karung jute, 60 kg / 30 kg']],
                    ['label' => ['en' => 'Private label', 'id' => 'Private label'], 'value' => ['en' => 'Available — MOQ 2 tonnes', 'id' => 'Tersedia — MOQ 2 ton']],
                    ['label' => ['en' => 'Capacity', 'id' => 'Kapasitas'], 'value' => ['en' => '100 tonnes per year', 'id' => '100 ton per tahun']],
                    ['label' => ['en' => 'Certification', 'id' => 'Sertifikasi'], 'value' => ['en' => 'NIB & Halal', 'id' => 'NIB & Halal']],
                ],
                'cupping' => [
                    'notes' => [
                        'en' => 'Each lot is cupped, graded and moisture-checked before it ships — the technical profile for the specific lot you order is shared on request.',
                        'id' => 'Setiap lot dicupping, digrading, dan dicek kadar airnya sebelum dikirim — profil teknis lot spesifik yang Anda pesan dibagikan atas permintaan.',
                    ],
                    'traits' => [
                        ['en' => 'Traceable', 'id' => 'Terlacak'],
                        ['en' => 'Consistent', 'id' => 'Konsisten'],
                        ['en' => 'Export-ready', 'id' => 'Siap ekspor'],
                        ['en' => 'Halal', 'id' => 'Halal'],
                        ['en' => 'Sustainable', 'id' => 'Berkelanjutan'],
                    ],
                ],
                'packaging' => [
                    ['title' => ['en' => 'Bulk export', 'id' => 'Ekspor curah'], 'text' => ['en' => 'GrainPro hermetic inner bag + gunny jute bag in 60 kg / 30 kg, container-ready.', 'id' => 'Kantong hermetik GrainPro + karung jute dalam 60 kg / 30 kg, siap kontainer.'], 'tag' => ['en' => 'Export', 'id' => 'Ekspor']],
                    ['title' => ['en' => 'Private label', 'id' => 'Private label'], 'text' => ['en' => 'Your branding on our beans, packed to your spec — MOQ 2 tonnes.', 'id' => 'Brand Anda di biji kami, dikemas sesuai spesifikasi — MOQ 2 ton.'], 'tag' => ['en' => 'Brands', 'id' => 'Brand']],
                    ['title' => ['en' => 'Sample lots', 'id' => 'Lot sampel'], 'text' => ['en' => 'Small sample lots available so you can evaluate the origin before ordering.', 'id' => 'Lot sampel kecil tersedia agar Anda bisa menilai asal sebelum memesan.'], 'tag' => ['en' => 'Sample', 'id' => 'Sampel']],
                ],
                'images' => [
                    'hero' => '/images/real/beansonacontainer.jpeg',
                    'packaging' => '/images/real/pouchgreenbeans.jpeg',
                ],
                'spec_pdf' => null,
                'active' => true,
            ],
        );

        // Deactivate legacy retail products (ground 250g, roasted 500g) if they exist — green beans only.
        Product::whereIn('id', [2, 3])->update(['active' => false]);
    }
}
