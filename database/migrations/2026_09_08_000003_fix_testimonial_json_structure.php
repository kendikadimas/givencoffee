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
        $testimonials = DB::table('testimonials')->get();

        foreach ($testimonials as $t) {
            $name = json_decode($t->name, true);
            $role = json_decode($t->role, true);

            $updates = [];

            if (! is_array($name)) {
                $updates['name'] = json_encode(['en' => (string) $t->name, 'id' => (string) $t->name]);
            }

            if (! is_array($role)) {
                $updates['role'] = json_encode(['en' => (string) $t->role, 'id' => (string) $t->role]);
            }

            if (! empty($updates)) {
                DB::table('testimonials')->where('id', $t->id)->update($updates);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
