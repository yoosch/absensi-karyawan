<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Laporan_Bulanan;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class LaporanController extends Controller
{
    public function index() {
        $user = auth()->user();

        $laporan_bulanan = Laporan_Bulanan::where('nik', $user->nik)->where('bulan',Carbon::now()->format('m'))->where('tahun',Carbon::now()->year)->get();
        return inertia::render('laporan', [
            'laporan_bulanan' => $laporan_bulanan
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'file_laporan' => 'required|file|mimes:pdf|max:30720',
        ]);
        
        
        $user = auth()->user();
        
        Carbon::setLocale('id');
        
        $bulan = Carbon::now()->format('m');
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

        return response()->json(['message' => 'Laporan berhasil diunggah']);
    }
}
