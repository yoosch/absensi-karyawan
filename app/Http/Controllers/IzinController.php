<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class IzinController extends Controller
{
        /**
     * index
     *
     * @return void
     */
    

     public function indexCuti()
     {
         //get all posts
         // $posts = Post::latest()->get();
 
         //return view
         return Inertia::render('Admin/absenCuti');
     }

     public function indexDinas(){
        return Inertia::render('Admin/absenDinas');
     }

     public function indexLupaAbsen(){
        return Inertia::render('Admin/absenLupaAbsen');
     }

    
}
