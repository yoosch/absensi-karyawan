import React, { useState, useRef, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import preview from '@/Pages/preview';
import { Inertia } from '@inertiajs/inertia';


const Absence = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
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
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const handleSubmit = () => {
        if (!capturedPhoto) {
            setMessage("Please capture a photo before submitting.");
            return;
        }
        // Mock submission
        setMessage("Absence submitted successfully!");

        // Stop the camera after submission
        stopCamera();

    };

    useEffect(() => {
        startCamera();

        return () => {
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
                <div className="flex flex-col items-center mt-4">
                    <label className="text-gray-700">Address</label>
                    <p className="text-gray-800 text-center">
                        Jl. Raya Bogor, No. 123, Jakarta, Indonesia
                    </p>
                </div>

                {/* Submission */}
                {capturedPhoto ? (
                    <button
                    onClick={handleSubmit}
                    className="mt-4 w-44 px-4 py-2 bg-[#213468] text-white rounded-lg hover:bg-purple-600"
                >
                    Presensi
                </button>
                ) : (<button
                    onClick={handleSubmit}
                    className="mt-4 w-44 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 hidden"
                >
                    Submit Absence
                </button>)

                }

                {/* Message */}
                {message && (
                    <p className="mt-4 text-sm text-gray-700 text-center">{message}</p>
                )}

                {/* Canvas (hidden) */}
                <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
        </AuthenticatedLayout>
    );
};

export default Absence;