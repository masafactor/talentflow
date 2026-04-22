<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Employee;
use App\Models\EmployeeAssignment;
use App\Models\EmploymentType;
use App\Models\Position;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeAssignmentController extends Controller
{
    public function create(Employee $employee): Response
    {
        $employee->load([
            'department',
            'position',
            'employmentType',
        ]);

        return Inertia::render('Admin/EmployeeAssignments/Create', [
            'employee' => $employee,
            'departments' => Department::query()
                ->where('is_active', true)
                ->orderBy('display_order')
                ->orderBy('id')
                ->get(['id', 'name']),
            'positions' => Position::query()
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

    public function store(Request $request, Employee $employee): RedirectResponse
    {
        $validated = $request->validate([
            'department_id' => ['nullable', 'exists:departments,id'],
            'position_id' => ['nullable', 'exists:positions,id'],
            'employment_type_id' => ['nullable', 'exists:employment_types,id'],
            'start_date' => ['required', 'date'],
            'change_reason' => ['nullable', 'string', 'max:255'],
            'note' => ['nullable', 'string'],
        ]);

        $validated['department_id'] = $validated['department_id'] ?: null;
        $validated['position_id'] = $validated['position_id'] ?: null;
        $validated['employment_type_id'] = $validated['employment_type_id'] ?: null;
        $validated['change_reason'] = $validated['change_reason'] ?: null;
        $validated['note'] = $validated['note'] ?: null;

        $currentAssignment = $employee->assignments()
            ->whereNull('end_date')
            ->latest('start_date')
            ->latest('id')
            ->first();

        if ($currentAssignment) {
            $currentAssignment->update([
                'end_date' => $validated['start_date'],
            ]);
        }

        $employee->assignments()->create([
            ...$validated,
            'changed_by' => $request->user()->id,
        ]);

        $employee->update([
            'department_id' => $validated['department_id'],
            'position_id' => $validated['position_id'],
            'employment_type_id' => $validated['employment_type_id'],
        ]);

        return redirect()
            ->route('admin.employees.show', $employee)
            ->with('success', '異動履歴を登録しました。');
    }
}