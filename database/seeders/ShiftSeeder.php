<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        DB::table('shift')->insert([
            [
                'nama' => 'Pagi',
                'mulai_jam_masuk' => '06:00:00',
                'jam_masuk' => '07:30:00',
                'turning_point' => '12:00:00',
                'jam_keluar' => '16:00:00',
                'selesai_jam_keluar' => '21:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
        
    }
}
