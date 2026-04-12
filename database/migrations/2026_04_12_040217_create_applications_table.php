<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->cascadeOnDelete();
            $table->foreignId('job_posting_id')->constrained()->cascadeOnDelete();
            $table->foreignId('recruitment_route_id')->nullable()->constrained()->nullOnDelete();

            // リファラル・関係者紹介
            $table->foreignId('referrer_employee_id')->nullable()->constrained('employees')->nullOnDelete();
            $table->string('connection_name')->nullable();
            $table->string('relationship_note')->nullable();
            $table->boolean('is_incentive_target')->default(false);

            $table->enum('status', [
                'applied',
                'screening',
                'first_interview',
                'second_interview',
                'final_interview',
                'offered',
                'hired',
                'rejected',
                'declined',
            ])->default('applied');

            $table->date('applied_on');
            $table->text('note')->nullable();

            $table->timestamps();

            $table->unique(['candidate_id', 'job_posting_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
