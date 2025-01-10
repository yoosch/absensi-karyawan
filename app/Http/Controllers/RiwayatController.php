<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Absen;
use Inertia\Inertia;

class RiwayatController extends Controller
{
    //
    public function index() {
        
        $user = auth()->user();
        $dataAbsen = Absen::where('nik', $user->nik)->get();

        return Inertia::render('riwayat', [
            'dataAbsen' => $dataAbsen
        ]);
    }
}
