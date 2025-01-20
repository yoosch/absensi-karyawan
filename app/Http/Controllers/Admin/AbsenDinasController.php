<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;    
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Izin;
use App\Models\User;
use App\Models\Absen;

class AbsenDinasController extends Controller
{
    public function index() {
        $dinasData = Izin::where('jenis_izin', 'dl')->get();
        foreach ($dinasData as $dinas) {
            $dinas->nama = User::where('nik', $dinas->nik)->first()->name;
            $dinas->surat_pendukung = url("/preview/" . urlencode($dinas->surat_pendukung));
        }
        // dd($dinasData);

        return Inertia::render('Admin/absenDinas', ['dinasData' => $dinasData]);
    }


    public function approvalIzin($id,$status){

        $izin = Izin::find($id);
        $izin->status_persetujuan = $status;
        $izin->save();


        //change status in user record 
        $user = User::where('nik', $izin->nik)->first();

        //get date from izin->tanggal_mulai until izin->tanggal_selesai
        for($date = $izin->tanggal_mulai; $date <= $izin->tanggal_selesai; $date = date('Y-m-d', strtotime($date . ' +1 day'))){
            
            $absen = Absen::where('nik', $izin->nik)->where('tanggal', $date)->first();
            if($absen){
                if($status == 'Disetujui'){
                    if($absen->status == 'la'){
                        $absen->status = 'hadir';
                        ($izin->jenis_lupa_absen == 'masuk') ? $absen->masuk = $izin->jam_lupa_absen : $absen->keluar = $izin->jam_lupa_absen;
                    }else{
                        $absen->status = $izin->jenis_izin;
                    }
                }
                $absen->save();
            }else{
                $absen = new Absen();
                $absen->nik = $izin->nik;
                $absen->tanggal = $date;
                if($status == 'Disetujui'){
                    if($absen->status == 'la'){
                        $absen->status = 'hadir';
                        ($izin->jenis_lupa_absen == 'masuk') ? $absen->masuk = $izin->jam_lupa_absen : $absen->keluar = $izin->jam_lupa_absen;
                    }else{
                        $absen->status = $izin->jenis_izin;
                    }
                }
                $absen->save();
            }
        }

        

        return response()->json(['message' => 'Izin berhasil diupdate']);
    }
}
