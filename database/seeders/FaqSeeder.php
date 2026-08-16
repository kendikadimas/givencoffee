<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => [
                    'en' => 'How can I request green bean samples?',
                    'id' => 'Bagaimana cara meminta sampel green bean?',
                ],
                'answer' => [
                    'en' => 'Use the inquiry form on the contact page or contact us on WhatsApp — we\'ll arrange a sample lot so you can evaluate the origin before ordering.',
                    'id' => 'Gunakan formulir inquiry di halaman kontak atau hubungi kami via WhatsApp — kami akan atur lot sampel agar Anda bisa menilai asal sebelum memesan.',
                ],
            ],
            [
                'question' => [
                    'en' => 'What are the minimum order quantities (MOQ) for LCL and FCL shipments?',
                    'id' => 'Berapa jumlah minimum pesanan (MOQ) untuk pengiriman LCL dan FCL?',
                ],
                'answer' => [
                    'en' => 'Private label orders start at 2 tonnes. For LCL and FCL quantities, tell us your market and volume and we\'ll confirm the arrangement that fits.',
                    'id' => 'Pesanan private label mulai dari 2 ton. Untuk jumlah LCL dan FCL, beri tahu pasar dan volume Anda dan kami konfirmasikan skema yang sesuai.',
                ],
            ],
            [
                'question' => [
                    'en' => 'What payment terms and Incoterms do you support (FOB, CIF, T/T, L/C)?',
                    'id' => 'Term pembayaran dan Incoterms apa saja yang didukung (FOB, CIF, T/T, L/C)?',
                ],
                'answer' => [
                    'en' => 'We support common Incoterms such as FOB and CIF, with payment terms (T/T, L/C, and others) confirmed per order.',
                    'id' => 'Kami mendukung Incoterms umum seperti FOB dan CIF, dengan term pembayaran (T/T, L/C, dan lainnya) dikonfirmasi per pesanan.',
                ],
            ],
            [
                'question' => [
                    'en' => 'Can you provide custom processing or private label roasting?',
                    'id' => 'Apakah bisa custom processing atau private label roasting?',
                ],
                'answer' => [
                    'en' => 'We specialise in green bean export. Private label packaging is available from a 2-tonne MOQ; for roasting, we can connect you with suitable partners.',
                    'id' => 'Kami berfokus pada ekspor green bean. Kemasan private label tersedia mulai MOQ 2 ton; untuk kebutuhan roasting, kami bisa menghubungkan Anda dengan mitra yang sesuai.',
                ],
            ],
            [
                'question' => [
                    'en' => 'What export documentation do you provide with each shipment?',
                    'id' => 'Dokumen ekspor apa saja yang disertakan pada setiap pengiriman?',
                ],
                'answer' => [
                    'en' => 'Each shipment ships with the required export documentation, including our NIB and Halal certificates. The full documentation list for your destination is confirmed per order.',
                    'id' => 'Setiap pengiriman disertai dokumentasi ekspor yang diperlukan, termasuk sertifikat NIB dan Halal. Daftar dokumen lengkap untuk tujuan Anda dikonfirmasi per pesanan.',
                ],
            ],
        ];

        foreach ($faqs as $i => $faq) {
            Faq::updateOrCreate(
                ['question' => $faq['question']],
                $faq + ['sort_order' => $i, 'active' => true],
            );
        }
    }
}
