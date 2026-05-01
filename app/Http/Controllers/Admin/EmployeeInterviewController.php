<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\EmployeeInterview;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeInterviewController extends Controller
{
    public function index(Employee $employee): Response
    {
        $employee->load([
            'department',
            'position',
            'employmentType',
        ]);

        $interviews = $employee->interviews()
            ->with('interviewerEmployee')
            ->get();

        return Inertia::render('Admin/EmployeeInterviews/Index', [
            'employee' => $employee,
            'interviews' => $interviews,
        ]);
    }

    public function create(Employee $employee): Response
    {
        return Inertia::render('Admin/EmployeeInterviews/Create', [
            'employee' => $employee,
            'employees' => Employee::query()
                ->where('status', 'active')
                ->orderBy('employee_number')
                ->orderBy('id')
                ->get(['id', 'employee_number', 'last_name', 'first_name']),
        ]);
    }

    public function store(Request $request, Employee $employee): RedirectResponse
    {
        $validated = $request->validate([
            'interview_date' => ['required', 'date'],
            'interview_type' => ['required', 'in:regular,one_on_one,follow_up,return_to_work,transfer_follow_up,other'],
            'interviewer_employee_id' => ['nullable', 'exists:employees,id'],
            'summary' => ['nullable', 'string'],
            'discussion' => ['nullable', 'string'],
            'action_plan' => ['nullable', 'string'],
            'next_check' => ['nullable', 'string'],
            'note' => ['nullable', 'string'],
        ]);

        $validated['interviewer_employee_id'] = $validated['interviewer_employee_id'] ?: null;
        $validated['summary'] = $validated['summary'] ?: null;
        $validated['discussion'] = $validated['discussion'] ?: null;
        $validated['action_plan'] = $validated['action_plan'] ?: null;
        $validated['next_check'] = $validated['next_check'] ?: null;
        $validated['note'] = $validated['note'] ?: null;
        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;

        $employee->interviews()->create($validated);

        return redirect()
            ->route('admin.employees.interviews.index', $employee)
            ->with('success', '面談記録を登録しました。');
    }

    public function edit(Employee $employee, EmployeeInterview $interview): Response
    {
        if ($interview->employee_id !== $employee->id) {
            abort(404);
        }

        return Inertia::render('Admin/EmployeeInterviews/Edit', [
            'employee' => $employee,
            'interview' => $interview,
            'employees' => Employee::query()
                ->where('status', 'active')
                ->orderBy('employee_number')
                ->orderBy('id')
                ->get(['id', 'employee_number', 'last_name', 'first_name']),
        ]);
    }

    public function update(Request $request, Employee $employee, EmployeeInterview $interview): RedirectResponse
    {
        if ($interview->employee_id !== $employee->id) {
            abort(404);
        }

        $validated = $request->validate([
            'interview_date' => ['required', 'date'],
            'interview_type' => ['required', 'in:regular,one_on_one,follow_up,return_to_work,transfer_follow_up,other'],
            'interviewer_employee_id' => ['nullable', 'exists:employees,id'],
            'summary' => ['nullable', 'string'],
            'discussion' => ['nullable', 'string'],
            'action_plan' => ['nullable', 'string'],
            'next_check' => ['nullable', 'string'],
            'note' => ['nullable', 'string'],
        ]);

        $validated['interviewer_employee_id'] = $validated['interviewer_employee_id'] ?: null;
        $validated['summary'] = $validated['summary'] ?: null;
        $validated['discussion'] = $validated['discussion'] ?: null;
        $validated['action_plan'] = $validated['action_plan'] ?: null;
        $validated['next_check'] = $validated['next_check'] ?: null;
        $validated['note'] = $validated['note'] ?: null;
        $validated['updated_by'] = $request->user()->id;

        $interview->update($validated);

        return redirect()
            ->route('admin.employees.interviews.index', $employee)
            ->with('success', '面談記録を更新しました。');
    }
}