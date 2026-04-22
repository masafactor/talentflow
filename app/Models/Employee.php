<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'user_id',
        'department_id',
        'position_id',
        'employment_type_id',
        'employee_number',
        'last_name',
        'first_name',
        'last_name_kana',
        'first_name_kana',
        'email',
        'phone',
        'joined_on',
        'retired_on',
        'status',
        'note',
    ];

    protected function casts(): array
    {
        return [
            'joined_on' => 'date',
            'retired_on' => 'date',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function employmentType()
    {
        return $this->belongsTo(EmploymentType::class);
    }

    public function referredApplications()
    {
        return $this->hasMany(Application::class, 'referrer_employee_id');
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->last_name} {$this->first_name}";
    }

    public function assignments()
    {
        return $this->hasMany(EmployeeAssignment::class);
    }
}
