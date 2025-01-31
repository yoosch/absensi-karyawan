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
        ->where('jenis_izin', 'la')
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
            'tanggalMulai' => 'required|date',
            'tanggalSelesai' => 'required|date',
            'deskripsi' => 'required|string',  
            'pathSurat' => 'required|file|mimes:pdf|max:5120',
        ]);

        // dd($request->all());
    
    $user = Auth::user();
    $izin = '';

    $dataIzin = [
        'nik' => $user->nik,
        'jenis_izin' => '',
        'tanggal_mulai' => $request->tanggalMulai,
        'tanggal_selesai' => $request->tanggalSelesai,
        'deskripsi' => $request->deskripsi,
        'surat_pendukung' => '',
        'jenis_lupa_absen' => '',
        'jam_lupa_absen' => '',
        'alamat_cuti' => '',
    ];

    if($request->tipeIzin == 'cuti'){
        $request->validate([
            'jenisCuti' => 'required|string',
        ]);

        if($request->jenisCuti == 'tahunan' || $request->jenisCuti == 'khusus'){

            $request->validate([
                'alamat' => 'required|string',
            ]);

            if ($request->jenisCuti == 'tahunan'){
                $izin = 'c';
            }
            else if ($request->jenisCuti == 'khusus'){
                $izin = 'k';
            }
            $dataIzin['alamat_cuti'] = $request->alamat;
        } 
        else if($request->jenisCuti == 'sakit'){
            $izin = 's';
        }

    } else if($request->tipeIzin == 'dinas'){
        $izin = 'dl';
    } else if($request->tipeIzin == 'lupa absen'){

        $request->validate([
            'jenisLupaAbsen' => 'required|string',
            'jamLupaAbsen' => 'required',
        ]);

        // dd($dataIzin);
        $dataIzin['jenis_lupa_absen'] = $request->jenisLupaAbsen;
        // $dataIzin['jam_lupa_absen'] = $request->jamLupaAbsen;
        $dataIzin['jam_lupa_absen'] = $request->jamLupaAbsen['hour'] . ':' . $request->jamLupaAbsen['minute'] . ':' . $request->jamLupaAbsen['second'];

        $izin = 'la';
    }
    
    $dataIzin['jenis_izin'] = $izin;
    
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
        else if($request->jenisCuti == "khusus"){
            $filePath = $request->file('pathSurat')->storeAs(
                'Surat_Pendukung_Cuti/Khusus/' . $user->nik . '_' . $user->name, 
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

    $dataIzin['surat_pendukung'] = $filePath;  

    Izin::create($dataIzin);

    // dd($dataIzin);

    //Untuk Ubah Absen Ke Pending for date from tanggalMulai to tanggalSelesai
    $date = $request->tanggalMulai;
    while (strtotime($date) <= strtotime($request->tanggalSelesai)) {

        //check if date is weekend
        $day = date('D', strtotime($date));
        if ($day == 'Sat' || $day == 'Sun') {
            $date = date ("Y-m-d", strtotime("+1 day", strtotime($date)));
            continue;
        }
        
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
