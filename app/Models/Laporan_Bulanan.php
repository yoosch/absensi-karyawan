<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laporan_Bulanan extends Model
{
    protected $table = 'laporan_bulanan_record';

    protected $fillable = [
        'nik',
        'nama',
        'bulan',
        'tahun',
        'file_laporan',
    ];
}
