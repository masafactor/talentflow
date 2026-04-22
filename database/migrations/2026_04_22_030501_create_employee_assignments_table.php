<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employee_assignments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('employee_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('department_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('position_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('employment_type_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->date('start_date');
            $table->date('end_date')->nullable();

            $table->string('change_reason')->nullable();
            $table->text('note')->nullable();

            $table->foreignId('changed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee_assignments');
    }
};