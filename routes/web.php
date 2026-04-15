<?php

use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\PositionController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

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
});

require __DIR__.'/settings.php';
