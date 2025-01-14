<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\Absen;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;

class AbsenController extends Controller
{
    public function index(){
        return Inertia::render('absence');
    }

    public function index2(){
        $data = User::all();
        $absen = Absen::all();

        $absen = $absen->map(function ($item) {
            $item->hari = Carbon::parse($item->tanggal)->locale('id')->translatedFormat('l'); // Nama hari dalam bahasa Indonesia
            return $item;
        });
        // dd($absen);
        return Inertia::render('Admin/rekap', ['data' => $data, 'absen' => $absen]);
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
        Storage::put($imageName, base64_decode($image));
        $imagePath = Storage::url($imageName);
    }

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
        $absence->status = 'hadir';
        $absence->save();
    }

    return redirect()->route('dashboard');

}


public function rekapIndividu($nik, $bulan, $tahun){


    $startDate = Carbon::createFromDate($tahun, Carbon::parse($bulan)->format('m'), 1);
    $endDate = $startDate->copy()->endOfMonth();

    // Generate all dates in the month
    $dataAbsen = collect();
    for ($date = $startDate->copy(); $date <= $endDate; $date->addDay()) {
        $dataAbsen->push([
            'tanggal' => $date->toDateString(),
            'hari' => $date->locale('id')->translatedFormat('l'), // Day name in Indonesian
            'inn' => null,
            'out' => null,
            'status' => 'alpha',
        ]);
    }

    // Fetch attendance records for the given NIK, month, and year
    $absen = Absen::where('nik', $nik)
        ->whereYear('tanggal', $tahun)
        ->whereMonth('tanggal', Carbon::parse($bulan)->format('m'))
        ->get();

    // Map the attendance data into the generated dates
    $dataAbsen = $dataAbsen->map(function ($item) use ($absen) {
        $match = $absen->firstWhere('tanggal', $item['tanggal']);
        if ($match) {
            $item['inn'] = $match->waktu_masuk;
            $item['out'] = $match->waktu_keluar;
            $item['status'] = $match->status;
        }
        return $item;
    });

    // Return the final JSON response
    return response()->json($dataAbsen);
}

}
