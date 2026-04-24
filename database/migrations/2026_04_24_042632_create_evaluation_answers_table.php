<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
       
        Schema::create('evaluation_answers', function (Blueprint $table) {
        $table->id();

        $table->foreignId('evaluation_reviewer_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->foreignId('evaluation_template_item_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->unsignedTinyInteger('score_value')->nullable();
        $table->text('text_value')->nullable();

        $table->timestamps();

        $table->unique(
            ['evaluation_reviewer_id', 'evaluation_template_item_id'],
            'eval_answers_reviewer_item_unique'
        );
});
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluation_answers');
    }
};