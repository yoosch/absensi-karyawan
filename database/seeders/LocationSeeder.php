<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        DB::table('location')->insert([
            [
                'name' => 'Kawasan Politeknik PU',
                'latitude' => -6.976338,
                'longitude' => 110.449563,
                'radius' => 0.2
            ],
        ]);
    }
}
