<?php

use App\Http\Controllers\Admin\DepartmentController;
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

require __DIR__.'/settings.php';
