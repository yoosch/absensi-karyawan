import React, { useState, useRef, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import axios from "axios";
import { Toaster, toast } from 'sonner'

const MySwal = withReactContent(Swal)

const Absence = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [coordinates, setCoordinates] = useState({ latitude: 0.0, longitude: 0.0 });
    const [message, setMessage] = useState("");

    const startCamera = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((error) => {
                console.error("Camera access error:", error);
                setMessage("Unable to access camera.");
            });
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            const video = videoRef.current;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const dataUrl = canvas.toDataURL("image/png");
            setCapturedPhoto(dataUrl);
            stopCamera();
            getCoordinates(); // Get GPS location
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };
    

    const getCoordinates = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setMessage("Unable to access location.");
                }
            );
        } else {
            setMessage("Geolocation is not supported by this browser.");
        }
    };

    
    const handleSubmit = () => {
        if (!capturedPhoto || !coordinates) {
            setMessage("Please capture a photo and allow location access before submitting.");
            return;
        }

        const absenceData = {
            photo_url: capturedPhoto,
            koordinat_masuk: JSON.stringify(coordinates),
            koordinat_keluar: JSON.stringify(coordinates),
            waktu_masuk: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().substr(11, 8),
            waktu_keluar : new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().substr(11, 8),
        };

        console.log(absenceData);

        axios.post("/absen/store", absenceData)
        .then((response) => {
            console.log("Success:", response.data);
            toast.success("Absen Berhasil");
            window.location.href = "/dashboard";
        })
        .catch((error) => {
            console.error("Error submitting absence:", error);
            setMessage("Absen Gagal");
        });



        
    };

    useEffect(() => {

        startCamera();

        const interval = setInterval(() => {
            getCoordinates();
        }, 1000);

        return () => {
            clearInterval(interval);
            stopCamera();
        };
    }, []); 

    
    return (
        <AuthenticatedLayout>
            <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Absence Page</h1>

                {/* Camera */}
                {!capturedPhoto ? (
                    <div className="relative flex flex-col items-center">
                        <video
                            ref={videoRef}
                            autoPlay
                            className="border rounded-lg w-full max-w-sm bg-black"
                        ></video>
                        <button
                            onClick={capturePhoto}
                            className="absolute bottom-4 w-12 h-12 flex items-center justify-center bg-[#213468] rounded-full"
                        >
                            <svg
                                className='w-6 h-6 text-white'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                <path
                                stroke='currentColor'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z'
                                />
                                <path
                                stroke='currentColor'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className="relative flex flex-col items-center">
                        {/* Captured Photo Preview */}
                        <img
                            src={capturedPhoto}
                            alt="Captured"
                            className="w-full max-w-sm border rounded-lg"
                        />
                        <button
                            onClick={() => {
                                setCapturedPhoto(null);
                                setMessage("");
                                startCamera();
                            }}
                            className="absolute bottom-4 w-12 h-12 flex items-center justify-center bg-[#213468] rounded-full"
                        >
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clip-rule="evenodd"/>
                            </svg>

                        </button>
                    </div>
                )}

                {/* Addresss */}
                <div className='grid grid-cols-[10%,45%,45%] justify-center items-center mt-4 border-2 rounded-lg p-3 '>
                    <div className='mr-6'>
                        <svg
                            class='w-6 h-6 text-[#fdb714]'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                            fill-rule='evenodd'
                            d='M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z'
                            clip-rule='evenodd'
                            />
                        </svg>
                    </div>
                    <div className="text-gray-800 text-left mr-3 font-semibold">
                        <h1>Longitude</h1>
                        <h1>Latitude</h1>
                    </div>
                    <div className="font-mono font-light">
                        {/* check if null */}
                        <h1>:{coordinates.longitude.toFixed(6)}</h1>
                        <h1>:{coordinates.latitude.toFixed(6)} </h1>
                    </div>
                </div>

                {/* Submission */}
                {capturedPhoto ? (
                    <button
                    onClick={() => handleSubmit()}
                    className="mt-4 w-44 px-4 py-2 bg-[#213468] text-white rounded-lg hover:bg-purple-600"
                >
                    Presensi
                </button>
                ) : (<button
                    onClick={() => handleSubmit()}
                    className="mt-4 w-44 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 hidden"
                >   
                    Submit Absence
                </button>)

                }

                {/* Message */}
                <Toaster 
                    position="top-center"
                    richColors
                    >
                </Toaster>
                {/* Canvas (hidden) */}
                <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
        </AuthenticatedLayout>
    );
};

export default Absence;