<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\Absen;
use App\Models\Location;
use App\Models\User;
use App\Models\Shift;
use Inertia\Inertia;
use Carbon\Carbon;

class AbsenController extends Controller
{
    public function index(){

        $lokasi = Location::all();
        return Inertia::render('absence', ['lokasi' => $lokasi]);
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

    public function store(Request $request)
    {

        $user = auth()->user();
        $shiftUser = Shift::where('id', $user->shift)->first();

        $currentDate = Carbon::now()->format('Y-m-d');
        $currentTime = Carbon::now()->format('H:i:s');

        $isTurningPoint = $currentTime > $shiftUser->turning_point;
        $isBeforeMulai = $currentTime < $shiftUser->mulai_jam_masuk;
        $isAfterSelesai = $currentTime > $shiftUser->selesai_jam_keluar;

        $absen = Absen::where('nik', $user->nik)
            ->where('tanggal', $currentDate)
            ->first();

        if ($isTurningPoint) {
            
            if($isAfterSelesai){
                return response()->json(['message' => 'Anda Sudah Tidak Bisa Keluar'], 400);
            }else{
        
                $image = $request->input('photo_url');
                $imagePath = null;

                if ($image) {
                    $image = str_replace('data:image/png;base64,', '', $image);
                    $image = str_replace(' ', '+', $image);
                    $imageName = 'images/absence/' . date('H-i-s') . '-' . uniqid() . '.png';
                    Storage::disk('public')->put($imageName, base64_decode($image));
                    $imagePath = Storage::url($imageName);
                }
                
                if (!$absen) {
                    // Create a new record for absen keluar only
                    $absen = new Absen();
                    $absen->nik = $user->nik;
                    $absen->tanggal = $currentDate;
                    $absen->status = 'la';
                }else{
                    $absen->status = 'hadir';
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
            }
        } 
        
        else {
            if ($isBeforeMulai) {
                return response()->json(['message' => 'Belum saatnya absen masuk'], 400);
            }
            else {
                if (!$absen) {
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
                    $absen->status = 'la';
                    $absen->save();
                } else {
                    // Ignore duplicate absen masuk before 12:00
                    $message = 'Absen anda sudah masuk jam ' . $absen->waktu_masuk . '!';
                    return response()->json(['message' => $message], 400);
                }
            }
    
            return response()->json(['message' => 'Absen Berhasil'], 201);
            }
            
           
    } 

    public function rekapIndividu($nik, $bulan, $tahun)
    {

        $user = User::where('nik', $nik)->first();
        $bulan = (int) $bulan;
        $startDate = Carbon::createFromDate($tahun, Carbon::parse($bulan)->format('m'), 1);
        $endDate = $startDate->copy()->endOfMonth();

        $shiftUser = Shift::where('id', $user->shift)->first();


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
                'c' => false,
                'formatted_tanggal' => $date->format('d/m/Y')
            ]);
        }

        $absen = Absen::where('nik', $nik)
            ->whereYear('tanggal', $tahun)
            ->whereMonth('tanggal', Carbon::parse($bulan)->format('m'))
            ->get();

        $isDownloadable = true;



