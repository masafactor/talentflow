<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Employee;
use App\Models\EmploymentType;
use App\Models\Position;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function index(): Response
    {
        $employees = Employee::query()
            ->with(['department', 'position', 'employmentType'])
            ->orderBy('employee_number')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/Employees/Index', [
            'employees' => $employees,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Employees/Create', [
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

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'department_id' => ['nullable', 'exists:departments,id'],
            'position_id' => ['nullable', 'exists:positions,id'],
            'employment_type_id' => ['nullable', 'exists:employment_types,id'],
            'employee_number' => ['required', 'string', 'max:50', 'unique:employees,employee_number'],
            'last_name' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name_kana' => ['nullable', 'string', 'max:255'],
            'first_name_kana' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'joined_on' => ['required', 'date'],
            'retired_on' => ['nullable', 'date', 'after_or_equal:joined_on'],
            'status' => ['required', 'in:active,on_leave,retired'],
            'note' => ['nullable', 'string'],
        ]);

        $validated['department_id'] = $validated['department_id'] ?: null;
        $validated['position_id'] = $validated['position_id'] ?: null;
        $validated['employment_type_id'] = $validated['employment_type_id'] ?: null;
        $validated['retired_on'] = $validated['retired_on'] ?: null;

        Employee::create($validated);

        return redirect()
            ->route('admin.employees.index')
            ->with('success', '社員を登録しました。');
    }

    public function edit(Employee $employee): Response
    {
        return Inertia::render('Admin/Employees/Edit', [
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

    public function update(Request $request, Employee $employee): RedirectResponse
    {
        $validated = $request->validate([
            'department_id' => ['nullable', 'exists:departments,id'],
            'position_id' => ['nullable', 'exists:positions,id'],
            'employment_type_id' => ['nullable', 'exists:employment_types,id'],
            'employee_number' => ['required', 'string', 'max:50', 'unique:employees,employee_number,' . $employee->id],
            'last_name' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name_kana' => ['nullable', 'string', 'max:255'],
            'first_name_kana' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'joined_on' => ['required', 'date'],
            'retired_on' => ['nullable', 'date', 'after_or_equal:joined_on'],
            'status' => ['required', 'in:active,on_leave,retired'],
            'note' => ['nullable', 'string'],
        ]);

        $validated['department_id'] = $validated['department_id'] ?: null;
        $validated['position_id'] = $validated['position_id'] ?: null;
        $validated['employment_type_id'] = $validated['employment_type_id'] ?: null;
        $validated['retired_on'] = $validated['retired_on'] ?: null;

        $employee->update($validated);

        return redirect()
            ->route('admin.employees.index')
            ->with('success', '社員情報を更新しました。');
    }
}