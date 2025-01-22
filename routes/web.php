<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\IzinController;
use App\Http\Controllers\AbsenController;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LocationController;

use App\Http\Controllers\RiwayatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\AbsenCutiController;
use App\Http\Controllers\Admin\AbsenDinasController;
use App\Http\Controllers\Admin\AdminAbsenController;
use App\Http\Controllers\Admin\FileController;

use App\Http\Middleware\adminMiddleware;
use App\Http\Middleware\pegawaiMiddleware;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/change-profile', [ProfileController::class, 'changeProfile'])->name('change-profile');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/preview/{filePath}', [FileController::class, 'previewFile'])->where('filePath', '.*');


    Route::middleware(adminMiddleware::class)->group(function () {
        
        //Rekap Individu
        Route::get('/rekap-individu', [AbsenController::class, 'index2'])->name('rekap.index');
        Route::get('/rekap-individu/{nik}/{bulan}/{tahun}',[AbsenController::class, 'rekapIndividu']);

        Route::resource('/pegawai', PegawaiController::class);
        
        //Approval Izin
        Route::get('approval-cuti/{id}/{status}', [AdminAbsenController::class, 'approvalIzin']);
        
        //Pegawai
        Route::put('/pegawai/{id}/update', [PegawaiController::class, 'update'])->name('pegawai.update');

        //Log Presensi
        Route::get('/log-presensi', [AbsenController::class, 'logAbsensi'])->name('log-absensi.index');
        
        //Absen
        Route::get('/absen-cuti', [AdminAbsenController::class, 'indexCuti']);
        Route::get('/absen-dinas', [AdminAbsenController::class, 'indexDinas']);
        Route::get('/absen-lupa-absen ', [AdminAbsenController::class, 'indexLupaAbsen']);
    
        //Lokasi
        Route::get('/lokasi', [LocationController::class, 'index']);
        Route::resource('location', LocationController::class);
    
    });

    Route::middleware(pegawaiMiddleware::class)->group(function () {
        
        //store Laporan Bulanan
        Route::post('/dashboard/store', [DashboardController::class, 'store'])->name('dashboard.store');

        //Absen 
        Route::get('/absen', [AbsenController::class, 'index'])->name('absen.index');
        Route::post('/absen/store', [AbsenController::class, 'store']);
        
        //Izin
        Route::get('/izin', [IzinController::class, 'index'])->name('izin.index');
        Route::post('/izin/store', [IzinController::class, 'store'])->name('izin.store');

        //Riwayat
        Route::get('/riwayat', [RiwayatController::class, 'index'])->name('riwayat.index');
    });

   
});

require __DIR__.'/auth.php';
