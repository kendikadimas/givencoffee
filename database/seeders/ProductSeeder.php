<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Product 1: Kopi Bubuk Arabika Specialty Lintong 250g
        Product::updateOrCreate(
            ['id' => 1],
            [
                'name' => [
                    'en' => 'Specialty Ground & Whole Bean Arabica Lintong Coffee 250g',
                    'id' => 'Kopi Bubuk Arabika Specialty Lintong - Doloksanggul 250g',
                ],
                'subtitle' => [
                    'en' => 'Specialty Arabica Coffee (250g)',
                    'id' => 'Kopi Bubuk Arabika Lintong Specialty (250g)',
                ],
                'story' => [
                    [
                        'en' => 'Lintong Specialty Arabica Coffee by Given Coffee is the embodiment of North Sumatra\'s natural beauty packaged into a refined cup of coffee. Grown at an altitude of 1,500 – 1,700 meters above sea level, these beans absorb the unique characteristics of Lintong volcanic soil, creating a rich and complex flavor profile. Every sip delivers a perfect harmony of bright acidity, tropical fruit notes, and a smooth chocolate finish.',
                        'id' => 'Kopi Arabika Lintong Specialty by Given Coffee adalah perwujudan dari keindahan alam Sumatera Utara yang dikemas dalam secangkir kopi. Ditumbuhkan di ketinggian 1.500 - 1.700 meter di atas permukaan laut, biji kopi ini menyerap keunikan tanah vulkanik Lintong, menghasilkan rasa yang kompleks dan kaya. Setiap tegukan menghadirkan harmoni sempurna antara keasaman yang cerah, nuansa buah-buahan tropis, dan sentuhan cokelat halus.',
                    ],
                    [
                        'en' => 'Carefully roasted to preserve its natural character, Lintong Specialty Arabica Coffee by Given Coffee offers an exceptional and unforgettable coffee experience. One of its key highlights is low acidity, making it ideal for those sensitive to high acid levels while still enjoying deep flavor richness. Additionally, it boasts high natural sweetness and a distinct herbal aroma, adding a captivating dimension to every cup.',
                        'id' => 'Disangrai dengan cermat untuk mempertahankan karakteristik alaminya, Kopi Arabika Lintong Specialty oleh Given Coffee menawarkan pengalaman minum kopi yang istimewa dan tak terlupakan. Salah satu keunikan utamanya adalah kadar asam yang rendah, membuatnya cocok untuk mereka yang sensitif terhadap keasaman tinggi namun tetap menginginkan kekayaan rasa. Selain itu, kopi ini juga memiliki tingkat manis alami yang tinggi dan kaya akan aroma serta rasa herbal yang khas, memberikan dimensi tambahan yang membuat setiap cangkirnya begitu memikat.',
                    ],
                ],
                'specs' => [
                    ['label' => ['en' => 'Coffee Type', 'id' => 'Jenis Kopi'], 'value' => ['en' => 'Lintong Arabica', 'id' => 'Arabika Lintong']],
                    ['label' => ['en' => 'Origin', 'id' => 'Asal'], 'value' => ['en' => 'Doloksanggul, Sumatra, Indonesia', 'id' => 'Doloksanggul, Sumatra, Indonesia']],
                    ['label' => ['en' => 'Altitude', 'id' => 'Ketinggian'], 'value' => ['en' => '1,500 – 1,700 masl', 'id' => '1.500 – 1.700 mdpl']],
                    ['label' => ['en' => 'Net Weight', 'id' => 'Berat Bersih'], 'value' => ['en' => '250 grams', 'id' => '250 gram']],
                    ['label' => ['en' => 'Form', 'id' => 'Bentuk'], 'value' => ['en' => 'Whole bean or ground (Option available)', 'id' => 'Biji kopi utuh atau bubuk (pilihan tersedia)']],
                    ['label' => ['en' => 'Process', 'id' => 'Proses Pengolahan'], 'value' => ['en' => 'Semi-washed', 'id' => 'Semi-washed']],
                ],
                'cupping' => [
                    'notes' => [
                        'en' => 'Low acidity, high natural sweetness, tropical fruit notes, smooth chocolate finish, and a distinctive herbal aroma.',
                        'id' => 'Kadar asam rendah, tingkat manis alami tinggi, nuansa buah-buahan tropis, sentuhan cokelat halus, dan kaya aroma herbal khas.',
                    ],
                    'traits' => [
                        ['en' => 'Tropical Fruit', 'id' => 'Buah Tropis'],
                        ['en' => 'Subtle Chocolate', 'id' => 'Cokelat Halus'],
                        ['en' => 'Herbal Aroma', 'id' => 'Aroma Herbal'],
                        ['en' => 'Low Acidity', 'id' => 'Asam Rendah'],
                        ['en' => 'Natural Sweetness', 'id' => 'Manis Alami'],
                    ],
                ],
                'packaging' => [
                    ['title' => ['en' => '250g Valve Pouch', 'id' => 'Kemasan Valve 250g'], 'text' => ['en' => 'White standup pouch with one-way degassing valve.', 'id' => 'Kemasan kantong valve putih dengan zipper menjaga kesegaran rasa.'], 'tag' => ['en' => 'Retail 250g', 'id' => 'Ritel 250g']],
                    ['title' => ['en' => 'Wholesale Supply', 'id' => 'Pasokan Grosir'], 'text' => ['en' => 'Custom packaging and bulk supply options available upon request.', 'id' => 'Kemasan khusus dan opsi pasokan grosir tersedia sesuai permintaan.'], 'tag' => ['en' => 'Wholesale', 'id' => 'Grosir']],
                ],
                'images' => [
                    'hero' => '/images/real/whitepouch.jpeg',
                    'packaging' => '/images/real/whitepouch2.jpeg',
                ],
                'spec_pdf' => null,
                'active' => true,
            ],
        );

        // Product 2: Kopi Green Bean Arabika Lintong (Blue Batak Specialty)
        Product::updateOrCreate(
            ['id' => 2],
            [
                'name' => [
                    'en' => 'Raw Specialty Green Coffee Beans Lintong (Blue Batak Specialty)',
                    'id' => 'Kopi Green Bean Arabika Lintong - Doloksanggul (Blue Batak Specialty)',
                ],
                'subtitle' => [
                    'en' => 'Raw Green Coffee Beans (500g - 1000g)',
                    'id' => 'Biji Kopi Mentah Green Bean Specialty (500g - 1000g)',
                ],
                'story' => [
                    [
                        'en' => 'Lintong Specialty Arabica Green Beans by Given Coffee represent the purest reflection of North Sumatra\'s highlands. Cultivated between 1,500 – 1,700 meters above sea level, these unroasted beans absorb the volcanic mineral richness of Lintong soil.',
                        'id' => 'Kopi Arabika Lintong Specialty by Given Coffee adalah perwujudan dari keindahan alam Sumatera Utara yang dikemas dalam secangkir kopi. Ditumbuhkan di ketinggian 1.500 - 1.700 meter di atas permukaan laut, biji kopi ini menyerap keunikan tanah vulkanik Lintong, menghasilkan rasa yang kompleks dan kaya.',
                    ],
                    [
                        'en' => 'Selective hand-picking and traditional semi-washed processing result in dense, high-grade Blue Batak green beans with exceptional sweet herbal and tropical notes potential for home and commercial roasters.',
                        'id' => 'Pemetikan tangan selektif dan pengolahan semi-washed menghasilkan biji mentah Blue Batak Specialty berkualitas tinggi dengan kadar manis alami tinggi serta aroma herbal yang khas.',
                    ],
                ],
                'specs' => [
                    ['label' => ['en' => 'Coffee Type', 'id' => 'Jenis Kopi'], 'value' => ['en' => 'Lintong Arabica (Blue Batak Specialty)', 'id' => 'Arabika Lintong (Blue Batak Specialty)']],
                    ['label' => ['en' => 'Origin', 'id' => 'Asal'], 'value' => ['en' => 'Doloksanggul, Sumatra, Indonesia', 'id' => 'Doloksanggul, Sumatra, Indonesia']],
                    ['label' => ['en' => 'Altitude', 'id' => 'Ketinggian'], 'value' => ['en' => '1,500 – 1,700 masl', 'id' => '1.500 – 1.700 mdpl']],
                    ['label' => ['en' => 'Net Weight', 'id' => 'Berat Bersih'], 'value' => ['en' => '500 - 1000 grams', 'id' => '500 - 1000 gram']],
                    ['label' => ['en' => 'Form', 'id' => 'Bentuk'], 'value' => ['en' => 'Raw Green Coffee Beans', 'id' => 'Biji kopi mentah (Green Bean)']],
                    ['label' => ['en' => 'Process', 'id' => 'Proses Pengolahan'], 'value' => ['en' => 'Semi-washed', 'id' => 'Semi-washed']],
                ],
                'cupping' => [
                    'notes' => [
                        'en' => 'High-grade Blue Batak unroasted green beans with dense bean structure and rich tropical herbal potential.',
                        'id' => 'Grade Green Bean Blue Batak Specialty. Struktur biji padat dengan potensi rasa herbal dan buah tropis yang kaya.',
                    ],
                    'traits' => [
                        ['en' => 'Blue Batak', 'id' => 'Blue Batak'],
                        ['en' => 'Green Bean', 'id' => 'Biji Mentah'],
                        ['en' => 'Semi-Washed', 'id' => 'Semi-Washed'],
                        ['en' => 'Herbal Profile', 'id' => 'Profil Herbal'],
                        ['en' => 'Low Acidity', 'id' => 'Asam Rendah'],
                    ],
                ],
                'packaging' => [
                    ['title' => ['en' => 'Clear Zipper Pouch', 'id' => 'Kemasan Transparan Zip'], 'text' => ['en' => 'Sealed transparent zipper pouch displaying green bean purity.', 'id' => 'Kemasan ziplock transparan yang menampilkan kerapian biji green bean.'], 'tag' => ['en' => 'Green Bean', 'id' => 'Green Bean']],
                    ['title' => ['en' => 'Bulk Jute Bags', 'id' => 'Karung Ekspor Bulk'], 'text' => ['en' => 'Export jute bags with GrainPro lining available for bulk shipments.', 'id' => 'Tersedia karung rami ekspor bersertifikat GrainPro untuk pengiriman grosir.'], 'tag' => ['en' => 'Export Bulk', 'id' => 'Ekspor Bulk']],
                ],
                'images' => [
                    'hero' => '/images/real/pouchgreenbeans.jpeg',
                    'packaging' => '/images/real/pouchgreenbeans2.jpeg',
                ],
                'spec_pdf' => null,
                'active' => true,
            ],
        );

        // Product 3: Biji Roasting Kopi Arabika Specialty Lintong - Doloksanggul 500g
        Product::updateOrCreate(
            ['id' => 3],
            [
                'name' => [
                    'en' => 'Whole Roasted Specialty Arabica Lintong Coffee Beans 500g',
                    'id' => 'Biji Roasting Kopi Arabika Specialty Lintong - Doloksanggul 500g',
                ],
                'subtitle' => [
                    'en' => 'Whole Roasted Coffee Beans (500g)',
                    'id' => 'Biji Kopi Sangrai Utuh Arabika Specialty Lintong (500g)',
                ],
                'story' => [
                    [
                        'en' => 'Whole roasted Lintong Specialty Arabica coffee beans by Given Coffee bring out the pinnacle of North Sumatra\'s highlands. Grown between 1,500 – 1,700 masl in volcanic soil, each bean delivers a rich, complex cup with low acidity, tropical fruitiness, and a velvety chocolate finish.',
                        'id' => 'Kopi Arabika Lintong Specialty by Given Coffee adalah perwujudan dari keindahan alam Sumatera Utara yang dikemas dalam secangkir kopi. Ditumbuhkan di ketinggian 1.500 - 1.700 meter di atas permukaan laut, biji kopi ini menyerap keunikan tanah vulkanik Lintong, menghasilkan rasa yang kompleks dan kaya.',
                    ],
                    [
                        'en' => 'Meticulously roasted to highlight natural sweetness and low acidity, making it gentle on the stomach while providing an aromatic herbal complexity for true coffee lovers.',
                        'id' => 'Disangrai dengan cermat untuk mempertahankan karakteristik alaminya, menawarkan kadar asam rendah dan manis alami tinggi untuk pengalaman minum kopi yang ramah di lambung.',
                    ],
                ],
                'specs' => [
                    ['label' => ['en' => 'Coffee Type', 'id' => 'Jenis Kopi'], 'value' => ['en' => 'Lintong Arabica', 'id' => 'Arabika Lintong']],
                    ['label' => ['en' => 'Origin', 'id' => 'Asal'], 'value' => ['en' => 'Doloksanggul, Sumatra, Indonesia', 'id' => 'Doloksanggul, Sumatra, Indonesia']],
                    ['label' => ['en' => 'Altitude', 'id' => 'Ketinggian'], 'value' => ['en' => '1,500 – 1,700 masl', 'id' => '1.500 – 1.700 mdpl']],
                    ['label' => ['en' => 'Net Weight', 'id' => 'Berat Bersih'], 'value' => ['en' => '500 grams', 'id' => '500 gram']],
                    ['label' => ['en' => 'Form', 'id' => 'Bentuk'], 'value' => ['en' => 'Whole Roasted Coffee Beans', 'id' => 'Biji kopi utuh (roasting)']],
                    ['label' => ['en' => 'Process', 'id' => 'Proses Pengolahan'], 'value' => ['en' => 'Semi-washed', 'id' => 'Semi-washed']],
                ],
                'cupping' => [
                    'notes' => [
                        'en' => 'Medium roasted profile delivering low acidity, natural sweetness, tropical fruit hints, and a smooth chocolate finish.',
                        'id' => 'Profil sangrai medium menghadirkan rasa asam rendah, manis alami tinggi, buah tropis, dan finish cokelat halus.',
                    ],
                    'traits' => [
                        ['en' => 'Whole Roasted', 'id' => 'Biji Sangrai Utuh'],
                        ['en' => 'Subtle Chocolate', 'id' => 'Cokelat Halus'],
                        ['en' => 'Tropical Fruit', 'id' => 'Buah Tropis'],
                        ['en' => 'Herbal Notes', 'id' => 'Sentuhan Herbal'],
                        ['en' => 'Low Acidity', 'id' => 'Asam Rendah'],
                    ],
                ],
                'packaging' => [
                    ['title' => ['en' => '500g Degassing Valve Pouch', 'id' => 'Kantong Valve 500g'], 'text' => ['en' => '500g standup pouch featuring one-way degassing valve.', 'id' => 'Kantong 500g dengan satu arah katup udara untuk kesegaran terjamin.'], 'tag' => ['en' => 'Roasted 500g', 'id' => 'Roasting 500g']],
                    ['title' => ['en' => 'Roaster & Retail Supply', 'id' => 'Pasokan Ritel & Sangrai'], 'text' => ['en' => 'Wholesale rates available for coffee shops and retail partners.', 'id' => 'Harga pasokan grosir tersedia untuk kedai kopi dan mitra ritel.'], 'tag' => ['en' => 'Wholesale', 'id' => 'Grosir']],
                ],
                'images' => [
                    'hero' => '/images/real/product.jpeg',
                    'packaging' => '/images/real/twoproducts.jpeg',
                ],
                'spec_pdf' => null,
                'active' => true,
            ],
        );
    }
}
