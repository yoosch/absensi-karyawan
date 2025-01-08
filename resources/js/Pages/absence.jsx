import React, { useState, useRef } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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

    return (
        <AuthenticatedLayout
        >
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Absence Page</h1>

            {/* Camera */}
            {!capturedPhoto ? (
                <div className="flex flex-col items-center">
                    <video
                        ref={videoRef}
                        autoPlay
                        className="border rounded-lg w-full max-w-sm bg-black"
                    ></video>
                    <button
                        onClick={startCamera}
                        className="mt-4 w-44 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Start Camera
                    </button>
                    <button
                        onClick={capturePhoto}
                        className="mt-2 w-44 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Capture Photo
                    </button>
                </div>
            ) : (
                <div>
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
                        className="mt-4 w-44 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                        Retake Photo
                    </button>
                </div>
            )}

            {/* Submission */}
            <button
                onClick={handleSubmit}
                className="mt-4 w-44 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
                Submit Absence
            </button>

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
