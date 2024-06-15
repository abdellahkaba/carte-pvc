<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("permissions")->insert([
            [
                "nom" => "ajouter une carte",
                "created_at" => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                "nom" => "editer un une carte",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
        
            ],
            [
                "nom" => "consulter une carte",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                "nom" => "ajouter un utilisateur",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                "nom" => "editer un utilisateur",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                "nom" => "consulter un utilisateurs",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                "nom" => "imprimer une carte",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
           
        ]);
    }
}
