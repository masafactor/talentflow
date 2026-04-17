<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CandidateController extends Controller
{
    public function index(): Response
    {
        $candidates = Candidate::query()
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Admin/Candidates/Index', [
            'candidates' => $candidates,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Candidates/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'last_name' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name_kana' => ['nullable', 'string', 'max:255'],
            'first_name_kana' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'note' => ['nullable', 'string'],
        ]);

        $validated['last_name_kana'] = $validated['last_name_kana'] ?: null;
        $validated['first_name_kana'] = $validated['first_name_kana'] ?: null;
        $validated['birth_date'] = $validated['birth_date'] ?: null;
        $validated['email'] = $validated['email'] ?: null;
        $validated['phone'] = $validated['phone'] ?: null;
        $validated['note'] = $validated['note'] ?: null;

        Candidate::create($validated);

        return redirect()
            ->route('admin.candidates.index')
            ->with('success', '応募者を登録しました。');
    }

    public function edit(Candidate $candidate): Response
    {
        return Inertia::render('Admin/Candidates/Edit', [
            'candidate' => $candidate,
        ]);
    }

    public function update(Request $request, Candidate $candidate): RedirectResponse
    {
        $validated = $request->validate([
            'last_name' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name_kana' => ['nullable', 'string', 'max:255'],
            'first_name_kana' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'note' => ['nullable', 'string'],
        ]);

        $validated['last_name_kana'] = $validated['last_name_kana'] ?: null;
        $validated['first_name_kana'] = $validated['first_name_kana'] ?: null;
        $validated['birth_date'] = $validated['birth_date'] ?: null;
        $validated['email'] = $validated['email'] ?: null;
        $validated['phone'] = $validated['phone'] ?: null;
        $validated['note'] = $validated['note'] ?: null;

        $candidate->update($validated);

        return redirect()
            ->route('admin.candidates.index')
            ->with('success', '応募者を更新しました。');
    }
}