<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Izin extends Model
{
    protected $table = 'izin_record';

    protected $fillable = [
        'NIK',
        'jenis',
        'tanggal_mulai',
        'tanggal_selesai',
        'deskripsi',
        'alamat',
        'surat_path'
    ];
}
