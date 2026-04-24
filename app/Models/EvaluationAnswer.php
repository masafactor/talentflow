<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationAnswer extends Model
{
    protected $fillable = [
        'evaluation_reviewer_id',
        'evaluation_template_item_id',
        'score_value',
        'text_value',
    ];

    protected function casts(): array
    {
        return [
            'score_value' => 'integer',
        ];
    }

    public function reviewer()
    {
        return $this->belongsTo(EvaluationReviewer::class, 'evaluation_reviewer_id');
    }

    public function templateItem()
    {
        return $this->belongsTo(EvaluationTemplateItem::class, 'evaluation_template_item_id');
    }
}