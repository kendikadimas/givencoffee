<?php

use Database\Seeders\TestimonialSeeder;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Re-align old un-arrayed records if present
        $testimonials = DB::table('testimonials')->get();

        foreach ($testimonials as $t) {
            $name = json_decode($t->name, true);
            if (! is_array($name)) {
                DB::table('testimonials')->where('id', $t->id)->update([
                    'name' => json_encode(['en' => $t->name, 'id' => $t->name]),
                    'role' => json_encode(['en' => $t->role ?? '', 'id' => $t->role ?? '']),
                ]);
            }
        }

        $seeder = new TestimonialSeeder;
        $seeder->run();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
