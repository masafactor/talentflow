<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Evaluation;
use App\Models\EvaluationFeedback;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EvaluationFeedbackController extends Controller
{
    public function index(Evaluation $evaluation): Response
    {
        $evaluation->load([
            'cycle',
            'employee',
            'template',
        ]);

        $feedbacks = $evaluation->feedbacks()
            ->with('feedbackerEmployee')
            ->get();

        return Inertia::render('Admin/EvaluationFeedbacks/Index', [
            'evaluation' => $evaluation,
            'feedbacks' => $feedbacks,
        ]);
    }

    public function create(Evaluation $evaluation): Response
    {
        $evaluation->load([
            'cycle',
            'employee',
            'template',
        ]);

        return Inertia::render('Admin/EvaluationFeedbacks/Create', [
            'evaluation' => $evaluation,
            'employees' => Employee::query()
                ->where('status', 'active')
                ->orderBy('employee_number')
                ->orderBy('id')
                ->get(['id', 'employee_number', 'last_name', 'first_name']),
        ]);
    }

    public function store(Request $request, Evaluation $evaluation): RedirectResponse
    {
        $validated = $request->validate([
            'feedback_date' => ['required', 'date'],
            'feedbacker_employee_id' => ['nullable', 'exists:employees,id'],
            'summary' => ['nullable', 'string'],
            'strengths' => ['nullable', 'string'],
            'improvement_points' => ['nullable', 'string'],
            'next_goals' => ['nullable', 'string'],
            'note' => ['nullable', 'string'],
        ]);

        $validated['feedbacker_employee_id'] = $validated['feedbacker_employee_id'] ?: null;
        $validated['summary'] = $validated['summary'] ?: null;
        $validated['strengths'] = $validated['strengths'] ?: null;
        $validated['improvement_points'] = $validated['improvement_points'] ?: null;
        $validated['next_goals'] = $validated['next_goals'] ?: null;
        $validated['note'] = $validated['note'] ?: null;
        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;

        $evaluation->feedbacks()->create($validated);

        return redirect()
            ->route('admin.evaluations.feedbacks.index', $evaluation)
            ->with('success', 'フィードバック記録を登録しました。');
    }

    public function edit(Evaluation $evaluation, EvaluationFeedback $feedback): Response
    {
        if ($feedback->evaluation_id !== $evaluation->id) {
            abort(404);
        }

        $evaluation->load([
            'cycle',
            'employee',
            'template',
        ]);

        return Inertia::render('Admin/EvaluationFeedbacks/Edit', [
            'evaluation' => $evaluation,
            'feedback' => $feedback,
            'employees' => Employee::query()
                ->where('status', 'active')
                ->orderBy('employee_number')
                ->orderBy('id')
                ->get(['id', 'employee_number', 'last_name', 'first_name']),
        ]);
    }

    public function update(Request $request, Evaluation $evaluation, EvaluationFeedback $feedback): RedirectResponse
    {
        if ($feedback->evaluation_id !== $evaluation->id) {
            abort(404);
        }

        $validated = $request->validate([
            'feedback_date' => ['required', 'date'],
            'feedbacker_employee_id' => ['nullable', 'exists:employees,id'],
            'summary' => ['nullable', 'string'],
            'strengths' => ['nullable', 'string'],
            'improvement_points' => ['nullable', 'string'],
            'next_goals' => ['nullable', 'string'],
            'note' => ['nullable', 'string'],
        ]);

        $validated['feedbacker_employee_id'] = $validated['feedbacker_employee_id'] ?: null;
        $validated['summary'] = $validated['summary'] ?: null;
        $validated['strengths'] = $validated['strengths'] ?: null;
        $validated['improvement_points'] = $validated['improvement_points'] ?: null;
        $validated['next_goals'] = $validated['next_goals'] ?: null;
        $validated['note'] = $validated['note'] ?: null;
        $validated['updated_by'] = $request->user()->id;

        $feedback->update($validated);

        return redirect()
            ->route('admin.evaluations.feedbacks.index', $evaluation)
            ->with('success', 'フィードバック記録を更新しました。');
    }
}