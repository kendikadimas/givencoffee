<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    private function content(string $type, string $en, string $id): array
    {
        return [
            'en' => ['type' => $type, 'text' => $en],
            'id' => ['type' => $type, 'text' => $id],
        ];
    }

    public function run(): void
    {
        $posts = [
            [
                'slug' => 'why-indonesian-coffee-deserves-a-name',
                'category' => 'origin',
                'cover' => '/images/blog-1.jpg',
                'title' => ['en' => 'Why Indonesian coffee deserves a name', 'id' => 'Mengapa kopi Indonesia pantas memiliki nama'],
                'excerpt' => ['en' => 'For decades, the best Indonesian lots were blended away into nameless bulk. We think that has to change.', 'id' => 'Selama puluhan tahun, lot terbaik Indonesia hilang dalam campuran tanpa nama. Kami rasa itu harus berubah.'],
                'content' => [
                    $this->content('p', 'Walk into any roastery in Europe or North America and you will find coffees from Ethiopia, Colombia, Kenya — named, traced, and celebrated. Indonesia, one of the largest coffee producers on earth, is often still sold as a seasoning for blends.', 'Masuki roastery mana pun di Eropa atau Amerika Utara dan Anda akan menemukan kopi dari Ethiopia, Kolombia, Kenya — bernama, terlacak, dan dirayakan. Indonesia, salah satu produsen kopi terbesar di dunia, sering masih dijual sebagai bumbu campuran.'),
                    $this->content('p', 'The highlands around Lake Toba grow Arabica of real character: dense, sweet, low in acidity, with a heavy body that carries through milk and espresso alike. The problem was never the coffee. It was that nobody gave it a name.', 'Dataran tinggi di sekitar Danau Toba menumbuhkan Arabika berkarakter sejati: padat, manis, rendah keasaman, dengan body pekat yang tetap terasa di susu maupun espresso. Masalahnya bukan kopinya. Masalahnya tak ada yang memberinya nama.'),
                    $this->content('h2', 'What changes when coffee has a name', 'Yang berubah ketika kopi punya nama'),
                    $this->content('p', 'Traceability means the farmer is paid for quality, not anonymised into a blend price. It means the buyer can verify origin, altitude, and process. And it means the drinker can finally taste the place, not just the blend.', 'Keterlacakan berarti petani dibayar untuk mutu, bukan dianonimkan ke harga campuran. Berarti pembeli dapat memverifikasi asal, ketinggian, dan proses. Dan berarti penikmat akhirnya bisa merasakan tempatnya, bukan hanya campurannya.'),
                    $this->content('p', 'That is the work we do at Given Coffee: keeping every lot traceable from a named farm to a named roastery — and giving Indonesian coffee the name it always deserved.', 'Itulah kerja kami di Given Coffee: menjaga setiap lot terlacak dari kebun yang bernama ke roastery yang bernama — dan memberi kopi Indonesia nama yang selalu pantas ia dapatkan.'),
                ],
                'published_at' => now()->subDays(20),
            ],
            [
                'slug' => 'the-washed-process-explained',
                'category' => 'process',
                'cover' => '/images/blog-2.jpg',
                'title' => ['en' => 'The wet-hulled process, explained', 'id' => 'Proses giling basah, dijelaskan'],
                'excerpt' => ['en' => 'Why is our Lintong lot so low in acidity and heavy in body? A short guide to Sumatra\'s signature wet-hulled process.', 'id' => 'Mengapa lot Lintong kami rendah keasaman dan berbody pekat? Panduan singkat proses giling basah khas Sumatra.'],
                'content' => [
                    $this->content('p', 'Coffee processing is how the fruit around the bean is removed and the bean prepared for drying. There are many methods; Sumatra is famous for one: giling basah, or wet hulling.', 'Pengolahan kopi adalah cara buah di sekitar biji dibuang dan biji disiapkan untuk dikeringkan. Ada banyak metode; Sumatra terkenal dengan satu metode: giling basah.'),
                    $this->content('h2', 'The steps', 'Langkah-langkahnya'),
                    $this->content('p', 'Ripe cherries are picked, then pulped the same day to remove the skin. The beans are fermented overnight, washed, and dried in their parchment until the moisture drops to 30–40%. The parchment is then hulled off while the bean is still soft and moist — before drying finishes.', 'Ceri matang dipetik, lalu dikupas di hari yang sama untuk membuang kulitnya. Biji difermentasi semalam, dicuci, lalu dijemur dalam parchment hingga kadar air turun ke 30–40%. Kulit tanduk lalu dikupas saat biji masih lembut dan lembap — sebelum pengeringan selesai.'),
                    $this->content('p', 'Hulling the bean in this semi-wet state gives it its bluish-green tint, lowers acidity, and boosts body — the classic Sumatran cup. This is why our Lintong lot tastes the way it does.', 'Mengupas biji dalam kondisi semi-lembap inilah yang memberi warna kebiruan, menurunkan keasaman, dan menambah body — cangkir khas Sumatra. Karena itulah lot Lintong kami terasa seperti ini.'),
                ],
                'published_at' => now()->subDays(10),
            ],
            [
                'slug' => 'what-buyers-look-for-in-specialty-lots',
                'category' => 'market',
                'cover' => '/images/blog-3.jpg',
                'title' => ['en' => 'What buyers look for in specialty lots', 'id' => 'Yang dicari pembeli dalam lot spesialti'],
                'excerpt' => ['en' => 'Cupping score, moisture, screen size, documentation — a practical checklist for sourcing green coffee.', 'id' => 'Skor cupping, kadar air, screen size, dokumentasi — daftar praktis untuk mencari green coffee.'],
                'content' => [
                    $this->content('p', 'Buying green coffee for a roastery is different from buying for a supermarket. Here is what the buyers we work with check, in order.', 'Membeli green coffee untuk roastery berbeda dengan membeli untuk supermarket. Inilah yang diperiksa pembeli yang kami layani, secara berurutan.'),
                    $this->content('h2', '1. Cupping score', '1. Skor cupping'),
                    $this->content('p', 'A lot scoring 84+ (SCA) commands a premium because it is consistent and drinkable on its own. Always ask for the cupping report, not just the number.', 'Lot dengan skor 84+ (SCA) berharga premium karena konsisten dan enak diminum sendiri. Selalu minta laporan cupping, bukan sekadar angkanya.'),
                    $this->content('h2', '2. Moisture and screen size', '2. Kadar air dan screen size'),
                    $this->content('p', 'Green beans should ship at 10.5–11.5% moisture. Anything higher risks mold in transit; anything lower risks stale, brittle beans. Screen size is a quick quality proxy.', 'Green bean harus dikirim dengan kadar air 10,5–11,5%. Lebih tinggi berisiko jamur di perjalanan; lebih rendah berisiko biji kering dan rapuh. Screen size adalah proksi mutu yang cepat.'),
                    $this->content('h2', '3. Documentation', '3. Dokumentasi'),
                    $this->content('p', 'Phytosanitary certificate, certificate of origin, invoice, packing list — if the paperwork is easy, the shipment will be too. It is the first sign of a serious exporter.', 'Sertifikat phytosanitary, certificate of origin, invoice, packing list — jika dokumennya rapi, kirimannya juga akan rapi. Itu tanda pertama eksportir yang serius.'),
                ],
                'published_at' => now()->subDays(3),
            ],
        ];

        foreach ($posts as $post) {
            $category = Category::where('slug', $post['category'])->first();
            Post::updateOrCreate(
                ['slug' => $post['slug']],
                [
                    'category_id' => $category?->id,
                    'title' => $post['title'],
                    'excerpt' => $post['excerpt'],
                    'content' => $post['content'],
                    'cover_image' => $post['cover'],
                    'featured' => false,
                    'published_at' => $post['published_at'],
                ],
            );
        }
    }
}
