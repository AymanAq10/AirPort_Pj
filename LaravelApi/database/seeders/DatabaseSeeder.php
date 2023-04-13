<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin_acc;
use App\Models\Stagiaire_acc;
use App\Models\Requests;
use App\Models\RequestesAccepter;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        // Stagiaire_acc::factory(20)->create();
        Requests::factory(20)->create();
        // RequestesAccepter::factory(10)->create();
        Admin_acc::factory(10)->create();

    }
}
