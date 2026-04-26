<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Evaluation;
use App\Models\EvaluationCycle;
use App\Models\EvaluationTemplate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EvaluationController extends Controller
{
    public function index(): Response
    {
        $evaluations = Evaluation::query()
            ->with([
                'cycle',
                'employee',
                'template',
            ])
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Admin/Evaluations/Index', [
            'evaluations' => $evaluations,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Evaluations/Create', [
            'evaluationCycles' => EvaluationCycle::query()
                ->orderByDesc('start_date')
                ->orderByDesc('id')
                ->get(['id', 'name', 'status']),
            'employees' => Employee::query()
                ->where('status', 'active')
                ->orderBy('employee_number')
                ->orderBy('id')
                ->get(['id', 'employee_number', 'last_name', 'first_name']),
            'evaluationTemplates' => EvaluationTemplate::query()
                ->where('is_active', true)
                ->orderByDesc('id')
                ->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'evaluation_cycle_id' => ['required', 'exists:evaluation_cycles,id'],
            'employee_id' => ['required', 'exists:employees,id'],
            'evaluation_template_id' => ['required', 'exists:evaluation_templates,id'],
            'status' => ['required', 'in:draft,in_progress,completed'],
            'overall_comment' => ['nullable', 'string'],
        ]);

        $validated['overall_comment'] = $validated['overall_comment'] ?: null;
        $validated['created_by'] = $request->user()->id;

        Evaluation::create($validated);

        return redirect()
            ->route('admin.evaluations.index')
            ->with('success', '評価設定を登録しました。');
    }

    public function edit(Evaluation $evaluation): Response
    {
        return Inertia::render('Admin/Evaluations/Edit', [
            'evaluation' => $evaluation,
            'evaluationCycles' => EvaluationCycle::query()
                ->orderByDesc('start_date')
                ->orderByDesc('id')
                ->get(['id', 'name', 'status']),
            'employees' => Employee::query()
                ->where('status', 'active')
                ->orderBy('employee_number')
                ->orderBy('id')
                ->get(['id', 'employee_number', 'last_name', 'first_name']),
            'evaluationTemplates' => EvaluationTemplate::query()
                ->where('is_active', true)
                ->orderByDesc('id')
                ->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Evaluation $evaluation): RedirectResponse
    {
        $validated = $request->validate([
            'evaluation_cycle_id' => ['required', 'exists:evaluation_cycles,id'],
            'employee_id' => ['required', 'exists:employees,id'],
            'evaluation_template_id' => ['required', 'exists:evaluation_templates,id'],
            'status' => ['required', 'in:draft,in_progress,completed'],
            'overall_comment' => ['nullable', 'string'],
        ]);

        $validated['overall_comment'] = $validated['overall_comment'] ?: null;

        $evaluation->update($validated);

        return redirect()
            ->route('admin.evaluations.index')
            ->with('success', '評価設定を更新しました。');
    }
}