<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    protected $fillable = [
        'evaluation_cycle_id',
        'employee_id',
        'evaluation_template_id',
        'status',
        'overall_comment',
        'created_by',
    ];

    public function cycle()
    {
        return $this->belongsTo(EvaluationCycle::class, 'evaluation_cycle_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function template()
    {
        return $this->belongsTo(EvaluationTemplate::class, 'evaluation_template_id');
    }

    public function reviewers()
    {
        return $this->hasMany(EvaluationReviewer::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function feedbacks()
    {
        return $this->hasMany(EvaluationFeedback::class)->orderByDesc('feedback_date')->orderByDesc('id');
    }
}