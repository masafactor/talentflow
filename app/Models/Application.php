<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'candidate_id',
        'job_posting_id',
        'recruitment_route_id',
        'referrer_employee_id',
        'connection_name',
        'relationship_note',
        'is_incentive_target',
        'status',
        'applied_on',
        'note',
    ];

    protected function casts(): array
    {
        return [
            'is_incentive_target' => 'boolean',
            'applied_on' => 'date',
        ];
    }

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    public function jobPosting()
    {
        return $this->belongsTo(JobPosting::class);
    }

    public function recruitmentRoute()
    {
        return $this->belongsTo(RecruitmentRoute::class);
    }

    public function referrerEmployee()
    {
        return $this->belongsTo(Employee::class, 'referrer_employee_id');
    }

    public function statusHistories()
    {
        return $this->hasMany(ApplicationStatusHistory::class);
    }
}
