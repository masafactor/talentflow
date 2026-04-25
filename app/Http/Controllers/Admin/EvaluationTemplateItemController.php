<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EvaluationTemplate;
use App\Models\EvaluationTemplateItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EvaluationTemplateItemController extends Controller
{
    public function index(EvaluationTemplate $evaluationTemplate): Response
    {
        $items = $evaluationTemplate->items()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/EvaluationTemplateItems/Index', [
            'evaluationTemplate' => $evaluationTemplate,
            'items' => $items,
        ]);
    }

    public function create(EvaluationTemplate $evaluationTemplate): Response
    {
        return Inertia::render('Admin/EvaluationTemplateItems/Create', [
            'evaluationTemplate' => $evaluationTemplate,
        ]);
    }

    public function store(Request $request, EvaluationTemplate $evaluationTemplate): RedirectResponse
    {
        $validated = $request->validate([
            'category' => ['nullable', 'string', 'max:255'],
            'question' => ['required', 'string', 'max:255'],
            'input_type' => ['required', 'in:score,text'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_required' => ['required', 'boolean'],
        ]);

        $validated['category'] = $validated['category'] ?: null;

        $evaluationTemplate->items()->create($validated);

        return redirect()
            ->route('admin.evaluation-templates.items.index', $evaluationTemplate)
            ->with('success', '評価設問を登録しました。');
    }

    public function edit(EvaluationTemplate $evaluationTemplate, EvaluationTemplateItem $item): Response
    {
        if ($item->evaluation_template_id !== $evaluationTemplate->id) {
            abort(404);
        }

        return Inertia::render('Admin/EvaluationTemplateItems/Edit', [
            'evaluationTemplate' => $evaluationTemplate,
            'item' => $item,
        ]);
    }

    public function update(Request $request, EvaluationTemplate $evaluationTemplate, EvaluationTemplateItem $item): RedirectResponse
    {
        if ($item->evaluation_template_id !== $evaluationTemplate->id) {
            abort(404);
        }

        $validated = $request->validate([
            'category' => ['nullable', 'string', 'max:255'],
            'question' => ['required', 'string', 'max:255'],
            'input_type' => ['required', 'in:score,text'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_required' => ['required', 'boolean'],
        ]);

        $validated['category'] = $validated['category'] ?: null;

        $item->update($validated);

        return redirect()
            ->route('admin.evaluation-templates.items.index', $evaluationTemplate)
            ->with('success', '評価設問を更新しました。');
    }
}