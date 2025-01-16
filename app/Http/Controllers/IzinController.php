<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Izin;
use Illuminate\Support\Facades\Auth;

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
  
          //return view
          return Inertia::render('izin');
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
    $izin = $request->tipeIzin . ' ' . $request->jenisCuti;

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

    return redirect()->route('izin.index');
}

     public function indexDinas(){
        return Inertia::render('Admin/absenDinas');
     }

     public function indexLupaAbsen(){
        return Inertia::render('Admin/absenLupaAbsen');
     }

    
}
