<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluation_reviewers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('evaluation_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('reviewer_employee_id')
                ->constrained('employees')
                ->cascadeOnDelete();

            $table->enum('reviewer_type', ['manager', 'peer', 'subordinate', 'self']);
            $table->enum('status', ['pending', 'submitted'])->default('pending');
            $table->timestamp('submitted_at')->nullable();

            $table->timestamps();

            $table->unique(['evaluation_id', 'reviewer_employee_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluation_reviewers');
    }
};