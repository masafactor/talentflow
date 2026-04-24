<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationCycle extends Model
{
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'status',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }
}