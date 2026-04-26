<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Evaluation;
use App\Models\EvaluationReviewer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class EvaluationReviewerController extends Controller
{
    public function index(Evaluation $evaluation): Response
    {
        $evaluation->load([
            'cycle',
            'employee',
            'template',
        ]);

        $reviewers = $evaluation->reviewers()
            ->with('reviewerEmployee')
            ->orderBy('reviewer_type')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/EvaluationReviewers/Index', [
            'evaluation' => $evaluation,
            'reviewers' => $reviewers,
        ]);
    }

    public function create(Evaluation $evaluation): Response
    {
        $evaluation->load([
            'cycle',
            'employee',
            'template',
        ]);

        return Inertia::render('Admin/EvaluationReviewers/Create', [
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
            'reviewer_employee_id' => [
                'required',
                'exists:employees,id',
                Rule::unique('evaluation_reviewers')->where(function ($query) use ($evaluation) {
                    return $query->where('evaluation_id', $evaluation->id);
                }),
            ],
            'reviewer_type' => ['required', 'in:manager,peer,subordinate,self'],
            'status' => ['required', 'in:pending,submitted'],
        ], [
            'reviewer_employee_id.unique' => 'この評価者は既に登録されています。',
        ]);

        $evaluation->reviewers()->create($validated);

        return redirect()
            ->route('admin.evaluations.reviewers.index', $evaluation)
            ->with('success', '評価者を登録しました。');
    }

    public function edit(Evaluation $evaluation, EvaluationReviewer $reviewer): Response
    {
        if ($reviewer->evaluation_id !== $evaluation->id) {
            abort(404);
        }

        $evaluation->load([
            'cycle',
            'employee',
            'template',
        ]);

        return Inertia::render('Admin/EvaluationReviewers/Edit', [
            'evaluation' => $evaluation,
            'reviewer' => $reviewer,
            'employees' => Employee::query()
                ->where('status', 'active')
                ->orderBy('employee_number')
                ->orderBy('id')
                ->get(['id', 'employee_number', 'last_name', 'first_name']),
        ]);
    }

    public function update(Request $request, Evaluation $evaluation, EvaluationReviewer $reviewer): RedirectResponse
    {
        if ($reviewer->evaluation_id !== $evaluation->id) {
            abort(404);
        }

        $validated = $request->validate([
            'reviewer_employee_id' => [
                'required',
                'exists:employees,id',
                Rule::unique('evaluation_reviewers')
                    ->where(function ($query) use ($evaluation) {
                        return $query->where('evaluation_id', $evaluation->id);
                    })
                    ->ignore($reviewer->id),
            ],
            'reviewer_type' => ['required', 'in:manager,peer,subordinate,self'],
            'status' => ['required', 'in:pending,submitted'],
        ], [
            'reviewer_employee_id.unique' => 'この評価者は既に登録されています。',
        ]);

        $reviewer->update($validated);

        return redirect()
            ->route('admin.evaluations.reviewers.index', $evaluation)
            ->with('success', '評価者を更新しました。');
    }
}