<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\ApplicationInterview;
use App\Models\Employee;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationInterviewController extends Controller
{
    public function index(Application $application): Response
    {
        $application->load([
            'candidate',
            'jobPosting',
        ]);

        $interviews = $application->interviews()
            ->with(['interviewerEmployee', 'createdBy', 'updatedBy'])
            ->orderByDesc('interviewed_at')
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Admin/ApplicationInterviews/Index', [
            'application' => $application,
            'interviews' => $interviews,
        ]);
    }

    public function create(Application $application): Response
    {
        $application->load([
            'candidate',
            'jobPosting',
        ]);

        return Inertia::render('Admin/ApplicationInterviews/Create', [
            'application' => $application,
            'employees' => Employee::query()
                ->where('status', 'active')
                ->orderBy('employee_number')
                ->orderBy('id')
                ->get(['id', 'employee_number', 'last_name', 'first_name']),
        ]);
    }

    public function store(Request $request, Application $application): RedirectResponse
    {
        $validated = $request->validate([
            'stage' => ['required', 'in:document_screening,first_interview,second_interview,final_interview'],
            'interviewed_at' => ['nullable', 'date'],
            'interviewer_employee_id' => ['nullable', 'exists:employees,id'],
            'result' => ['required', 'in:pass,fail,hold'],
            'score' => ['nullable', 'integer', 'min:0', 'max:100'],
            'evaluation_comment' => ['nullable', 'string'],
            'decision_reason' => ['nullable', 'string'],
            'next_action' => ['nullable', 'string'],
        ]);

        $validated['interviewer_employee_id'] = $validated['interviewer_employee_id'] ?: null;
        $validated['score'] = $validated['score'] === '' ? null : $validated['score'];
        $validated['evaluation_comment'] = $validated['evaluation_comment'] ?: null;
        $validated['decision_reason'] = $validated['decision_reason'] ?: null;
        $validated['next_action'] = $validated['next_action'] ?: null;
        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;

        $application->interviews()->create($validated);

        return redirect()
            ->route('admin.applications.interviews.index', $application)
            ->with('success', '選考記録を登録しました。');
    }

    public function edit(Application $application, ApplicationInterview $interview): Response
    {
        if ($interview->application_id !== $application->id) {
            abort(404);
        }

        $application->load([
            'candidate',
            'jobPosting',
        ]);

        return Inertia::render('Admin/ApplicationInterviews/Edit', [
            'application' => $application,
            'interview' => $interview,
            'employees' => Employee::query()
                ->where('status', 'active')
                ->orderBy('employee_number')
                ->orderBy('id')
                ->get(['id', 'employee_number', 'last_name', 'first_name']),
        ]);
    }

    public function update(Request $request, Application $application, ApplicationInterview $interview): RedirectResponse
    {
        if ($interview->application_id !== $application->id) {
            abort(404);
        }

        $validated = $request->validate([
            'stage' => ['required', 'in:document_screening,first_interview,second_interview,final_interview'],
            'interviewed_at' => ['nullable', 'date'],
            'interviewer_employee_id' => ['nullable', 'exists:employees,id'],
            'result' => ['required', 'in:pass,fail,hold'],
            'score' => ['nullable', 'integer', 'min:0', 'max:100'],
            'evaluation_comment' => ['nullable', 'string'],
            'decision_reason' => ['nullable', 'string'],
            'next_action' => ['nullable', 'string'],
        ]);

        $validated['interviewer_employee_id'] = $validated['interviewer_employee_id'] ?: null;
        $validated['score'] = $validated['score'] === '' ? null : $validated['score'];
        $validated['evaluation_comment'] = $validated['evaluation_comment'] ?: null;
        $validated['decision_reason'] = $validated['decision_reason'] ?: null;
        $validated['next_action'] = $validated['next_action'] ?: null;
        $validated['updated_by'] = $request->user()->id;

        $interview->update($validated);

        return redirect()
            ->route('admin.applications.interviews.index', $application)
            ->with('success', '選考記録を更新しました。');
    }
}