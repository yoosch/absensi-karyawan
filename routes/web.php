<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AbsenController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/absen', [AbsenController::class, 'index'])->middleware(['auth', 'verified'])->name('absen.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/riwayat', function () {
    return Inertia::render('riwayat');
});

Route::get('/preview', function () {
    return Inertia::render('preview');
});

Route::get('/dashboardAdmin', function () {
    return Inertia::render('Admin/dashboardAdmin');
});

Route::get('adminPegawai', function () {
    return Inertia::render('Admin/adminPegawai');
});

require __DIR__.'/auth.php';
