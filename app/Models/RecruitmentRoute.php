<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecruitmentRoute extends Model
{
    protected $fillable = [
        'name',
        'type',
        'display_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
