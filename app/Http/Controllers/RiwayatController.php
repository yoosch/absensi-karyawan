<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Absen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RiwayatController extends Controller
{
    //
    public function index() {
        
        $user = auth()->user();
        $dataAbsen = Absen::where('nik', $user->nik)->get();

        
        // dd($dataAbsen);

        return Inertia::render('riwayat', [
            'dataAbsen' => $dataAbsen
        ]);
    }
}
