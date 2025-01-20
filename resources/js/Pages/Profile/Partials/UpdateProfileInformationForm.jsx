import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
    photo
    
}) {
    console.log(photo);
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState();
    const [fotoProfile, setfotoProfile] = useState();

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            photo: null,
        });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setfotoProfile(file.File);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhotoPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }   
    };

    const submit = (e) => {
        e.preventDefault();

        console.log(fotoProfile);

        const formData = new FormData();
        formData.append('photo', fotoProfile);

        //async post profile via axios
        axios.post('/change-profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information, photo, and email
                    address.
                </p>
            </header>
            <img src="/public/storage/images/photo_profile/678e0fa8c65b9.png" alt="Profile Photo" class="h-16 w-16 rounded-full">
            </img>


            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="photo" value="Profile Photo" />
                    <div className="mt-2 flex items-center gap-4">
                        {photoPreview && (
                            <img
                                src={photoPreview}
                                alt="Profile Preview"
                                className="h-16 w-16 rounded-full object-cover"
                            />
                        )}
                        <input
                            id="photo"
                            type="file"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 file:cursor-pointer"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </div>
                    <InputError message={errors.photo} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}