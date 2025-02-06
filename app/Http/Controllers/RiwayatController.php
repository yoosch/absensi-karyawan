<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Absen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class RiwayatController extends Controller
{
    //
    public function index() {
        
        $user = auth()->user();

        //get bulan in integer
        $bulan = Carbon::now()->format('m');
        //change bulan to integer
        $bulan = (int)$bulan;
        $tahun = Carbon::now()->format('Y');
        $nik = $user->nik;
        $startDate = Carbon::createFromDate($tahun, Carbon::parse($bulan)->format('m'), 1);
        $endDate = $startDate->copy()->endOfMonth();

        $dataAbsen = collect();
        for ($date = $startDate->copy(); $date <= $endDate; $date->addDay()) {
            $dataAbsen->push([
                'tanggal' => $date->format('Y-m-d'),
                'hari' => $date->locale('id')->translatedFormat('l'), 
                'waktu_masuk' => null,
                'waktu_keluar' => null,
                'status' => 'alpha',
            ]);
        }

        $absen = Absen::where('nik', $nik)
        ->whereYear('tanggal', $tahun)
        ->whereMonth('tanggal', Carbon::parse($bulan)->format('m'))
        ->get();

        $dataAbsen = $dataAbsen->map(function ($item) use ($absen) {
            $match = $absen->firstWhere('tanggal', $item['tanggal']);
            if ($match) {
                $item['waktu_masuk'] = $match->waktu_masuk;
                $item['waktu_keluar'] = $match->waktu_keluar;
                $item['status'] = $match->status;
            }
            return $item;
        });




        
        // dd($dataAbsen);

        return Inertia::render('riwayat', [
            'dataAbsen' => $dataAbsen
        ]);
    }

    public function filter(Request $request) {
        $user = auth()->user();
        $bulan = $request->bulan;
        $tahun = $request->tahun;
        $nik = $user->nik;
        $startDate = Carbon::createFromDate($tahun, $bulan, 1);
        $endDate = $startDate->copy()->endOfMonth();

        $dataAbsen = collect();
        for ($date = $startDate->copy(); $date <= $endDate; $date->addDay()) {
            $dataAbsen->push([
                'tanggal' => $date->format('Y-m-d'),
                'hari' => $date->locale('id')->translatedFormat('l'), 
                'waktu_masuk' => null,
                'waktu_keluar' => null,
                'status' => 'alpha',
            ]);
        }

        $absen = Absen::where('nik', $nik)
        ->whereYear('tanggal', $tahun)
        ->whereMonth('tanggal', $bulan)
        ->get();

        $dataAbsen = $dataAbsen->map(function ($item) use ($absen) {
            $match = $absen->firstWhere('tanggal', $item['tanggal']);
            if ($match) {
                $item['waktu_masuk'] = $match->waktu_masuk;
                $item['waktu_keluar'] = $match->waktu_keluar;
                $item['status'] = $match->status;
            }
            return $item;
        });

        return response()->json($dataAbsen);
    }
}
