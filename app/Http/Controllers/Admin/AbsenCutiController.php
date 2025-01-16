<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Izin;
use App\Models\User;

class AbsenCutiController extends Controller
{

    public function indexCuti()
    {
        $cutiData = Izin::whereIn('jenis_izin', ['cuti sakit', 'cuti tahunan'])->get();
        foreach ($cutiData as $cuti) {
            $cuti->nama = User::where('nik', $cuti->nik)->first()->name;
            $cuti->email = User::where('nik', $cuti->nik)->first()->email;
            $cuti->jenis_cuti = $cuti->jenis_izin;
            $cuti->surat_pendukung = url("/preview/" . urlencode($cuti->surat_pendukung));
        }

        // dd($cutiData);

        return Inertia::render('Admin/absenCuti', ['cutiData' => $cutiData]);
    }
}
