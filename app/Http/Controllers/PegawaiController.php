<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class PegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $data = User::all();


        foreach($data as $item){
            $item->avatar = 'https://i.pravatar.cc/150?u=a042581f4e29026024d';
        }

        // dd($data);

        
        return Inertia::render('Admin/adminPegawai', ['data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // dd($request->all());
        $request -> validate([
            'nama' => 'required',
            'email' => 'required',
            'nik' => 'required',
        ]);
        
        $data = [
            'name' => $request->nama,
            'email' => $request->email,
            'nik' => $request->nik,
            'password' => '12345678',
        ];
        // dd($data);
        User::create($data);
        return redirect()->route('pegawai.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::destroy($id);
        return redirect()->route('pegawai.index');
    }
}
