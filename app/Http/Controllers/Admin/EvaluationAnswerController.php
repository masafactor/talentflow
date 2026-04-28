<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use App\Models\EvaluationAnswer;
use App\Models\EvaluationReviewer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EvaluationAnswerController extends Controller
{
    public function edit(Evaluation $evaluation, EvaluationReviewer $reviewer): Response
    {
        if ($reviewer->evaluation_id !== $evaluation->id) {
            abort(404);
        }

        $evaluation->load([
            'cycle',
            'employee',
            'template.items',
        ]);

        $reviewer->load([
            'reviewerEmployee',
            'answers',
        ]);

        $existingAnswers = $reviewer->answers
            ->keyBy('evaluation_template_item_id')
            ->map(function ($answer) {
                return [
                    'score_value' => $answer->score_value,
                    'text_value' => $answer->text_value,
                ];
            });

        return Inertia::render('Admin/EvaluationAnswers/Edit', [
            'evaluation' => $evaluation,
            'reviewer' => $reviewer,
            'existingAnswers' => $existingAnswers,
        ]);
    }

    public function update(Request $request, Evaluation $evaluation, EvaluationReviewer $reviewer): RedirectResponse
    {
        if ($reviewer->evaluation_id !== $evaluation->id) {
            abort(404);
        }

        $evaluation->load([
            'template.items',
        ]);

        $validated = $request->validate([
            'answers' => ['required', 'array'],
        ]);

        foreach ($evaluation->template->items as $item) {
            $answerData = $validated['answers'][$item->id] ?? [];

            $scoreValue = null;
            $textValue = null;

            if ($item->input_type === 'score') {
                $scoreValue = $answerData['score_value'] ?? null;

                if ($item->is_required && ($scoreValue === null || $scoreValue === '')) {
                    return back()->withErrors([
                        "answers.{$item->id}.score_value" => 'この設問は必須です。',
                    ]);
                }

                if ($scoreValue !== null && $scoreValue !== '') {
                    if (!in_array((int) $scoreValue, [1, 2, 3, 4, 5], true)) {
                        return back()->withErrors([
                            "answers.{$item->id}.score_value" => '点数は1〜5で入力してください。',
                        ]);
                    }
                    $scoreValue = (int) $scoreValue;
                } else {
                    $scoreValue = null;
                }
            }

            if ($item->input_type === 'text') {
                $textValue = $answerData['text_value'] ?? null;

                if ($item->is_required && blank($textValue)) {
                    return back()->withErrors([
                        "answers.{$item->id}.text_value" => 'この設問は必須です。',
                    ]);
                }

                $textValue = filled($textValue) ? $textValue : null;
            }

            EvaluationAnswer::updateOrCreate(
                [
                    'evaluation_reviewer_id' => $reviewer->id,
                    'evaluation_template_item_id' => $item->id,
                ],
                [
                    'score_value' => $scoreValue,
                    'text_value' => $textValue,
                ]
            );
        }

        $reviewer->update([
            'status' => 'submitted',
            'submitted_at' => now(),
        ]);

        $allSubmitted = $evaluation->reviewers()
            ->where('status', '!=', 'submitted')
            ->doesntExist();

        if ($allSubmitted) {
            $evaluation->update([
                'status' => 'completed',
            ]);
        } else {
            if ($evaluation->status === 'draft') {
                $evaluation->update([
                    'status' => 'in_progress',
                ]);
            }
        }

        return redirect()
            ->route('admin.evaluations.reviewers.index', $evaluation)
            ->with('success', '評価回答を保存しました。');
    }
}