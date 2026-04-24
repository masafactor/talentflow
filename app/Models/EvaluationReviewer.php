<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationReviewer extends Model
{
    protected $fillable = [
        'evaluation_id',
        'reviewer_employee_id',
        'reviewer_type',
        'status',
        'submitted_at',
    ];

    protected function casts(): array
    {
        return [
            'submitted_at' => 'datetime',
        ];
    }

    public function evaluation()
    {
        return $this->belongsTo(Evaluation::class);
    }

    public function reviewerEmployee()
    {
        return $this->belongsTo(Employee::class, 'reviewer_employee_id');
    }

    public function answers()
    {
        return $this->hasMany(EvaluationAnswer::class);
    }
}