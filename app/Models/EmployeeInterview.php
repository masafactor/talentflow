<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeInterview extends Model
{
    protected $fillable = [
        'employee_id',
        'interview_date',
        'interview_type',
        'interviewer_employee_id',
        'summary',
        'discussion',
        'action_plan',
        'next_check',
        'note',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'interview_date' => 'date',
        ];
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
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