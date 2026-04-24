<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluation_template_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('evaluation_template_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('category')->nullable();
            $table->string('question');
            $table->enum('input_type', ['score', 'text'])->default('score');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_required')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluation_template_items');
    }
};