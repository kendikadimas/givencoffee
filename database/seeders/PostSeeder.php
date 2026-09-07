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
            [
                'slug' => 'from-cherry-to-container',
                'category' => 'process',
                'cover' => '/images/real/cherry.jpg',
                'title' => ['en' => 'From cherry to container', 'id' => 'Dari ceri hingga kontainer'],
                'excerpt' => ['en' => 'Follow one export lot through every stage: picking, fermenting, drying, milling, and loading the container.', 'id' => 'Ikuti satu lot ekspor melalui setiap tahap: petik, fermentasi, jemur, miling, hingga muat kontainer.'],
                'content' => [
                    $this->content('p', 'Every export lot we ship follows the same path. No shortcuts, no mixing with unknown sources. Here is what happens between the farm and the port.', 'Setiap lot ekspor yang kami kirim menempuh jalur yang sama. Tanpa jalan pintas, tanpa campuran dari sumber yang tidak dikenal. Inilah yang terjadi antara kebun dan pelabuhan.'),
                    $this->content('h2', 'Picking and fermentation', 'Petik dan fermentasi'),
                    $this->content('p', 'Farmers pick only fully red cherries, usually in several passes over the same trees. Same-day pulping and overnight fermentation clean the mucilage and set up the classic Lintong cup.', 'Petani memetik hanya ceri yang benar-benar merah, biasanya dalam beberapa tahap di pohon yang sama. Pengupasan di hari yang sama dan fermentasi semalam membersihkan lendir dan membentuk cangkir khas Lintong.'),
                    $this->content('h2', 'Drying and wet hulling', 'Pengeringan dan giling basah'),
                    $this->content('p', 'Beans dry on raised patios until 30–40% moisture, then are hulled while still soft. After wet hulling, they finish drying on tarps until they reach the shipping target of 10.5–11.5%.', 'Biji dijemur di drying bed hingga kadar air 30–40%, lalu digiling saat masih lembut. Setelah giling basah, pengeringan dilanjutkan di terpal hingga mencapai target kirim 10,5–11,5%.'),
                    $this->content('h2', 'Milling and loading', 'Miling dan pemuatan'),
                    $this->content('p', 'At the warehouse, beans pass through grading screens and hand sorting before being packed in 60kg jute bags with GrainPro liners. The container is lined, sealed, and documented — and the lot identity travels with it.', 'Di gudang, biji melewati grading screen dan sortasi tangan sebelum dikemas dalam kantong jute 60kg dengan liner GrainPro. Kontainer dilapisi, disegel, dan didokumentasikan — identitas lot terus mengikutinya.'),
                ],
                'published_at' => now()->subDays(5),
            ],
            [
                'slug' => 'lake-toba-volcanic-terroir',
                'category' => 'origin',
                'cover' => '/images/real/Geopark_Caldera_Toba.jpg',
                'title' => ['en' => 'The volcanic terroir of Lake Toba', 'id' => 'Terroir vulkanik Danau Toba'],
                'excerpt' => ['en' => 'Seventy-four thousand years ago, a supervolcano erupted and left behind the most fertile coffee soil in Indonesia.', 'id' => 'Tujuh puluh empat ribu tahun lalu, supervulkan meletus dan meninggalkan tanah kopi paling subur di Indonesia.'],
                'content' => [
                    $this->content('p', 'Lake Toba is not just the largest volcanic lake on earth — it is the reason coffee from this region tastes the way it does. The caldera sits on ash deposits rich in minerals that feed the coffee trees.', 'Danau Toba bukan sekadar danau vulkanik terbesar di dunia — dialah alasan kopi dari wilayah ini terasa seperti sekarang. Kaldera berada di atas endapan abu kaya mineral yang menyubuti pohon kopi.'),
                    $this->content('h2', 'Why altitude matters', 'Mengapa ketinggian penting'),
                    $this->content('p', 'Our partner farms sit at 1,300–1,600 MASL. Cool nights slow down cherry maturation, letting sugars develop fully. The result is denser beans and a sweeter, more complex cup.', 'Kebun mitra kami berada di 1.300–1.600 MDPL. Malam yang dingin memperlambat kematangan ceri, memungkinkan gula berkembang sempurna. Hasilnya biji lebih padat dan cangkir lebih manis dan kompleks.'),
                    $this->content('h2', 'The Lintong signature', 'Ciri khas Lintong'),
                    $this->content('p', 'This combination of volcanic soil, altitude, and the giling basah process produces the profile Lintong is known for: cedar and dark chocolate, herbal complexity, and a heavy, syrupy body with low acidity.', 'Kombinasi tanah vulkanik, ketinggian, dan proses giling basah ini menghasilkan profil yang membuat Lintong terkenal: cedar dan dark chocolate, kompleksitas herbal, serta body pekat seperti sirup dengan keasaman rendah.'),
                ],
                'published_at' => now()->subDays(7),
            ],
            [
                'slug' => 'lintong-nihuta-doloksanggul-terroir',
                'category' => 'origin',
                'cover' => '/images/add/sorting.jpg',
                'title' => ['en' => 'Lintong Nihuta & Doloksanggul: two names, one cup', 'id' => 'Lintong Nihuta & Doloksanggul: dua nama, satu cangkir'],
                'excerpt' => ['en' => 'What is the difference between Lintong Nihuta and Doloksanggul? Short answer: very little — and that is the point.', 'id' => 'Apa bedanya Lintong Nihuta dan Doloksanggul? Jawaban singkat: hampir tidak ada — dan itu justru intinya.'],
                'content' => [
                    $this->content('p', 'Buyers often ask about the difference between the two names. Lintong Nihuta is the sub-district that gave its name to the coffee type; Doloksanggul is the town in Humbang Hasundutan where our partner farms actually grow it.', 'Pembeli sering bertanya tentang perbedaan kedua nama ini. Lintong Nihuta adalah kecamatan yang memberi nama pada tipe kopi ini; Doloksanggul adalah kota di Humbang Hasundutan tempat kebun mitra kami tumbuh.'),
                    $this->content('h2', 'One variety, several farms', 'Satu varietas, beberapa kebun'),
                    $this->content('p', 'Our lots combine harvests from several smallholder farms growing the same Ateng and Jember varieties under the same conditions. Combining them is what makes the profile consistent from container to container.', 'Lot kami menggabungkan panen dari beberapa kebun petani kecil yang menanam varietas Ateng dan Jember yang sama dalam kondisi yang sama. Penggabungan inilah yang membuat profil tetap konsisten antar kontainer.'),
                    $this->content('h2', 'Full traceability, on request', 'Keterlacakan penuh, atas permintaan'),
                    $this->content('p', 'For every lot we can document the farms, the drying dates, and the cupping results. If your roastery needs a full provenance report before buying, just ask — it ships with the samples.', 'Untuk setiap lot kami dapat mendokumentasikan kebun, tanggal pengeringan, dan hasil cupping. Jika roastery Anda butuh laporan asal-usul lengkap sebelum membeli, tinggal minta — dikirim bersama sampel.'),
                ],
                'published_at' => now()->subDays(12),
            ],
            [
                'slug' => 'why-moisture-content-matters',
                'category' => 'process',
                'cover' => '/images/add/sun-drying.jpg',
                'title' => ['en' => 'Why moisture content makes or breaks a lot', 'id' => 'Mengapa kadar air menentukan nasib sebuah lot'],
                'excerpt' => ['en' => 'The single number that decides whether your green beans arrive bright and fresh — or moldy and stale.', 'id' => 'Satu angka yang menentukan apakah green bean Anda tiba cerah dan segar — atau berjamur dan basi.'],
                'content' => [
                    $this->content('p', 'Moisture content is the most important number on any green coffee spec sheet, and the one buyers most often forget to verify. It affects everything that happens between the drying patio and your roaster.', 'Kadar air adalah angka terpenting di spec sheet green coffee, dan yang paling sering lupa diverifikasi pembeli. Angka ini memengaruhi semua yang terjadi antara terpal pengeringan dan roaster Anda.'),
                    $this->content('h2', 'The shipping window', 'Jendela kadar air kirim'),
                    $this->content('p', 'Green coffee ships safely at 10.5–11.5%. Above 12%, mold and ochratoxin become real risks during ocean transit. Below 10%, the beans lose their green color and cup flat, past-crop.', 'Green coffee dikirim dengan aman pada 10,5–11,5%. Di atas 12%, jamur dan okratoksin menjadi risiko nyata selama pelayaran. Di bawah 10%, biji kehilangan warna hijaunya dan terasa flat, past-crop.'),
                    $this->content('h2', 'How we control it', 'Bagaimana kami mengontrolnya'),
                    $this->content('p', 'Every drying batch is measured daily with calibrated moisture meters. Lots are only milled and packed once they stabilize inside the window — and every bag gets a liner to protect it from humidity swings at sea.', 'Setiap batch pengeringan diukur harian dengan moisture meter terkalibrasi. Lot baru dimiling dan dikemas setelah stabil dalam jendela tersebut — dan setiap kantong mendapat liner untuk melindungi dari perubahan kelembapan di laut.'),
                ],
                'published_at' => now()->subDays(14),
            ],
            [
                'slug' => 'how-to-store-green-coffee',
                'category' => 'market',
                'cover' => '/images/add/warehouse-1.jpg',
                'title' => ['en' => 'How to store green coffee (and keep it fresh)', 'id' => 'Cara menyimpan green coffee (agar tetap segar)'],
                'excerpt' => ['en' => 'Green beans are living, breathing cargo. Five rules that keep them roasting well months after arrival.', 'id' => 'Green bean adalah kargo yang hidup dan bernapas. Lima aturan agar tetap bagus diroasting berbulan-bulan setelah tiba.'],
                'content' => [
                    $this->content('p', 'Green coffee does not expire quickly, but it does age. Stored badly, a beautiful 86-point lot can cup like a commercial blend within months. The good news: proper storage is mostly common sense.', 'Green coffee tidak cepat kedaluwarsa, tapi menua. Disimpan buruk, lot indah bernilai 86 poin bisa terasa seperti kopi komersial dalam beberapa bulan. Kabar baiknya: penyimpanan yang benar sebagian besar hanya masalah akal sehat.'),
                    $this->content('h2', 'The five rules', 'Lima aturannya'),
                    $this->content('p', 'Keep beans below 25°C and away from direct sun. Keep relative humidity under 70% and the floor dry — never store bags directly on concrete. Keep the warehouse ventilated but sealed against rain. Rotate stock: roast the oldest bags first. And once the GrainPro liner is opened, re-seal it tightly.', 'Jaga suhu di bawah 25°C dan jauhkan dari sinar matahari langsung. Jaga kelembapan relatif di bawah 70% dan lantai tetap kering — jangan pernah meletakkan kantong langsung di beton. Pastikan gudang berventilasi namun tertutup dari hujan. Putar stok: roasting kantong tertua lebih dulu. Dan begitu liner GrainPro dibuka, tutup kembali dengan rapat.'),
                    $this->content('h2', 'How long does it last?', 'Berapa lama masa simpannya?'),
                    $this->content('p', 'In hermetic liners, our lots hold their cup profile for 12 months or more. Off the liner, expect meaningful fading after 4–6 months in tropical conditions. Always ask how your beans were packed before the container left origin.', 'Dalam liner hermetik, lot kami menjaga profil cangkirnya selama 12 bulan atau lebih. Tanpa liner, penurunan rasa mulai terasa setelah 4–6 bulan di iklim tropis. Selalu tanyakan bagaimana biji Anda dikemas sebelum kontainer meninggalkan origin.'),
                ],
                'published_at' => now()->subDays(18),
            ],
            [
                'slug' => 'green-coffee-sample-shipment-guide',
                'category' => 'market',
                'cover' => '/images/real/pouchgreenbeans.jpeg',
                'title' => ['en' => 'Sampling green coffee: from 500g pouch to full container', 'id' => 'Sampling green coffee: dari kantong 500g ke kontainer penuh'],
                'excerpt' => ['en' => 'How to evaluate samples properly before committing to 19 tons. A practical workflow for roasters.', 'id' => 'Cara mengevaluasi sampel dengan benar sebelum mengambil 19 ton. Alur praktis untuk roaster.'],
                'content' => [
                    $this->content('p', 'No serious buyer commits to a container blind. Samples exist to close the distance between the farm and your cupping table — but only if you use them well.', 'Tidak ada pembeli serius yang mengambil kontainer tanpa coba dulu. Sampel ada untuk menjembatani jarak antara kebun dan meja cupping Anda — tapi hanya jika digunakan dengan benar.'),
                    $this->content('h2', 'What to ask for', 'Apa yang perlu diminta'),
                    $this->content('p', 'Ask for a 500g–1kg sample of the current lot, plus its cupping report, moisture reading, and screen analysis. A good exporter sends all four without being chased. We ship samples worldwide via DHL/FedEx, vacuum-sealed to protect freshness.', 'Minta sampel 500g–1kg dari lot terkini, beserta laporan cupping, angka kadar air, dan analisis screen. Eksportir yang baik mengirim keempatnya tanpa perlu dikejar. Kami mengirim sampel ke seluruh dunia via DHL/FedEx, disegel vakum untuk menjaga kesegaran.'),
                    $this->content('h2', 'How to cup it', 'Cara meng-cupping-nya'),
                    $this->content('p', 'Roast the sample to a light-medium profile, rest it a day, then cup against your reference coffees — not alone. Score it like any other lot and compare across at least two roast dates if the decision is big.', 'Roast sampel dengan profil light-medium, diamkan sehari, lalu cupping berdampingan dengan kopi referensi Anda — bukan sendirian. Beri skor seperti lot lainnya dan bandingkan minimal dari dua tanggal roast jika keputusannya besar.'),
                    $this->content('h2', 'From sample to contract', 'Dari sampel ke kontrak'),
                    $this->content('p', 'Once a lot passes your table, we lock the container to the same lot code the sample came from — not a newer, unverified delivery. That is the whole point of traceability.', 'Begitu lot lolos di meja Anda, kami mengunci kontainer ke kode lot yang sama dengan asal sampel — bukan kiriman baru yang belum terverifikasi. Itulah inti dari keterlacakan.'),
                ],
                'published_at' => now()->subDays(21),
            ],
            [
                'slug' => 'export-documentation-explained',
                'category' => 'market',
                'cover' => '/images/add/warehouse-stacking.jpg',
                'title' => ['en' => 'Export documentation, explained', 'id' => 'Dokumentasi ekspor, dijelaskan'],
                'excerpt' => ['en' => 'The four documents behind every Indonesian coffee shipment — and what each one actually protects you from.', 'id' => 'Empat dokumen di balik setiap kiriman kopi Indonesia — dan dari apa masing-masing melindungi Anda.'],
                'content' => [
                    $this->content('p', 'Export paperwork looks intimidating until you see that each document answers one specific question. Here are the four that matter, and what they do for you as a buyer.', 'Dokumen ekspor terlihat menakutkan sampai Anda menyadari setiap dokumen menjawab satu pertanyaan spesifik. Inilah empat yang penting, dan fungsinya bagi Anda sebagai pembeli.'),
                    $this->content('h2', 'The four documents', 'Empat dokumen itu'),
                    $this->content('p', 'The phytosanitary certificate proves the beans were inspected and are free from pests — your customs office will require it. The certificate of origin qualifies the shipment for preferential tariffs under trade agreements. The commercial invoice states the value you are paying. The packing list details bags, weights, and container numbers.', 'Sertifikat phytosanitary membuktikan biji telah diperiksa dan bebas hama — kantor kastumu akan mewajibkannya. Certificate of origin memberi akses tarif preferensi sesuai perjanjian dagang. Commercial invoice menyatakan nilai yang Anda bayar. Packing list merinci kantong, berat, dan nomor kontainer.'),
                    $this->content('h2', 'Why it matters to you', 'Mengapa ini penting bagi Anda'),
                    $this->content('p', 'Clean documentation means no demurrage fees, no customs delays, and no disputes over what shipped. We prepare and double-check every document before the container moves — because at origin, the paperwork is the product.', 'Dokumentasi rapi berarti tidak ada biaya demurrage, tidak ada penundaan kastum, dan tidak ada sengketa soal isi kiriman. Kami menyiapkan dan memeriksa ulang setiap dokumen sebelum kontainer bergerak — karena di origin, dokumennya adalah produknya.'),
                ],
                'published_at' => now()->subDays(28),
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
