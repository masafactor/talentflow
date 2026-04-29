<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationFeedback extends Model
{
    protected $table = 'evaluation_feedback';

    protected $fillable = [
        'evaluation_id',
        'feedback_date',
        'feedbacker_employee_id',
        'summary',
        'strengths',
        'improvement_points',
        'next_goals',
        'note',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'feedback_date' => 'date',
        ];
    }

    public function evaluation()
    {
        return $this->belongsTo(Evaluation::class);
    }

    public function feedbackerEmployee()
    {
        return $this->belongsTo(Employee::class, 'feedbacker_employee_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}