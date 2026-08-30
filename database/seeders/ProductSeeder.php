<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Single product per brief: Specialty Arabica Lintong Doloksanggul (green beans)
        Product::updateOrCreate(
            ['id' => 1],
            [
                'name' => [
                    'en' => 'Specialty Arabica Lintong Doloksanggul (Green Beans)',
                    'id' => 'Arabika Lintong Doloksanggul Spesialti (Green Bean)',
                ],
                'subtitle' => [
                    'en' => 'Single-Origin Green Beans',
                    'id' => 'Green Bean Single-Origin',
                ],
                'story' => [
                    [
                        'en' => 'Given Coffee was established with a singular vision: to bring the authentic, complex flavor profile of Lintong Doloksanggul Arabica to the global coffee stage. Situated in the high-altitude volcanic highlands of Humbang Hasundutan, North Sumatra, our partner farms benefit from a unique microclimate and mineral-rich volcanic soil.',
                        'id' => 'Given Coffee didirikan dengan satu visi: membawa profil rasa Arabika Lintong Doloksanggul yang autentik dan kompleks ke panggung kopi global. Terletak di dataran tinggi vulkanik Humbang Hasundutan, Sumatera Utara, kebun mitra kami menikmati mikroklimat unik dan tanah vulkanik kaya mineral.',
                    ],
                    [
                        'en' => 'We work directly with local smallholder farmers, ensuring sustainable agricultural practices, fair prices, and meticulous harvesting protocols. Every bag of green beans leaving our facility represents the true beauty and heritage of North Sumatran coffee.',
                        'id' => 'Kami bekerja langsung dengan petani smallholder lokal, memastikan praktik pertanian berkelanjutan, harga adil, dan protokol panen yang teliti. Setiap karung green bean yang keluar dari fasilitas kami merepresentasikan keindahan dan warisan kopi Sumatera Utara.',
                    ],
                ],
                'specs' => [
                    ['label' => ['en' => 'Product Name', 'id' => 'Nama Produk'], 'value' => ['en' => 'Specialty Arabica Lintong Doloksanggul', 'id' => 'Arabika Lintong Doloksanggul Spesialti']],
                    ['label' => ['en' => 'Origin / Region', 'id' => 'Asal / Wilayah'], 'value' => ['en' => 'Lintong Nihuta & Doloksanggul, Humbang Hasundutan, North Sumatra', 'id' => 'Lintong Nihuta & Doloksanggul, Humbang Hasundutan, Sumatera Utara']],
                    ['label' => ['en' => 'Altitude', 'id' => 'Ketinggian'], 'value' => ['en' => '1,500 – 1,700 MASL', 'id' => '1.500 – 1.700 MDPL']],
                    ['label' => ['en' => 'Soil Type', 'id' => 'Jenis Tanah'], 'value' => ['en' => 'Rich Volcanic Soil (Lake Toba Highland Ecosystem)', 'id' => 'Tanah Vulkanik Subur (Ekosistem Dataran Tinggi Danau Toba)']],
                    ['label' => ['en' => 'Form / Product State', 'id' => 'Bentuk / Kondisi Produk'], 'value' => ['en' => 'Raw Green Coffee Beans (Unroasted)', 'id' => 'Biji Kopi Hijau Mentah (Belum Disangrai)']],
                    ['label' => ['en' => 'Processing Method', 'id' => 'Metode Pengolahan'], 'value' => ['en' => 'Traditional Semi-Washed (Wet-Hulled / Giling Basah)', 'id' => 'Semi-Washed Tradisional (Giling Basah)']],
                    ['label' => ['en' => 'Grade & Defect', 'id' => 'Grade & Cacat'], 'value' => ['en' => 'Specialty Grade / Defect < 5 (SCA Standards)', 'id' => 'Grade Spesialti / Cacat < 5 (Standar SCA)']],
                    ['label' => ['en' => 'Moisture Content', 'id' => 'Kadar Air'], 'value' => ['en' => '12% – 12.5%', 'id' => '12% – 12,5%']],
                    ['label' => ['en' => 'Cupping Score', 'id' => 'Skor Cupping'], 'value' => ['en' => '85.5+ (Specialty Grade)', 'id' => '85.5+ (Grade Spesialti)']],
                    ['label' => ['en' => 'Cupping Notes', 'id' => 'Catatan Cupping'], 'value' => ['en' => 'Tropical fruits, dark chocolate, cedar, signature fresh herbal notes', 'id' => 'Buah tropis, cokelat gelap, cedar, catatan herbal segar khas']],
                    ['label' => ['en' => 'Acidity & Body', 'id' => 'Asam & Body'], 'value' => ['en' => 'Low, well-balanced acidity with a smooth, heavy syrup body', 'id' => 'Asam rendah seimbang dengan body sirup tebal yang halus']],
                    ['label' => ['en' => 'Sweetness', 'id' => 'Kemanisan'], 'value' => ['en' => 'High natural sweetness with a clean, lingering finish', 'id' => 'Kemanisan alami tinggi dengan finish bersih dan panjang']],
                ],
                'cupping' => [
                    'notes' => [
                        'en' => 'Tropical fruits, dark chocolate, cedar, signature fresh herbal notes. Low, well-balanced acidity with a smooth, heavy syrup body and high natural sweetness with a clean, lingering finish.',
                        'id' => 'Buah tropis, cokelat gelap, cedar, catatan herbal segar khas. Asam rendah seimbang dengan body sirup tebal yang halus, kemanisan alami tinggi dengan finish bersih dan panjang.',
                    ],
                    'traits' => [
                        ['en' => 'Specialty Grade', 'id' => 'Grade Spesialti'],
                        ['en' => 'Fully Traceable', 'id' => 'Terlacak Penuh'],
                        ['en' => 'Export-ready', 'id' => 'Siap ekspor'],
                        ['en' => 'Sustainable', 'id' => 'Berkelanjutan'],
                    ],
                ],
                'packaging' => [
                    ['title' => ['en' => 'Standard Export Packaging', 'id' => 'Kemasan Ekspor Standar'], 'text' => ['en' => '60kg Jute Bags with GrainPro Hermetic Inner Liner — preserves fresh-crop aromatics during ocean transit.', 'id' => 'Karung Jute 60kg dengan Liner Hermetik GrainPro — menjaga aroma panen segar selama transit laut.'], 'tag' => ['en' => 'Standard Export', 'id' => 'Ekspor Standar']],
                    ['title' => ['en' => 'Sample Packaging', 'id' => 'Kemasan Sampel'], 'text' => ['en' => '500g–1kg sample bags shipped via DHL/FedEx directly to your roastery.', 'id' => 'Kantong sampel 500g–1kg dikirim via DHL/FedEx langsung ke roastery Anda.'], 'tag' => ['en' => 'Samples', 'id' => 'Sampel']],
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
