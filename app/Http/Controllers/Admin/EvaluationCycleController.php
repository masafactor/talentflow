<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EvaluationCycle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EvaluationCycleController extends Controller
{
    public function index(): Response
    {
        $evaluationCycles = EvaluationCycle::query()
            ->orderByDesc('start_date')
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Admin/EvaluationCycles/Index', [
            'evaluationCycles' => $evaluationCycles,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/EvaluationCycles/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'status' => ['required', 'in:draft,open,closed'],
            'description' => ['nullable', 'string'],
        ]);

        $validated['description'] = $validated['description'] ?: null;

        EvaluationCycle::create($validated);

        return redirect()
            ->route('admin.evaluation-cycles.index')
            ->with('success', '評価期間を登録しました。');
    }

    public function edit(EvaluationCycle $evaluationCycle): Response
    {
        return Inertia::render('Admin/EvaluationCycles/Edit', [
            'evaluationCycle' => $evaluationCycle,
        ]);
    }

    public function update(Request $request, EvaluationCycle $evaluationCycle): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'status' => ['required', 'in:draft,open,closed'],
            'description' => ['nullable', 'string'],
        ]);

        $validated['description'] = $validated['description'] ?: null;

        $evaluationCycle->update($validated);

        return redirect()
            ->route('admin.evaluation-cycles.index')
            ->with('success', '評価期間を更新しました。');
    }
}