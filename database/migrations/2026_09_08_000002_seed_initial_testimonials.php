<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Re-align old un-arrayed records if present
        $testimonials = \Illuminate\Support\Facades\DB::table('testimonials')->get();

        foreach ($testimonials as $t) {
            $name = json_decode($t->name, true);
            if (! is_array($name)) {
                \Illuminate\Support\Facades\DB::table('testimonials')->where('id', $t->id)->update([
                    'name' => json_encode(['en' => $t->name, 'id' => $t->name]),
                    'role' => json_encode(['en' => $t->role ?? '', 'id' => $t->role ?? '']),
                ]);
            }
        }

        $seeder = new \Database\Seeders\TestimonialSeeder();
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
