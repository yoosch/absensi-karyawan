<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Izin;

class IzinController extends Controller
{
        /**
     * index
     *
     * @return void
     */
      public function index()
      {
          //get all posts
          // $posts = Post::latest()->get();
  
          //return view
          return Inertia::render('izin');
      }
    

     public function indexCuti()
     {
         //get all posts
         $izins = Izin::all();
 
         //return view
         return Inertia::render('Admin/absenCuti', ['data' => $izins]);
     }

     public function indexDinas(){
        return Inertia::render('Admin/absenDinas');
     }

     public function indexLupaAbsen(){
        return Inertia::render('Admin/absenLupaAbsen');
     }

    
}
