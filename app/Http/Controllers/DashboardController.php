<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Izin;
use Illuminate\Support\Facades\Auth;
use App\Models\Laporan_Bulanan;
use App\Models\Absen;
use App\Models\User;
use App\Models\Shift;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Menampilkan halaman dashboard.
     *
     * @return \Illuminate\View\View    
     */
    public function index()
    {
        $user = auth()->user();
        $nik = $user->nik;  
        $user->path_foto = url("/preview/" . urlencode($user->path_foto));
        
        // dd($user);
        if($user->role == 'admin'){
            
            $absen = Absen::whereDate('created_at', Carbon::today())->get();
            
            $totalKaryawan = User::where('role', 'pegawai')->count();
            $totalHadir = $absen->filter(function ($absen) {
                return $absen->status === 'hadir' || $absen->status === 'la';
            })->count();
            $totalTidakHadir = $totalKaryawan - $totalHadir;
        
            $absenData = [
                'totalKaryawan' => $totalKaryawan,
                'totalHadir' => $totalHadir,
                'totalTidakHadir' => $totalTidakHadir,
            ];
            
            
            // dd($absenData);
            
            return Inertia::render('Admin/dashboardAdmin',['user' => $user, 'absenData' => $absenData]);
        }else{
            $currentMonth = Carbon::now()->month;
            $currentYear = Carbon::now()->year;
            $total = Izin::where('nik', $user->nik)
            ->where('jenis_izin', 'la')
            ->where('status_persetujuan', 'Disetujui')
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)  
            ->count();
            $user->nyawa = 3 - $total;
            if($user->nyawa < 0){
                $user->nyawa = 0;
            }
            
            $laporan_bulanan = Laporan_Bulanan::where('nik', $user->nik)->where('bulan',Carbon::now()->format('m'))->where('tahun',Carbon::now()->year)->get();
            // dd($laporan_bulanan);
            $user->shift = Shift::where('id', $user->shift)->first();
            $user->jam_masuk = $shift->jam_masuk ?? '00:00:00';
            $user->jam_pulang = $shift->jam_pulang ?? '00:00:00';
            // $user->shift = $shift->nama ?? 'Tidak ada shift';
            return Inertia::render('dashboard',['user' => $user, 'laporan_bulanan' => $laporan_bulanan]);   
        }
    }

    public function indexAdmin()
    {
        $user = auth()->user();
        $absen = Absen::whereDate('created_at', Carbon::today())->get();
        
        $totalKaryawan = User::where('role', 'pegawai')->count();
        $totalHadir = $absen->filter(function ($absen) {
            return $absen->status === 'hadir' || $absen->status === 'la';
        })->count();
        $totalTidakHadir = $totalKaryawan - $totalHadir;
    
        $absenData = [
            'totalKaryawan' => $totalKaryawan,
            'totalHadir' => $totalHadir,
            'totalTidakHadir' => $totalTidakHadir,
        ];
    

        // dd($absenData);

        return Inertia::render('Admin/dashboardAdmin',['user' => $user, 'absenData' => $absenData]);
    }

}

