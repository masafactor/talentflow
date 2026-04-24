<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationTemplateItem extends Model
{
    protected $fillable = [
        'evaluation_template_id',
        'category',
        'question',
        'input_type',
        'sort_order',
        'is_required',
    ];

    protected function casts(): array
    {
        return [
            'is_required' => 'boolean',
        ];
    }

    public function template()
    {
        return $this->belongsTo(EvaluationTemplate::class, 'evaluation_template_id');
    }
}