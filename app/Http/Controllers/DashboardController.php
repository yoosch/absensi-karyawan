<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Menampilkan halaman dashboard.
     *
     * @return \Illuminate\View\View    
     */
    public function index()
    {
        // Anda bisa menambahkan data yang ingin ditampilkan di dashboard
        // Misalnya data statistik atau data dari database
        return inertia('dashboard', [
 
        ]);
    }
}

