<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Izin;
use Inertia\Inertia;
use App\Models\Absen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class IzinController extends Controller
{
        /**
     * index
     *
     * @return void
     */
      public function index()
      {
          //get all posts
          // $posts = Post::latest()->get();
        $user = auth()->user();
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
        // dd($user);
          //return view
          return Inertia::render('izin', ['user' => $user]);
      }

      public function store(Request $request){
    $request->validate([
        'tipeIzin' => 'required|string',
        'jenisCuti' => 'nullable|string',
        'tanggalMulai' => 'required|date',
        'tanggalSelesai' => 'required|date',
        'deskripsi' => 'required|string',
        'alamat' => 'nullable|string',
        'pathSurat' => 'required|file|mimes:pdf|max:5120',
    ]);

    $user = Auth::user();
    $izin = '';

    if($request->tipeIzin == 'cuti'){
        if($request->jenisCuti == 'tahunan'){
            $izin = 'c';
        } else if($request->jenisCuti == 'sakit'){
            $izin = 's';
        }
    } else if($request->tipeIzin == 'dinas'){
        $izin = 'dl';
    } else if($request->tipeIzin == 'lupa absen'){
        $izin = 'la';
    }

    if ($request->tipeIzin == 'cuti') {
        if ($request->jenisCuti == 'tahunan'){
            $filePath = $request->file('pathSurat')->storeAs(
                'Surat_Pendukung_Cuti/Tahunan/' . $user->nik . '_' . $user->name, 
                $request->file('pathSurat')->getClientOriginalName(), 
                'public'
            );  
        }
        else if ($request->jenisCuti == 'sakit'){
            $filePath = $request->file('pathSurat')->storeAs(
                'Surat_Pendukung_Cuti/Sakit/' . $user->nik . '_' . $user->name, 
                $request->file('pathSurat')->getClientOriginalName(), 
                'public'
            );
        } 
    }
    else if ($request->tipeIzin == 'dinas') {
        $filePath = $request->file('pathSurat')->storeAs(
            'Surat_Pendukung_Dinas/' . $user->nik . '_' . $user->name, 
            $request->file('pathSurat')->getClientOriginalName(), 
            'public'
        );
    }
    else if ($request->tipeIzin == 'lupa absen') {
        $filePath = $request->file('pathSurat')->storeAs(
            'Surat_Pendukung_LupaAbsen/' . $user->nik . '_' . $user->name, 
            $request->file('pathSurat')->getClientOriginalName(), 
            'public'
        );
    }

    Izin::create([
        'nik' => $user->nik,
        'jenis_izin' => $izin,
        'tanggal_mulai' => $request->tanggalMulai,
        'tanggal_selesai' => $request->tanggalSelesai,
        'deskripsi' => $request->deskripsi,
        'alamat_cuti' => $request->alamat,
        'surat_pendukung' => $filePath,
    ]);



    //Untuk Ubah Absen Ke Pending for date from tanggalMulai to tanggalSelesai
    $date = $request->tanggalMulai;
    while (strtotime($date) <= strtotime($request->tanggalSelesai)) {
        $absen = Absen::where('nik', $user->nik)->where('tanggal', $date)->first();
        if (!$absen) {
            $absen = new Absen();
            $absen->nik = $user->nik;
            $absen->tanggal = $date;
        }
        $absen->status = 'pending';
        $absen->save();
        $date = date ("Y-m-d", strtotime("+1 day", strtotime($date)));
    }
    

    return redirect()->route('izin.index');
}

     public function indexDinas(){
        return Inertia::render('Admin/absenDinas');
     }

     public function indexLupaAbsen(){
        return Inertia::render('Admin/absenLupaAbsen');
     }

    
}
