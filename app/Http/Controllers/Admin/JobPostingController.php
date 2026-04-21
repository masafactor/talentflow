<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Department;
use App\Models\EmploymentType;
use App\Models\JobPosting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobPostingController extends Controller
{
    public function index(): Response
    {
        $jobPostings = JobPosting::query()
            ->with(['department', 'employmentType'])
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Admin/JobPostings/Index', [
            'jobPostings' => $jobPostings,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/JobPostings/Create', [
            'departments' => Department::query()
                ->where('is_active', true)
                ->orderBy('display_order')
                ->orderBy('id')
                ->get(['id', 'name']),
            'employmentTypes' => EmploymentType::query()
                ->where('is_active', true)
                ->orderBy('display_order')
                ->orderBy('id')
                ->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'department_id' => ['nullable', 'exists:departments,id'],
            'employment_type_id' => ['nullable', 'exists:employment_types,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'number_of_positions' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'in:draft,open,closed'],
            'opened_on' => ['nullable', 'date'],
            'closed_on' => ['nullable', 'date', 'after_or_equal:opened_on'],
        ]);

        $validated['department_id'] = $validated['department_id'] ?: null;
        $validated['employment_type_id'] = $validated['employment_type_id'] ?: null;
        $validated['description'] = $validated['description'] ?: null;
        $validated['opened_on'] = $validated['opened_on'] ?: null;
        $validated['closed_on'] = $validated['closed_on'] ?: null;

        JobPosting::create($validated);

        return redirect()
            ->route('admin.job-postings.index')
            ->with('success', '求人を登録しました。');
    }

    public function edit(JobPosting $jobPosting): Response
    {
        return Inertia::render('Admin/JobPostings/Edit', [
            'jobPosting' => $jobPosting,
            'departments' => Department::query()
                ->where('is_active', true)
                ->orderBy('display_order')
                ->orderBy('id')
                ->get(['id', 'name']),
            'employmentTypes' => EmploymentType::query()
                ->where('is_active', true)
                ->orderBy('display_order')
                ->orderBy('id')
                ->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, JobPosting $jobPosting): RedirectResponse
    {
        $validated = $request->validate([
            'department_id' => ['nullable', 'exists:departments,id'],
            'employment_type_id' => ['nullable', 'exists:employment_types,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'number_of_positions' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'in:draft,open,closed'],
            'opened_on' => ['nullable', 'date'],
            'closed_on' => ['nullable', 'date', 'after_or_equal:opened_on'],
        ]);

        $validated['department_id'] = $validated['department_id'] ?: null;
        $validated['employment_type_id'] = $validated['employment_type_id'] ?: null;
        $validated['description'] = $validated['description'] ?: null;
        $validated['opened_on'] = $validated['opened_on'] ?: null;
        $validated['closed_on'] = $validated['closed_on'] ?: null;

        $jobPosting->update($validated);

        return redirect()
            ->route('admin.job-postings.index')
            ->with('success', '求人を更新しました。');
    }

    public function show(JobPosting $jobPosting): Response
    {
        $jobPosting->load([
            'department',
            'employmentType',
        ]);

        $applications = Application::query()
            ->with([
                'candidate',
                'recruitmentRoute',
                'employee',
            ])
            ->where('job_posting_id', $jobPosting->id)
            ->orderByDesc('applied_on')
            ->orderByDesc('id')
            ->get();

        $summary = [
            'total' => $applications->count(),
            'screening' => $applications->where('status', 'screening')->count(),
            'first_interview' => $applications->where('status', 'first_interview')->count(),
            'second_interview' => $applications->where('status', 'second_interview')->count(),
            'final_interview' => $applications->where('status', 'final_interview')->count(),
            'offered' => $applications->where('status', 'offered')->count(),
            'hired' => $applications->where('status', 'hired')->count(),
            'rejected' => $applications->where('status', 'rejected')->count(),
            'declined' => $applications->where('status', 'declined')->count(),
        ];

        return Inertia::render('Admin/JobPostings/Show', [
            'jobPosting' => $jobPosting,
            'applications' => $applications,
            'summary' => $summary,
        ]);
    }
}