<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationTemplate extends Model
{
    protected $fillable = [
        'name',
        'description',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function items()
    {
        return $this->hasMany(EvaluationTemplateItem::class)->orderBy('sort_order');
    }
}