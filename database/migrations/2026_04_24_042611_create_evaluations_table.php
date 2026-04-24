<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('evaluation_cycle_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('employee_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('evaluation_template_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->enum('status', ['draft', 'in_progress', 'completed'])->default('draft');
            $table->text('overall_comment')->nullable();

            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();

            $table->unique(['evaluation_cycle_id', 'employee_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};