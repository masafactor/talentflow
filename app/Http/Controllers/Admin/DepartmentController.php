<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function index(): Response
    {
        $departments = Department::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/Departments/Index', [
            'departments' => $departments,
        ]);
    }
}