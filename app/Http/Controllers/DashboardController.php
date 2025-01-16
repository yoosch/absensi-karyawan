<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Izin;
use App\Models\Laporan_Bulanan;
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
        $laporan_bulanan = Laporan_Bulanan::where('nik', $user->nik)->get();

        if($user->role == 'admin'){
            return Inertia::render('Admin/dashboard',['user' => $user]);
        }else{
            $currentMonth = Carbon::now()->month;
            $currentYear = Carbon::now()->year;
            $total = Izin::where('nik', $user->nik)
            ->where('jenis_izin', 'lupa absen')
            ->where('status_persetujuan', 'Disetujui')
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)  
            ->count();
            $user->nyawa = 3 - $total;
            if($user->nyawa < 0){
                $user->nyawa = 0;
            }
            return Inertia::render('dashboard',['user' => $user, 'laporan_bulanan' => $laporan_bulanan]);   
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'file_laporan' => 'required|file|mimes:pdf|max:5120',
        ]);

        $user = Auth::user();

        Carbon::setLocale('id');
        $bulan = Carbon::now()->translatedFormat('F');
        $tahun = Carbon::now()->format('Y');

        $existingReport = Laporan_Bulanan::where('nik', $user->nik)
                                        ->where('bulan', $bulan)
                                        ->where('tahun', $tahun)
                                        ->first();

        if ($existingReport) {
            $filePath = $request->file('file_laporan')->storeAs(
                'Laporan_Bulanan/' . $user->nik . '_' . $user->name,
                $request->file('file_laporan')->getClientOriginalName(),
                'public'
            );
            $existingReport->update([
                'file_laporan' => $filePath,
            ]);
        } else {
            $filePath = $request->file('file_laporan')->storeAs(
                'Laporan_Bulanan/' . $user->nik . '_' . $user->name,
                $request->file('file_laporan')->getClientOriginalName(),
                'public'
            );

            Laporan_Bulanan::create([
                'nik' => $user->nik,
                'nama' => $user->name,
                'bulan' => $bulan,
                'tahun' => $tahun,
                'file_laporan' => $filePath,
            ]);
        }

        return Inertia::render('dashboard');
    }

}

