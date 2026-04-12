<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPosting extends Model
{
    protected $fillable = [
        'department_id',
        'employment_type_id',
        'title',
        'description',
        'number_of_positions',
        'status',
        'opened_on',
        'closed_on',
    ];

    protected function casts(): array
    {
        return [
            'opened_on' => 'date',
            'closed_on' => 'date',
        ];
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function employmentType()
    {
        return $this->belongsTo(EmploymentType::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
