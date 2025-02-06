<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Shift;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shifts = Shift::all();
        return Inertia::render('Admin/shift', ['data' => $shifts]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dataShift = new Shift();
        $dataShift->nama = $request->nama;
        $dataShift->mulai_jam_masuk = $request->mulaiJamMasuk ? $request->mulaiJamMasuk['hour'] . ':' . $request->mulaiJamMasuk['minute'] : '00:00';
        $dataShift->jam_masuk = $request->jamMasuk['hour'] . ':' . $request->jamMasuk['minute'];
        $dataShift->turning_point = $request->turningPoint['hour'] . ':' . $request->turningPoint['minute'];
        $dataShift->jam_keluar = $request->jamKeluar['hour'] . ':' . $request->jamKeluar['minute'];
        $dataShift->selesai_jam_keluar = $request->selesaiJamKeluar ? $request->selesaiJamKeluar['hour'] . ':' . $request->selesaiJamKeluar['minute'] : '23:59';
        $dataShift->jam_kerja = $request->jamKerja;
        $dataShift->durasi_istirahat = $request->durasiIstirahat;
        $dataShift->durasi_istirahat_jumat =$request->durasiIstirahatJumat;
        $dataShift->save();

        return response()->json(['message' => 'Shift Berhasil Dibuat!']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $dataShift = Shift::findOrFail($id);
        $dataShift->nama = $request->nama;
        $dataShift->mulai_jam_masuk = $request->mulaiJamMasuk ? $request->mulaiJamMasuk['hour'] . ':' . $request->mulaiJamMasuk['minute'] : null;
        $dataShift->jam_masuk = $request->jamMasuk['hour'] . ':' . $request->jamMasuk['minute'];
        $dataShift->turning_point = $request->turningPoint['hour'] . ':' . $request->turningPoint['minute'];
        $dataShift->jam_keluar = $request->jamKeluar['hour'] . ':' . $request->jamKeluar['minute'];
        $dataShift->selesai_jam_keluar = $request->selesaiJamKeluar ? $request->selesaiJamKeluar['hour'] . ':' . $request->selesaiJamKeluar['minute'] : null;
        $dataShift->jam_kerja = $request->jamKerja;
        $dataShift->durasi_istirahat = $request->durasiIstirahat;
        $dataShift->durasi_istirahat_jumat =$request->durasiIstirahatJumat;
        $dataShift->save();
        return response()->json(['message' => 'Shift Berhasil Diubah!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Shift::findOrFail($id)->delete();
        return redirect()->route('shift.index');
    }
}
