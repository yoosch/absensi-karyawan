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

    
        $currentDate = Carbon::now()->format('Y-m-d');
        $currentTime = Carbon::now()->format('H:i:s');

        // Check if it's past 12:00
        $isOverTwelve = $currentTime > '12:00:00';

        // Find the attendance record for today by NIK
        $absen = Absen::where('nik', $user->nik)
            ->where('tanggal', $currentDate)
            ->first();

        if ($isOverTwelve) {
            // Absen keluar logic
            if (!$absen) {
                // Create a new record for absen keluar only
                $absen = new Absen();
                $absen->nik = $user->nik;
                $absen->tanggal = $currentDate;

                $image = $request->input('photo_url');
                $imagePath = null;

                if ($image) {
                    $image = str_replace('data:image/png;base64,', '', $image);
                    $image = str_replace(' ', '+', $image);
                    $imageName = 'images/absence/' . date('H-i-s') . '-' . uniqid() . '.png';
                    Storage::disk('public')->put($imageName, base64_decode($image)); 
                    $imagePath = Storage::url($imageName);
                }
            }

            // Update absen keluar fields
            $absen->waktu_keluar = $request->input('waktu_keluar');
            $absen->koordinat_keluar = $request->input('koordinat_keluar');

            // Delete old photo_keluar if exists
            if ($absen->photo_keluar_url) {
                Storage::disk('public')->delete(str_replace('/storage', '', $absen->photo_keluar_url));
            }

            $absen->photo_keluar_url = $imagePath;
            $absen->save();
        } else {
            // Absen masuk logic
            if (!$absen) {
                // Create a new record for absen masuk

                $image = $request->input('photo_url');
                $imagePath = null;

                if ($image) {
                    $image = str_replace('data:image/png;base64,', '', $image);
                    $image = str_replace(' ', '+', $image);
                    $imageName = 'images/absence/' . date('H-i-s') . '-' . uniqid() . '.png';
                    Storage::disk('public')->put($imageName, base64_decode($image)); 
                    $imagePath = Storage::url($imageName);
                }


                $absen = new Absen();
                $absen->nik = $user->nik;
                $absen->tanggal = $currentDate;
                $absen->waktu_masuk = $request->input('waktu_masuk');
                $absen->koordinat_masuk = $request->input('koordinat_masuk');
                $absen->photo_masuk_url = $imagePath;
                $absen->status = 'hadir';
                $absen->save();
            } else {
                // Ignore duplicate absen masuk before 12:00
                $message = 'Absen anda sudah masuk jam '.$absen->waktu_masuk.'!';
                return response()->json(['message' => $message], 400);
            }
}
    
    return response()->json(['message' => 'Absen Berhasil'],201);
}


public function rekapIndividu($nik, $bulan, $tahun){


    $startDate = Carbon::createFromDate($tahun, Carbon::parse($bulan)->format('m'), 1);
    $endDate = $startDate->copy()->endOfMonth();

    $dataAbsen = collect();
    for ($date = $startDate->copy(); $date <= $endDate; $date->addDay()) {
        $dataAbsen->push([
            'tanggal' => $date->format('Y-m-d'),
            'hari' => $date->locale('id')->translatedFormat('l'), 
            'inn' => null,
            'out' => null,
            'status' => 'alpha',
            'masuk' => false,
            'telat' => false,
            'wk' => 0,
            'lembur' => 0,
            'kj' => 0,
            'alpha' => false,
            'dl' => false,
            's' => false,
            'la' => false,
            'formatted_tanggal' => $date->format('d/m/Y')
        ]);
    }

    $absen = Absen::where('nik', $nik)
        ->whereYear('tanggal', $tahun)
        ->whereMonth('tanggal', Carbon::parse($bulan)->format('m'))
        ->get();

    foreach ($absen as $item) {
        //waktu kerja in hour

        $inn = $item->waktu_masuk;
        //check if $waktu masuk not exist then $inn = 12:00
        if($inn == null){
            $inn = '12:00';
        }

        //check if $waktu keluar not exist then $out = 12:00

        $out = $item->waktu_keluar;
        if($out == null){
            $out = '12:00';
        }


        $item->waktu_kerja = Carbon::parse($inn)->diffInHours(Carbon::parse($out));

        $item->kj = 0;
        $item->lembur = 0;
        if($item->waktu_kerja < 7.5){
            $item->kj = (7.5 - $item->waktu_kerja)*60;
        }else{
            $item->lembur = ($item->waktu_kerja - 7.5)*60;
        }

        $item->telat = $item->waktu_masuk > '08:00:00' && $item->waktu_masuk != null;

    };
        
    $dataAbsen = $dataAbsen->map(function ($item) use ($absen) {
        $match = $absen->firstWhere('tanggal', $item['tanggal']);
        if ($match) {
            $item['inn'] = $match->waktu_masuk;
            $item['out'] = $match->waktu_keluar;
            $item['status'] = $match->status;
            $item['masuk'] = $match->waktu_masuk != null;
            $item['wk'] = $match->waktu_kerja;
            $item['kj'] = $match->kj;
            $item['lembur'] = $match->lembur;
            $item['telat'] = $match->telat;
            $item['alpha'] = $match->status == 'alpha';
            $item['dl'] = $match->status == 'dinas';
            $item['s'] = $match->status == 'sakit';
            $item['la'] = $match->status == 'lupaabsen';
        }
        return $item;
    });
    return response()->json($dataAbsen);
}

}
