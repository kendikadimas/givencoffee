<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->json('name');
            $table->json('subtitle')->nullable();
            $table->json('story')->nullable();
            $table->json('specs')->nullable();
            $table->json('cupping')->nullable();
            $table->json('packaging')->nullable();
            $table->json('images')->nullable();
            $table->string('spec_pdf')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
