<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Izin;
use Illuminate\Support\Facades\Auth;
use App\Models\Laporan_Bulanan;
use App\Models\Absen;
use App\Models\User;
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
        $nik = $user->nik;  
        

        //get today absen
        $absen = Absen::where('nik', $nik)
                ->whereDate('created_at', Carbon::today())
                ->first();

        if ($absen) {
            // default waktu
            $defaultInnPagi = '07:30';
            $defaultOutPagi = '16:00';
            $defaultInnSiang = '14:00';
            $defaultOutSiang = '21:30';
    
                if ($user->shift == 'Pagi') {
                    $inn = $absen->waktu_masuk ?? $defaultInnPagi;
                    $out = $absen->waktu_keluar ?? $defaultOutPagi;
                } elseif ($user->shift == 'Siang') {
                    $inn = $absen->waktu_masuk ?? $defaultInnSiang;
                    $out = $absen->waktu_keluar ?? $defaultOutSiang;
                } 

                if ($inn){
                    $waktu_masuk = Carbon::parse($inn);
                    $waktuSekarang = Carbon::now();
                }
    
                $absen->waktu_kerja = $waktu_masuk->diffInHours($waktuSekarang);
                $absen->kj = 0;
                $absen->lembur = 0;
                $absen->effectiveHours = 0;
                $absen->telat = false;
    
                if($absen->status == 'pending'){
                    $isDownloadable = false;
                }
    
                if($absen->status == 'la' || $absen->status == 'hadir'){
                    $breakTime = 1;
                    $effectiveHours = $absen->waktu_kerja - $breakTime;
                    $absen->effectiveHours = $effectiveHours;
    
                    if($absen->$effectiveHours < 7.5){
                        $absen->kj = (7.5 - $absen->effectiveHours)*60;
                    }else{
                        $absen->lembur = ($absen->effectiveHours - 7.5)*60;
                    }
    
                    $toleransiPagi = Carbon::parse('08:00:00');
                    $toleransiSiang = Carbon::parse('14:30:00');


                    if ($user->shift == 'Pagi'){
                        if ($waktu_masuk > $toleransiPagi) {
                            $absen->telat = true;
                        }
                        else {
                            $absen->telat = false;
                        }             
                    }
                    else if ($user->shift == 'Siang'){
                        if ($waktu_masuk > $toleransiSiang) {
                            $absen->telat = true;
                        }
                        else {
                            $absen->telat = false;
                        }             
                    }
                }
            }       
            
            // dd($absen);

        // dd($user);
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
            return Inertia::render('dashboard',['user' => $user, 'laporan_bulanan' => $laporan_bulanan, 'absen' => $absen]);   
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'file_laporan' => 'required|file|mimes:pdf|max:5120',
        ]);

        // dd($request->all());

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

