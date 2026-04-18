<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RecruitmentRoute;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RecruitmentRouteController extends Controller
{
    public function index(): Response
    {
        $recruitmentRoutes = RecruitmentRoute::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/RecruitmentRoutes/Index', [
            'recruitmentRoutes' => $recruitmentRoutes,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/RecruitmentRoutes/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:recruitment_routes,name'],
            'type' => ['nullable', 'string', 'max:100'],
            'display_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        $validated['type'] = $validated['type'] ?: null;

        RecruitmentRoute::create($validated);

        return redirect()
            ->route('admin.recruitment-routes.index')
            ->with('success', '採用経路を登録しました。');
    }

    public function edit(RecruitmentRoute $recruitmentRoute): Response
    {
        return Inertia::render('Admin/RecruitmentRoutes/Edit', [
            'recruitmentRoute' => $recruitmentRoute,
        ]);
    }

    public function update(Request $request, RecruitmentRoute $recruitmentRoute): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:recruitment_routes,name,' . $recruitmentRoute->id],
            'type' => ['nullable', 'string', 'max:100'],
            'display_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        $validated['type'] = $validated['type'] ?: null;

        $recruitmentRoute->update($validated);

        return redirect()
            ->route('admin.recruitment-routes.index')
            ->with('success', '採用経路を更新しました。');
    }
}