<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $faqs = DB::table('faqs')->orderBy('id')->get();
        $seen = [];
        $idsToDelete = [];

        foreach ($faqs as $faq) {
            $question = json_decode($faq->question, true);
            $key = is_array($question) ? ($question['en'] ?? '') : (string) $faq->question;

            if ($key === '') {
                continue;
            }

            if (in_array($key, $seen, true)) {
                $idsToDelete[] = $faq->id;
            } else {
                $seen[] = $key;
            }
        }

        if (! empty($idsToDelete)) {
            DB::table('faqs')->whereIn('id', $idsToDelete)->delete();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // irreversible cleanup
    }
};
