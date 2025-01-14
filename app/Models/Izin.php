<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Izin extends Model
{
    protected $table = 'izin_record';

    protected $fillable = [
        'nik',
        'jenis_izin',
        'tanggal_mulai',
        'tanggal_selesai',
        'deskripsi',
        'alamat_cuti',
        'surat_pendukung'
    ];
}
