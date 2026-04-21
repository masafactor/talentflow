<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApplicationInterview extends Model
{
    protected $fillable = [
        'application_id',
        'stage',
        'interviewed_at',
        'interviewer_employee_id',
        'result',
        'score',
        'evaluation_comment',
        'decision_reason',
        'next_action',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'interviewed_at' => 'datetime',
            'score' => 'integer',
        ];
    }

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function interviewerEmployee()
    {
        return $this->belongsTo(Employee::class, 'interviewer_employee_id');
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