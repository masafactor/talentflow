<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EvaluationTemplate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EvaluationTemplateController extends Controller
{
    public function index(): Response
    {
        $evaluationTemplates = EvaluationTemplate::query()
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Admin/EvaluationTemplates/Index', [
            'evaluationTemplates' => $evaluationTemplates,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/EvaluationTemplates/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
        ]);

        $validated['description'] = $validated['description'] ?: null;

        EvaluationTemplate::create($validated);

        return redirect()
            ->route('admin.evaluation-templates.index')
            ->with('success', '評価テンプレートを登録しました。');
    }

    public function edit(EvaluationTemplate $evaluationTemplate): Response
    {
        return Inertia::render('Admin/EvaluationTemplates/Edit', [
            'evaluationTemplate' => $evaluationTemplate,
        ]);
    }

    public function update(Request $request, EvaluationTemplate $evaluationTemplate): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
        ]);

        $validated['description'] = $validated['description'] ?: null;

        $evaluationTemplate->update($validated);

        return redirect()
            ->route('admin.evaluation-templates.index')
            ->with('success', '評価テンプレートを更新しました。');
    }
}