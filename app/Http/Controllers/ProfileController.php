<?php

namespace App\Http\Controllers;


use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $photo = url("/preview/" . urlencode($request->user()->path_foto));
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'photo' => $photo,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();


        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }


    //change photo profile

    public function changeProfile(Request $request)
    {

        $user = auth()->user();
        
        $image = $request->input('photo');
        $imagePath = null;

    // Check if the 'photo' field contains a file
        if ($request->hasFile('photo')) {
            $file = $request->file('photo'); // Retrieve the file
            $imageName = 'images/photo_profile/' . uniqid() . '.' . $file->getClientOriginalExtension(); // Generate unique name
            Storage::disk('public')->put($imageName, file_get_contents($file)); // Store the file
            $imagePath = Storage::url($imageName); // Get the URL of the stored file
        }

        if($user->path_foto){
            Storage::disk('public')->delete(str_replace('/storage', '', $user->path_foto));
        }

        // return response()->json(['message' => $imagePath]);

        $user->path_foto = $imagePath;
        $user->save();


        return response()->json(['message' => 'Photo updated!']);
    }
}
