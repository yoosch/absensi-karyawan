<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;    
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Izin;
use App\Models\User;
use App\Models\Absen;
use App\Models\Laporan_Bulanan;

class AdminAbsenController extends Controller
{
    public function indexDinas() {
        $dinasData = Izin::where('jenis_izin', 'dl')->get();
        foreach ($dinasData as $dinas) {
            $dinas->nama = User::where('nik', $dinas->nik)->first()->name;
            $dinas->surat_pendukung = url("/preview/" . urlencode($dinas->surat_pendukung));
        }
        // dd($dinasData);

        return Inertia::render('Admin/absenDinas', ['dinasData' => $dinasData]);
    }

    public function indexCuti()
    {
        $cutiData = Izin::whereIn('jenis_izin', ['c', 's','k'])->get();
        foreach ($cutiData as $cuti) {
            $cuti->nama = User::where('nik', $cuti->nik)->first()->name;
            $cuti->email = User::where('nik', $cuti->nik)->first()->email;
            $cuti->jenis_cuti = $cuti->jenis_izin;
            $cuti->surat_pendukung = url("/preview/" . urlencode($cuti->surat_pendukung));
        }

        // dd($cutiData);

        return Inertia::render('Admin/absenCuti', ['cutiData' => $cutiData]);
    }

    public function indexLupaAbsen() {
        $lupaAbsenData = Izin::where('jenis_izin', 'la')->get();
        foreach ($lupaAbsenData as $lupaAbsen) {
            $lupaAbsen->nama = User::where('nik', $lupaAbsen->nik)->first()->name;
            $lupaAbsen->surat_pendukung = url("/preview/" . urlencode($lupaAbsen->surat_pendukung));
        }
        // dd($lupaAbsenData);

        return Inertia::render('Admin/absenLupaAbsen', ['lupaAbsenData' => $lupaAbsenData]);
    }

    public function LaporanBulanan($bulan, $tahun) {

        //get all pegawai order by name for a to z
        $Pegawai = User::where('role', 'pegawai')->orderBy('name', 'asc')->get();
        
        foreach ($Pegawai as $pegawai) {
            $pegawai->laporan = 'belum';
            $pegawai->laporan = Laporan_Bulanan::where('nik', $pegawai->nik)->where('tahun', $tahun)->where('bulan', $bulan)->first();
            // $pegawai->laporan = url("/preview/" . urlencode($pegawai->laporan->file_laporan));
            if($pegawai->laporan){
                $pegawai->laporan = url("/preview/" . urlencode($pegawai->laporan->file_laporan));
            }
        }
        return response()->json($Pegawai);  
        
    }

    public function approvalIzin($id,$status){

        $izin = Izin::find($id);
        $izin->status_persetujuan = $status;
        $izin->save();

        $user = User::where('nik', $izin->nik)->first();

        //get date from izin->tanggal_mulai until izin->tanggal_selesai
        for($date = $izin->tanggal_mulai; $date <= $izin->tanggal_selesai; $date = date('Y-m-d', strtotime($date . ' +1 day'))){
            
            $day = date('D', strtotime($date));
            if ($day == 'Sat' || $day == 'Sun') {
                continue;
            }
        
            $absen = Absen::where('nik', $izin->nik)->where('tanggal', $date)->first();
            if (!$absen) {
                $absen = new Absen();
                $absen->nik = $izin->nik;
                $absen->tanggal = $date;
            }
            if($status == 'Disetujui'){
                if($izin->jenis_izin == 'la'){
                    $absen->status = 'hadir';
                    if ($izin->jenis_lupa_absen == 'masuk') {
                        $absen->waktu_masuk = $izin->jam_lupa_absen;
                    } else {
                        $absen->waktu_keluar = $izin->jam_lupa_absen;
                    }
                    $absen->save();
                }else{
                    $absen->status = $izin->jenis_izin;
                }
            }
            else {
                if($izin->jenis_izin == 'la'){
                    if ($izin->jenis_lupa_absen == 'masuk') {
                        $absen->waktu_masuk = null;
                    } else {
                        $absen->waktu_keluar = null;
                    }
                    $absen->save();
                }
                $absen->status = 'alpha';
            }
            $absen->save();
        }   

        return response()->json(['message' => 'Izin berhasil diupdate']);
    }
}
