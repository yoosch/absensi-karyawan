<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;

class LocationController extends Controller
{
    public function index()
{
    $lokasi = Location::all();
    // dd($lokasi);
    return inertia('Admin/adminLokasi', ['data' => $lokasi]);
}

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'latitude' => 'required|numeric',
        'longitude' => 'required|numeric',
        'radius' => 'required|numeric',
    ]);

    return Location::create($request->all());
}

public function update(Request $request, $id)
{
    $location = Location::findOrFail($id);

    $request->validate([
        'name' => 'string|max:255',
        'latitude' => 'numeric',
        'longitude' => 'numeric',
        'radius' => 'numeric',
    ]);

    $location->update($request->all());

    return $location;
}

public function destroy($id)
{
    Location::findOrFail($id)->delete();
    return redirect()->route('location.index');
}

}
