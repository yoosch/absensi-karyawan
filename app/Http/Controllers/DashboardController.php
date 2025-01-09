<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Menampilkan halaman dashboard.
     *
     * @return \Illuminate\View\View    
     */
    public function index()
    {
        $user = auth()->user();


        if($user->role == 'admin'){
            return Inertia::render('Admin/dashboard',['user' => $user]);
        }else{
            return Inertia::render('dashboard',['user' => $user]);   
        }
    }
}

