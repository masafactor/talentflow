<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('application_interviews', function (Blueprint $table) {
            $table->id();

            $table->foreignId('application_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->enum('stage', [
                'document_screening',
                'first_interview',
                'second_interview',
                'final_interview',
            ]);

            $table->dateTime('interviewed_at')->nullable();

            $table->foreignId('interviewer_employee_id')
                ->nullable()
                ->constrained('employees')
                ->nullOnDelete();

            $table->enum('result', [
                'pass',
                'fail',
                'hold',
            ])->default('hold');

            $table->unsignedInteger('score')->nullable();

            $table->text('evaluation_comment')->nullable();
            $table->text('decision_reason')->nullable();
            $table->text('next_action')->nullable();

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
        Schema::dropIfExists('application_interviews');
    }
};