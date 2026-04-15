<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Position;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PositionController extends Controller
{
    public function index(): Response
    {
        $positions = Position::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/Positions/Index', [
            'positions' => $positions,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Positions/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_manager' => ['required', 'boolean'],
            'display_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        Position::create($validated);

        return redirect()
            ->route('admin.positions.index')
            ->with('success', '役職を登録しました。');
    }

    public function edit(Position $position): Response
    {
        return Inertia::render('Admin/Positions/Edit', [
            'position' => $position,
        ]);
    }

    public function update(Request $request, Position $position): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'is_manager' => ['required', 'boolean'],
            'display_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        $position->update($validated);

        return redirect()
            ->route('admin.positions.index')
            ->with('success', '役職を更新しました。');
    }
}