            foreach ($absen as $item) {
                //waktu kerja in hour
                $hari = Carbon::parse($item->tanggal)->locale('id')->translatedFormat('l');
                if($hari == 'Minggu' || $hari == 'Sabtu'){
                    continue;
                }
    
                if($item->status == 'pending'){
                    $isDownloadable = false;
                }
                $inn = $item->waktu_masuk;
     
                if($inn == null){
                    $inn = $shiftUser->turning_point;
                }

                $out = $item->waktu_keluar;
                if($out == null){
                    $out = $shiftUser->turning_point;
                }
    
                $item->waktu_kerja = 0;
                
                $item->kj = 0;
                $item->lembur = 0;

                $durasiIstirahat = ($shiftUser->durasi_istirahat)/60;
                $durasiIstirahatJumat = ($shiftUser->durasi_istirahat_jumat)/60;

                $jamKerja = $shiftUser->jam_kerja;

                //jamtelat = userShift->jam_masuk + 30 menit
                $jamTelat = Carbon::parse($shiftUser->mulai_jam_masuk)->addMinutes(30)->format('H:i:s');

                
    
                if($item->status == 'la' || $item->status == 'hadir'){
    
                    $item->waktu_kerja = Carbon::parse($inn)->diffInHours(Carbon::parse($out));
                    $item->waktu_kerja = $hari == 'Jumat' ? $item->waktu_kerja - $durasiIstirahatJumat : $item->waktu_kerja - $durasiIstirahat;
                    if($item->waktu_kerja < $jamKerja){
                        $item->kj = ($jamKerja - $item->waktu_kerja)*60;
                    }else{
                        $item->lembur = ($item->waktu_kerja - $jamKerja)*60;
                    }
    
                    $item->telat = $item->waktu_masuk > $jamTelat && $item->waktu_masuk != null;
                }
    
            };

        
            
        $dataAbsen = $dataAbsen->map(function ($item) use ($absen) {
            $match = $absen->firstWhere('tanggal', $item['tanggal']);
            if ($match) {
                $item['inn'] = $match->waktu_masuk;
                $item['out'] = $match->waktu_keluar;
                $item['status'] = $match->status;
                $item['masuk'] = $match->waktu_masuk != null;
                $item['wk'] = ceil($match->waktu_kerja);
                $item['kj'] = floor($match->kj);
                $item['lembur'] = $match->lembur;
                $item['telat'] = $match->telat;
                $item['alpha'] = $match->status == 'alpha';
                $item['dl'] = $match->status == 'dl';
                $item['s'] = $match->status == 's';
                $item['la'] = $match->status == 'la';
                $item['c'] = $match->status == 'c';
            }
            return $item;
        });



        return response()->json(['dataAbsen' => $dataAbsen, 'isDownloadable' => $isDownloadable, 'user' => $user]);
    }

    public function countDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371; // km

        $latFrom = deg2rad($lat1);
        $lonFrom = deg2rad($lon1);
        $latTo = deg2rad($lat2);
        $lonTo = deg2rad($lon2);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
        return $angle * $earthRadius;
    }
    
public function logAbsensi()
    {

        $data = User::all();
        $absen = Absen::all();

        $location = Location::all();

        $absen = $absen->map(function ($item) {
            $item->hari = Carbon::parse($item->tanggal)->locale('id')->translatedFormat('l');
            $item->nama = User::where('nik', $item->nik)->first()->name;    
            $item->photo_masuk_url = $item->photo_masuk_url?url("/preview/" . urlencode($item->photo_masuk_url)):null;
            $item->photo_keluar_url = $item->photo_keluar_url?url("/preview/" . urlencode($item->photo_keluar_url)):null;
            $item->distance_masuk = 0;
            $item->distance_keluar = 0;
            return $item;
        });

        foreach ($absen as $item) {

            $koordinat_masuk = json_decode($item->koordinat_masuk);
            $koordinat_keluar = json_decode($item->koordinat_keluar);
            //count minimum of distance between user location and location in database

            if($koordinat_masuk){
                foreach($location as $loc){
                    $distance = $this->countDistance($koordinat_masuk->latitude, $koordinat_masuk->longitude, $loc->latitude, $loc->longitude);
                    if($distance < $item->distance_masuk || $item->distance_masuk == 0){
                        //change to distance to meter and precision 2
                        $item->distance_masuk = round($distance * 1000, 2);
                    }
                }
            }

            if($koordinat_keluar){
                foreach($location as $loc){
                    $distance = $this->countDistance($koordinat_keluar->latitude, $koordinat_keluar->longitude, $loc->latitude, $loc->longitude);
                    if($distance < $item->distance_keluar || $item->distance_keluar == 0){
                        $item->distance_keluar = round($distance * 1000, 2);
                    }
                }
            }
        }
        // dd($absen);
        return Inertia::render('Admin/logAbsensi', ['logAbsen' => $absen]);
    }

}


