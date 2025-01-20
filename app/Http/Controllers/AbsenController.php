<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\Absen;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;

class AbsenController extends Controller
{
    public function index()
    {
        return Inertia::render('absence');
    }

    public function index2()
    {
        $data = User::all();
        $absen = Absen::all();

        $absen = $absen->map(function ($item) {
            $item->hari = Carbon::parse($item->tanggal)->locale('id')->translatedFormat('l'); // Nama hari dalam bahasa Indonesia
            return $item;
        });
        // dd($absen);
        return Inertia::render('Admin/rekap', ['data' => $data, 'absen' => $absen]);
    }

    public function store(Request $request)
    {

        $user = auth()->user();


        $currentDate = Carbon::now()->format('Y-m-d');
        $currentTime = Carbon::now()->format('H:i:s');

        // Check if it's past 12:00
        $isOverTwelve = $currentTime > '12:00:00';

        // Check if it's past 16:00
        $isOverSixteen = $currentTime > '16:00:00';

        $isBeforeFourteen = $currentTime < '14:00:00';

        // Find the attendance record for today by NIK
        $absen = Absen::where('nik', $user->nik)
            ->where('tanggal', $currentDate)
            ->first();

        if ($user->shift == 'Pagi') {
            if ($isOverTwelve) {
                // Absen keluar logic
                $image = $request->input('photo_url');
                $imagePath = null;

                if ($image) {
                    $image = str_replace('data:image/png;base64,', '', $image);
                    $image = str_replace(' ', '+', $image);
                    $imageName = 'images/absence/' . date('H-i-s') . '-' . uniqid() . '.png';
                    Storage::disk('public')->put($imageName, base64_decode($image));
                    $imagePath = Storage::url($imageName);
                }

                if (!$absen) {
                    // Create a new record for absen keluar only
                    $absen = new Absen();
                    $absen->nik = $user->nik;
                    $absen->tanggal = $currentDate;

                    
                }

                // Update absen keluar fields
                $absen->waktu_keluar = $request->input('waktu_keluar');
                $absen->koordinat_keluar = $request->input('koordinat_keluar');

                // Delete old photo_keluar if exists
                if ($absen->photo_keluar_url) {
                    Storage::disk('public')->delete(str_replace('/storage', '', $absen->photo_keluar_url));
                }

                $absen->photo_keluar_url = $imagePath;
                $absen->save();
            } else {
                // Absen masuk logic
                if (!$absen) {
                    // Create a new record for absen masuk

                    $image = $request->input('photo_url');
                    $imagePath = null;

                    if ($image) {
                        $image = str_replace('data:image/png;base64,', '', $image);
                        $image = str_replace(' ', '+', $image);
                        $imageName = 'images/absence/' . date('H-i-s') . '-' . uniqid() . '.png';
                        Storage::disk('public')->put($imageName, base64_decode($image));
                        $imagePath = Storage::url($imageName);
                    }


                    $absen = new Absen();
                    $absen->nik = $user->nik;
                    $absen->tanggal = $currentDate;
                    $absen->waktu_masuk = $request->input('waktu_masuk');
                    $absen->koordinat_masuk = $request->input('koordinat_masuk');
                    $absen->photo_masuk_url = $imagePath;
                    $absen->status = 'hadir';
                    $absen->save();
                } else {
                    // Ignore duplicate absen masuk before 12:00
                    $message = 'Absen anda sudah masuk jam ' . $absen->waktu_masuk . '!';
                    return response()->json(['message' => $message], 400);
                }
            }
        } else {
            if ($isOverSixteen) {
                // Absen keluar logic
                $image = $request->input('photo_url');
                $imagePath = null;

                if ($image) {
                        
                    $image = str_replace('data:image/png;base64,', '', $image);
                    $image = str_replace(' ', '+', $image);
                    $imageName = 'images/absence/' . date('H-i-s') . '-' . uniqid() . '.png';
                    Storage::disk('public')->put($imageName, base64_decode($image));
                    $imagePath = Storage::url($imageName);
                }
                
                if (!$absen) {
                    // Create a new record for absen keluar only
                    $absen = new Absen();
                    $absen->nik = $user->nik;
                    $absen->tanggal = $currentDate;

                    
                }

                // Update absen keluar fields
                $absen->waktu_keluar = $request->input('waktu_keluar');
                $absen->koordinat_keluar = $request->input('koordinat_keluar');

                // Delete old photo_keluar if exists
                if ($absen->photo_keluar_url) {
                    Storage::disk('public')->delete(str_replace('/storage', '', $absen->photo_keluar_url));
                }

                $absen->photo_keluar_url = $imagePath;
                $absen->save();
            }
            else {
                if ($isBeforeFourteen) {
                    return response()->json(['message' => 'Tidak bisa absen, Anda shift 2!'], 400);
                }
                else {
                     // Absen masuk logic
                if (!$absen) {
                    // Create a new record for absen masuk

                    $image = $request->input('photo_url');
                    $imagePath = null;

                    if ($image) {
                        $image = str_replace('data:image/png;base64,', '', $image);
                        $image = str_replace(' ', '+', $image);
                        $imageName = 'images/absence/' . date('H-i-s') . '-' . uniqid() . '.png';
                        Storage::disk('public')->put($imageName, base64_decode($image));
                        $imagePath = Storage::url($imageName);
                    }


                    $absen = new Absen();
                    $absen->nik = $user->nik;
                    $absen->tanggal = $currentDate;
                    $absen->waktu_masuk = $request->input('waktu_masuk');
                    $absen->koordinat_masuk = $request->input('koordinat_masuk');
                    $absen->photo_masuk_url = $imagePath;
                    $absen->status = 'hadir';
                    $absen->save();
                } else {
                    // Ignore duplicate absen masuk before 12:00
                    $message = 'Absen anda sudah masuk jam ' . $absen->waktu_masuk . '!';
                    return response()->json(['message' => $message], 400);
                }
                }
            }
        }

        return response()->json(['message' => 'Absen Berhasil'], 201);
    }


     
}
