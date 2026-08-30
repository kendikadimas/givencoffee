<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->string('annual_demand')->nullable()->after('quantity');
            $table->text('shipping_address')->nullable()->after('annual_demand');
        });
    }

    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            $table->dropColumn(['phone', 'annual_demand', 'shipping_address']);
        });
    }
};
