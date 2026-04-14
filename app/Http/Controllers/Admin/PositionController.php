<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Position;
use Inertia\Inertia;
use Inertia\Response;

class PositionController extends Controller
{
    public function index(): Response
    {
        $positions = Position::query()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/Positions/Index', [
            'positions' => $positions,
        ]);
    }
}