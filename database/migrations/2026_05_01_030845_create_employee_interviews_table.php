<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employee_interviews', function (Blueprint $table) {
            $table->id();

            $table->foreignId('employee_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->date('interview_date');

            $table->enum('interview_type', [
                'regular',
                'one_on_one',
                'follow_up',
                'return_to_work',
                'transfer_follow_up',
                'other',
            ])->default('regular');

            $table->foreignId('interviewer_employee_id')
                ->nullable()
                ->constrained('employees')
                ->nullOnDelete();

            $table->text('summary')->nullable();
            $table->text('discussion')->nullable();
            $table->text('action_plan')->nullable();
            $table->text('next_check')->nullable();
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
        Schema::dropIfExists('employee_interviews');
    }
};