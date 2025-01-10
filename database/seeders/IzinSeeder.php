<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IzinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('izin_record')->insert([
            [
                'NIK' => 'EMP001',
                'jenis' => 'Sakit',
                'tanggal_mulai' => '2025-01-08',
                'tanggal_selesai' => '2025-01-10',
                'deskripsi' => 'Demam tinggi, istirahat sesuai saran dokter.',
                'alamat' => 'Jl. Merpati No. 5, Jakarta',
                'surat_path' => 'public/surat_izin/surat_Izin_Popmie.docx',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
