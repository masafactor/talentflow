<?php

use App\Http\Controllers\Admin\ApplicationController;
use App\Http\Controllers\Admin\CandidateController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\EmploymentTypeController;
use App\Http\Controllers\Admin\JobPostingController;
use App\Http\Controllers\Admin\PositionController;
use App\Http\Controllers\Admin\RecruitmentRouteController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\ApplicationInterviewController;
use App\Http\Controllers\Admin\EmployeeAssignmentController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/departments', [DepartmentController::class, 'index'])
        ->name('admin.departments.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/departments', [DepartmentController::class, 'index'])
        ->name('admin.departments.index');

    Route::get('/admin/departments/create', [DepartmentController::class, 'create'])
        ->name('admin.departments.create');

    Route::post('/admin/departments', [DepartmentController::class, 'store'])
        ->name('admin.departments.store');

    Route::get('/admin/departments/{department}/edit', [DepartmentController::class, 'edit'])
        ->name('admin.departments.edit');

    Route::put('/admin/departments/{department}', [DepartmentController::class, 'update'])
        ->name('admin.departments.update');

    
    Route::get('/admin/positions', [PositionController::class, 'index'])
        ->name('admin.positions.index');
    Route::get('/admin/positions/create', [PositionController::class, 'create'])
        ->name('admin.positions.create');
    Route::post('/admin/positions', [PositionController::class, 'store'])
        ->name('admin.positions.store');
    Route::get('/admin/positions/{position}/edit', [PositionController::class, 'edit'])
        ->name('admin.positions.edit');
    Route::put('/admin/positions/{position}', [PositionController::class, 'update'])
        ->name('admin.positions.update');


    Route::get('/admin/employment-types', [EmploymentTypeController::class, 'index'])
        ->name('admin.employment-types.index');
    Route::get('/admin/employment-types/create', [EmploymentTypeController::class, 'create'])
        ->name('admin.employment-types.create');
    Route::post('/admin/employment-types', [EmploymentTypeController::class, 'store'])
        ->name('admin.employment-types.store');
    Route::get('/admin/employment-types/{employmentType}/edit', [EmploymentTypeController::class, 'edit'])
        ->name('admin.employment-types.edit');
    Route::put('/admin/employment-types/{employmentType}', [EmploymentTypeController::class, 'update'])
        ->name('admin.employment-types.update');

    Route::get('/admin/employees', [EmployeeController::class, 'index'])
        ->name('admin.employees.index');
    Route::get('/admin/employees/create', [EmployeeController::class, 'create'])
        ->name('admin.employees.create');
    Route::post('/admin/employees', [EmployeeController::class, 'store'])
        ->name('admin.employees.store');
    Route::get('/admin/employees/{employee}/edit', [EmployeeController::class, 'edit'])
        ->name('admin.employees.edit');
    Route::put('/admin/employees/{employee}', [EmployeeController::class, 'update'])
        ->name('admin.employees.update');
    Route::get('/admin/employees/{employee}', [EmployeeController::class, 'show'])
    ->name('admin.employees.show');


    Route::get('/admin/job-postings', [JobPostingController::class, 'index'])
    ->name('admin.job-postings.index');
    Route::get('/admin/job-postings/create', [JobPostingController::class, 'create'])
        ->name('admin.job-postings.create');
    Route::post('/admin/job-postings', [JobPostingController::class, 'store'])
        ->name('admin.job-postings.store');
    Route::get('/admin/job-postings/{jobPosting}/edit', [JobPostingController::class, 'edit'])
        ->name('admin.job-postings.edit');
    Route::get('/admin/job-postings/{jobPosting}', [JobPostingController::class, 'show'])
        ->name('admin.job-postings.show');
    Route::put('/admin/job-postings/{jobPosting}', [JobPostingController::class, 'update'])
        ->name('admin.job-postings.update');
    

    Route::get('/admin/candidates', [CandidateController::class, 'index'])
    ->name('admin.candidates.index');
    Route::get('/admin/candidates/create', [CandidateController::class, 'create'])
        ->name('admin.candidates.create');
    Route::post('/admin/candidates', [CandidateController::class, 'store'])
        ->name('admin.candidates.store');
    Route::get('/admin/candidates/{candidate}/edit', [CandidateController::class, 'edit'])
        ->name('admin.candidates.edit');
    Route::put('/admin/candidates/{candidate}', [CandidateController::class, 'update'])
        ->name('admin.candidates.update');

    Route::get('/admin/applications', [ApplicationController::class, 'index'])
    ->name('admin.applications.index');

    Route::get('/admin/applications/hired', [ApplicationController::class, 'hiredIndex'])
    ->name('admin.applications.hired');

    Route::get('/admin/applications/create', [ApplicationController::class, 'create'])
        ->name('admin.applications.create');
    Route::post('/admin/applications', [ApplicationController::class, 'store'])
        ->name('admin.applications.store');
    Route::get('/admin/applications/{application}/edit', [ApplicationController::class, 'edit'])
        ->name('admin.applications.edit');
    Route::put('/admin/applications/{application}', [ApplicationController::class, 'update'])
        ->name('admin.applications.update');

    Route::get('/admin/applications/{application}', [ApplicationController::class, 'show'])
        ->name('admin.applications.show');

    Route::get('/admin/recruitment-routes', [RecruitmentRouteController::class, 'index'])
        ->name('admin.recruitment-routes.index');

    Route::get('/admin/applications/{application}/employee-create', [ApplicationController::class, 'employeeCreate'])
        ->name('admin.applications.employee-create');

    Route::post('/admin/applications/{application}/employee-register', [ApplicationController::class, 'employeeRegister'])
        ->name('admin.applications.employee-register');

    Route::get('/admin/recruitment-routes/create', [RecruitmentRouteController::class, 'create'])
        ->name('admin.recruitment-routes.create');
    Route::post('/admin/recruitment-routes', [RecruitmentRouteController::class, 'store'])
        ->name('admin.recruitment-routes.store');
    Route::get('/admin/recruitment-routes/{recruitmentRoute}/edit', [RecruitmentRouteController::class, 'edit'])
        ->name('admin.recruitment-routes.edit');
    Route::put('/admin/recruitment-routes/{recruitmentRoute}', [RecruitmentRouteController::class, 'update'])
        ->name('admin.recruitment-routes.update');


    Route::get('/admin/applications/{application}/interviews', [ApplicationInterviewController::class, 'index'])
    ->name('admin.applications.interviews.index');

    Route::get('/admin/applications/{application}/interviews/create', [ApplicationInterviewController::class, 'create'])
        ->name('admin.applications.interviews.create');

    Route::post('/admin/applications/{application}/interviews', [ApplicationInterviewController::class, 'store'])
        ->name('admin.applications.interviews.store');

    Route::get('/admin/applications/{application}/interviews/{interview}/edit', [ApplicationInterviewController::class, 'edit'])
        ->name('admin.applications.interviews.edit');

    Route::put('/admin/applications/{application}/interviews/{interview}', [ApplicationInterviewController::class, 'update'])
        ->name('admin.applications.interviews.update');



    Route::get('/admin/employees/{employee}/assignments/create', [EmployeeAssignmentController::class, 'create'])
        ->name('admin.employees.assignments.create');

    Route::post('/admin/employees/{employee}/assignments', [EmployeeAssignmentController::class, 'store'])
        ->name('admin.employees.assignments.store');
    
});

require __DIR__.'/settings.php';
