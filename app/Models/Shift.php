<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    protected $table = 'shift';
    protected $fillable = [
        'nama',
        'mulai_jam_masuk',
        'jam_masuk',
        'turning_point',
        'jam_keluar',
        'selesai_jam_keluar',
        'jam_kerja',
        'durasi_istirahat',
        'durasi_istirahat_jumat',
    ];
}
