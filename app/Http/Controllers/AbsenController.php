<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AbsenController extends Controller
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
         return inertia('Index', [
 
         ]);
     }
}
