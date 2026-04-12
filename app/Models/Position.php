<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $fillable = [
        'name',
        'is_manager',
        'display_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_manager' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
