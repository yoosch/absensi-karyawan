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
        $request->validate([
            'nama' => 'required|string',
            'mulai_jam_masuk' => 'string',
            'jam_masuk' => 'required|string',
            'turning_point' => 'required|string',
            'jam_keluar' => 'required|string',
            'selesai_jam_keluar' => 'string',
            'jam_kerja' => 'required|string',
            'durasi_istirahat' => 'string',
            'durasi_istirahat_jumat' => 'string',
        ]);
        return Shift::create($request->all());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $shift = Shift::findOrFail($id);
        $request->validate([
            'nama' => 'string',
            'mulai_jam_masuk' => 'string',
            'jam_masuk' => 'string',
            'turning_point' => 'string',
            'jam_keluar' => 'string',
            'selesai_jam_keluar' => 'string',
            'jam_kerja' => 'string',
            'durasi_istirahat' => 'string',
            'durasi_istirahat_jumat' => 'string',
        ]);
        $shift->update($request->all());
        return $shift;
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
