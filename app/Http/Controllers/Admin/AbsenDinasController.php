<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;    
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Izin;
use App\Models\User;

class AbsenDinasController extends Controller
{
    public function index() {
        $dinasData = Izin::where('jenis_izin', 'dinas')->get();
        foreach ($dinasData as $dinas) {
            $dinas->nama = User::where('nik', $dinas->nik)->first()->name;
            $dinas->surat_pendukung = asset("storage/{$dinas->surat_pendukung}");
        }
        // dd($dinasData);

        return Inertia::render('Admin/absenDinas', ['dinasData' => $dinasData]);
    }
}
