<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Absen;
use Inertia\Inertia;
use Carbon\Carbon;

class AbsenController extends Controller
{
    public function index(){
        return Inertia::render('absence');
    }

    public function store(Request $request){

    $user = auth()->user();

    
    Absen::where('nik', $request->input('nik'))
    ->where('waktu_masuk', $request->input('waktu_masuk'))
    ->first();
    
    $image = $request->input('photo_url');
    $imagePath = null;

    if ($image) {
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = 'images/absence/' . date('H-i-s') . '-' . uniqid() . '.png';
        Storage::disk('public')->put($imageName, base64_decode($image)); 
        $imagePath = Storage::url($imageName);
    }
    // return response()->json(['data' => $request->all()]);
    
    $absen = Absen::where('nik',$user->nik)
        ->where('tanggal', Carbon::now()->format('Y-m-d'))
        ->first();

    if ($absen){
        $absen->waktu_keluar = $request->input('waktu_keluar');
        $absen->koordinat_keluar = $request->input('koordinat_keluar');
        $absen->photo_keluar_url = $imagePath;
        $absen->save();
    }else{
        $absence = new Absen();
        $absence->nik = $user->nik;
        $absence->tanggal = Carbon::now()->format('Y-m-d');
        $absence->waktu_masuk = $request->input('waktu_masuk');
        $absence->koordinat_masuk = $request->input('koordinat_masuk');
        $absence->photo_masuk_url = $imagePath;
        $absence->save();
    }
    
    

    /*return back to other page with route*/
    return response()->json(['message' => 'Absen Berhasil'],201);


}

}
