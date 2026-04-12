<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $fillable = [
        'code',
        'name',
        'display_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function jobPostings()
    {
        return $this->hasMany(JobPosting::class);
    }
}
