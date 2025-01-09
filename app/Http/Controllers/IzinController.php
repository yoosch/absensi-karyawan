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
    

     public function index()
     {
         //get all posts
         // $posts = Post::latest()->get();
 
         //return view
         return Inertia::render('izin');
     }

    
}
