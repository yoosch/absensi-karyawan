<?php

use App\Http\Controllers\IzinController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AbsenController;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\RiwayatController;
use App\Http\Controllers\Admin\AbsenCutiController;
use App\Http\Controllers\Admin\AbsenDinasController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/absen', [AbsenController::class, 'index'])->middleware(['auth', 'verified'])->name('absen.index');
Route::post('/absen/store', [AbsenController::class, 'store']);

Route::get('/izin', [IzinController::class, 'index'])->middleware(['auth', 'verified'])->name('izin.index');
Route::post('/izin/store', [IzinController::class, 'store'])->name('izin.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/riwayat', [RiwayatController::class, 'index'])->middleware(['auth', 'verified'])->name('riwayat.index');

Route::get('/rekap-individu/{nik}/{bulan}/{tahun}',[AbsenController::class, 'rekapIndividu'])->middleware(['auth', 'verified']);


Route::get('/dashboardAdmin', function () {
    return Inertia::render('Admin/dashboardAdmin');
});

Route::resource('/pegawai', PegawaiController::class);
Route::get('/rekap', [AbsenController::class, 'index2'])->middleware(['auth', 'verified'])->name('rekap.index');

Route::get('/absenCuti', [AbsenCutiController::class, 'indexCuti'])->middleware(['auth', 'verified']);

Route::get('/absenDinas', [AbsenDinasController::class, 'index'])->middleware(['auth', 'verified']);
Route::get('/absenLupaAbsen ', [IzinController::class, 'indexLupaAbsen'])->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
