<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absen extends Model
{
    //

    protected $table = 'absen_record';
    protected $fillable = [
        'id',
        'NIK',
        'tanggal',
        'waktu_masuk',
        'waktu_keluar',
        'koordinat_masuk',
        'koordinat_keluar',
        'photo_masuk_url',
        'photo_keluar_url,'
    ];
}
