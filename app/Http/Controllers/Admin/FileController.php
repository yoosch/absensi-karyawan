<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function previewFile($filePath)
    {
        // Decode the file path if it was encoded in the URL
        $filePath = urldecode($filePath);
        $filePath = str_replace('storage/', '', $filePath);
        // dd(Storage::disk('public')->exists($filePath));



        // Check if the file exists
        if (Storage::disk('public')->exists($filePath)) {
            return response()->file("storage/{$filePath}");
        }

        // File not found
        abort(404, 'File not found');
    }
}
