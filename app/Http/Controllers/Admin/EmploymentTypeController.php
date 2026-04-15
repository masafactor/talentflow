<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EmploymentType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmploymentTypeController extends Controller
{
    public function index(): Response
    {
        $employmentTypes = EmploymentType::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/EmploymentTypes/Index', [
            'employmentTypes' => $employmentTypes,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/EmploymentTypes/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'display_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        EmploymentType::create($validated);

        return redirect()
            ->route('admin.employment-types.index')
            ->with('success', '雇用形態を登録しました。');
    }

    public function edit(EmploymentType $employmentType): Response
    {
        return Inertia::render('Admin/EmploymentTypes/Edit', [
            'employmentType' => $employmentType,
        ]);
    }

    public function update(Request $request, EmploymentType $employmentType): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'display_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        $employmentType->update($validated);

        return redirect()
            ->route('admin.employment-types.index')
            ->with('success', '雇用形態を更新しました。');
    }
}