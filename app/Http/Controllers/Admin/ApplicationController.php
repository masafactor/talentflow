<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Candidate;
use App\Models\Employee;
use App\Models\JobPosting;
use App\Models\RecruitmentRoute;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

class ApplicationController extends Controller
{
    public function index(): Response
    {
        $applications = Application::query()
            ->with([
                'candidate',
                'jobPosting',
                'recruitmentRoute',
                'referrerEmployee',
            ])
            ->orderByDesc('applied_on')
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Admin/Applications/Index', [
            'applications' => $applications,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Applications/Create', [
            'candidates' => Candidate::query()
                ->orderByDesc('id')
                ->get(['id', 'last_name', 'first_name']),
            'jobPostings' => JobPosting::query()
                ->orderByDesc('id')
                ->get(['id', 'title']),
            'recruitmentRoutes' => RecruitmentRoute::query()
                ->where('is_active', true)
                ->orderBy('display_order')
                ->orderBy('id')
                ->get(['id', 'name', 'type']),
            'employees' => Employee::query()
                ->where('status', 'active')
                ->orderBy('employee_number')
                ->orderBy('id')
                ->get(['id', 'employee_number', 'last_name', 'first_name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
       $validated = $request->validate([
    'candidate_id' => [
        'required',
        'exists:candidates,id',
        Rule::unique('applications')->where(function ($query) use ($request) {
            return $query->where('job_posting_id', $request->job_posting_id);
        }),
    ],
            'job_posting_id' => ['required', 'exists:job_postings,id'],
            'recruitment_route_id' => ['nullable', 'exists:recruitment_routes,id'],
            'referrer_employee_id' => ['nullable', 'exists:employees,id'],
            'connection_name' => ['nullable', 'string', 'max:255'],
            'relationship_note' => ['nullable', 'string', 'max:255'],
            'is_incentive_target' => ['required', 'boolean'],
            'status' => [
                'required',
                'in:applied,screening,first_interview,second_interview,final_interview,offered,hired,rejected,declined',
            ],
            'applied_on' => ['required', 'date'],
            'note' => ['nullable', 'string'],
        ], [
            'candidate_id.unique' => 'この応募者は既にこの求人へ応募登録されています。',
        ]);

        $validated['recruitment_route_id'] = $validated['recruitment_route_id'] ?: null;
        $validated['referrer_employee_id'] = $validated['referrer_employee_id'] ?: null;
        $validated['connection_name'] = $validated['connection_name'] ?: null;
        $validated['relationship_note'] = $validated['relationship_note'] ?: null;
        $validated['note'] = $validated['note'] ?: null;

        $application = Application::create($validated);

        $application->statusHistories()->create([
            'changed_by' => $request->user()->id,
            'old_status' => null,
            'new_status' => $validated['status'],
            'note' => '応募登録時の初期ステータス',
            'changed_at' => now(),
        ]);

        return redirect()
            ->route('admin.applications.index')
            ->with('success', '応募情報を登録しました。');
    }

    public function edit(Application $application): Response
    {
        $application->load([
            'statusHistories.changedBy',
        ]);

        return Inertia::render('Admin/Applications/Edit', [
            'application' => $application,
            'candidates' => Candidate::query()
                ->orderByDesc('id')
                ->get(['id', 'last_name', 'first_name']),
            'jobPostings' => JobPosting::query()
                ->orderByDesc('id')
                ->get(['id', 'title']),
            'recruitmentRoutes' => RecruitmentRoute::query()
                ->where('is_active', true)
                ->orderBy('display_order')
                ->orderBy('id')
                ->get(['id', 'name', 'type']),
            'employees' => Employee::query()
                ->where('status', 'active')
                ->orderBy('employee_number')
                ->orderBy('id')
                ->get(['id', 'employee_number', 'last_name', 'first_name']),
            'statusHistories' => $application->statusHistories()
                ->with('changedBy:id,name')
                ->orderByDesc('changed_at')
                ->orderByDesc('id')
                ->get(),
        ]);
    }

    public function update(Request $request, Application $application): RedirectResponse
    {
        $validated = $request->validate([
    'candidate_id' => [
        'required',
        'exists:candidates,id',
        Rule::unique('applications')
            ->where(function ($query) use ($request) {
                return $query->where('job_posting_id', $request->job_posting_id);
            })
            ->ignore($application->id),
    ],
    'job_posting_id' => ['required', 'exists:job_postings,id'],
    'recruitment_route_id' => ['nullable', 'exists:recruitment_routes,id'],
    'referrer_employee_id' => ['nullable', 'exists:employees,id'],
    'connection_name' => ['nullable', 'string', 'max:255'],
    'relationship_note' => ['nullable', 'string', 'max:255'],
    'is_incentive_target' => ['required', 'boolean'],
    'status' => [
        'required',
        'in:applied,screening,first_interview,second_interview,final_interview,offered,hired,rejected,declined',
    ],
    'applied_on' => ['required', 'date'],
    'note' => ['nullable', 'string'],
], [
    'candidate_id.unique' => 'この応募者は既にこの求人へ応募登録されています。',
]);

        $oldStatus = $application->status;

        $validated['recruitment_route_id'] = $validated['recruitment_route_id'] ?: null;
        $validated['referrer_employee_id'] = $validated['referrer_employee_id'] ?: null;
        $validated['connection_name'] = $validated['connection_name'] ?: null;
        $validated['relationship_note'] = $validated['relationship_note'] ?: null;
        $validated['note'] = $validated['note'] ?: null;

        $application->update($validated);

        if ($oldStatus !== $validated['status']) {
            $application->statusHistories()->create([
                'changed_by' => $request->user()->id,
                'old_status' => $oldStatus,
                'new_status' => $validated['status'],
                'note' => '編集画面でステータス更新',
                'changed_at' => now(),
            ]);
        }

        return redirect()
            ->route('admin.applications.index')
            ->with('success', '応募情報を更新しました。');
    }
}