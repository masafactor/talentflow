<?php

namespace Database\Seeders;

use App\Models\RecruitmentRoute;
use Illuminate\Database\Seeder;

class RecruitmentRouteSeeder extends Seeder
{
    public function run(): void
    {
        $routes = [
            ['name' => '求人媒体', 'type' => 'job_board', 'display_order' => 1, 'is_active' => true],
            ['name' => '自社サイト', 'type' => 'company_site', 'display_order' => 2, 'is_active' => true],
            ['name' => 'エージェント', 'type' => 'agent', 'display_order' => 3, 'is_active' => true],
            ['name' => 'ハローワーク', 'type' => 'public', 'display_order' => 4, 'is_active' => true],
            ['name' => 'リファラル', 'type' => 'referral', 'display_order' => 5, 'is_active' => true],
            ['name' => '関係者紹介', 'type' => 'connection', 'display_order' => 6, 'is_active' => true],
            ['name' => 'その他', 'type' => 'other', 'display_order' => 99, 'is_active' => true],
        ];

        foreach ($routes as $route) {
            RecruitmentRoute::updateOrCreate(
                ['name' => $route['name']],
                $route
            );
        }
    }
}