<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluation_feedback', function (Blueprint $table) {
            $table->id();

            $table->foreignId('evaluation_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->date('feedback_date');

            $table->foreignId('feedbacker_employee_id')
                ->nullable()
                ->constrained('employees')
                ->nullOnDelete();

            $table->text('summary')->nullable();
            $table->text('strengths')->nullable();
            $table->text('improvement_points')->nullable();
            $table->text('next_goals')->nullable();
            $table->text('note')->nullable();

            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignId('updated_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluation_feedback');
    }
};