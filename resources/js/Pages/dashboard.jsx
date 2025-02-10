import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

import { Inertia } from "@inertiajs/inertia";
import { useState, useCallback, usePage } from "react";
import { Chip } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import React, { useEffect, useRef } from "react";
import { GoHeartFill } from "react-icons/go";

export default function Dashboard({ user, laporan_bulanan, absen }) {
    const [fileInfo, setFileInfo] = useState(null);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isSmallerScreen, setIsSmallerScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 850);
        };

        const handleResize2 = () => {
            setIsSmallerScreen(window.innerWidth <= 850);
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        window.addEventListener("resize", handleResize2);
        handleResize2();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("resize", handleResize2);
        };
    }, []);

    const handleFileUpload = (file) => {
        const maxFileSize = 30 * 1024 * 1024;
        setIsUploading(true);

        setTimeout(() => {
            if (file && file.type === "application/pdf") {
                if (file.size <= maxFileSize) {
                    setFileInfo(file.name);
                    setError("");
                } else {
                    setError("Ukuran file maksimal 30 MB.");
                    setFileInfo(null);
                }
            } else {
                setError("File yang diunggah harus berformat .pdf.");
                setFileInfo(null);
            }
            setIsUploading(false);
        }, 1500);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 850);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files[0];
        handleFileUpload(file);
    }, []);

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const { name } = user;

    const UserLives = ({ user }) => {
        return (
            <>
                {Array.from({ length: 3 }).map((_, index) => (
                    <GoHeartFill
                        key={index}
                        className={`h-6 w-6 ${
                            index < user.nyawa
                                ? "text-red-600"
                                : "text-gray-600"
                        }`}
                    />
                ))}
            </>
        );
    };

    const getDay = () => {
        const date = new Date();
        return date.getDay();
    };

    const Hari = () => {
        const date = new Date();
        const days = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        return days[date.getDay()];
    };

    const textElementRef = useRef(null);

    const autoTyping = (element, text, speed) => {
        let i = 0;
        let isDeleting = false;

        const typing = () => {
            if (isDeleting) {
                element.innerText = text.substring(0, i);
                i--;
            } else {
                element.innerText =
                    text.substring(0, i) +
                    (i < text.length ? text.charAt(i) : "");
                i++;
            }

            if (!isDeleting && i === text.length) {
                setTimeout(() => (isDeleting = true), 2000);
            } else if (isDeleting && i === 0) {
                isDeleting = false;
            }

            const typingSpeed = isDeleting ? speed / 2 : speed;
            setTimeout(typing, typingSpeed);
        };

        typing();
    };

    useEffect(() => {
        const text = `Welcome Back, ${name}`;
        if (textElementRef.current) {
            autoTyping(textElementRef.current, text, 100);
        }
    }, [name]);

    return (
        <AuthenticatedLayout>
            <Toaster />
            <Head title="Dashboard" />
            <div className="mt-6 md:px-32">
                <div className="ml-8 flex justify-left items-center">
                    <h1 className="animate-typing text-xs font-bold text-gray-800 whitespace-nowrap animate-marquee">
                        <span ref={textElementRef}></span>
                        <span
                            className="text-2xl"
                            aria-label="Waving Hand"
                            role="img"
                        >
                            👋
                        </span>
                    </h1>
                </div>
                <div className="mx-8 mt-4">
                    <div className="flex items-center py-2 bg-blue-800 text-white rounded-lg overflow-hidden shadow-md border-b-4 border-[#fdb714]">
                        <div className="w-20 h-20 bg-gray-300 rounded-full m-4 flex-shrink-0 overflow-hidden">
                            <img
                                src={user.path_foto}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col pl-5 justify-center flex-grow">
                            <div className="flex">
                                <UserLives user={user} />
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg">
                                    {name}
                                </h2>
                                <p className="text-sm">{user.nik}</p>
                                <div className="md:hidden my-3 gap-2 flex-col align items-start">
                                    <p>Shift : {user.shift.nama}</p>
                                    <Chip color="warning" variant="dot">
                                        {!["Sabtu", "Minggu"].includes(
                                              Hari()
                                          ) ? (
                                            <p className="text-white">
                                                {`${user.shift.jam_masuk.slice(0, 5)}-${user.shift.jam_keluar.slice(0, 5)}`}
                                            </p>
                                        ) : ["Sabtu", "Minggu"].includes(
                                              Hari()
                                          ) ? (
                                            <p className="text-white">
                                                Hari Libur
                                            </p>
                                        ) : null}
                                    </Chip>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex my-3 mx-5 gap-2 flex-col align items-start">
                            <p>Shift : {user.shift.nama}</p>
                            <Chip color="warning" variant="dot">
                                {!["Sabtu", "Minggu"].includes(Hari()) ? (
                                    <p className="text-white">{`${user.shift.jam_masuk.slice(0, 5)}-${user.shift.jam_keluar.slice(0, 5)}`}</p>
                                ) : ["Sabtu", "Minggu"].includes(Hari()) ? (
                                    <p className="text-white">Hari Libur</p>
                                ) : null}
                            </Chip>
                        </div>
                    </div>

                    <div className="flex flex-col my-4 mt-4">
                        <Link href="/absen" as="button">
                            <div className="flex items-center mt-6 px-2 text-black rounded-md bg-w overflow-hidden shadow-md border-l-2 border-[#fdb714]">
                                <div className="flex justify-between items-center flex-grow px-6 py-6">
                                    <svg
                                        className="w-10 h-10"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 18"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                                        />
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 3h-2l-.447-.894A2 2 0 0 0 12.764 1H7.236a2 2 0 0 0-1.789 1.106L5 3H3a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2Z"
                                        />
                                    </svg>
                                    <div className="flex flex-col">
                                        <h2 className="font-semibold text-end text-lg ">
                                            Presensi
                                        </h2>
                                        <h3 className="  font-light text-xs text-end ">
                                            Presensi menggunakan foto wajah
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/izin" as="button">
                            <div className="flex items-center mt-6 px-2 text-black rounded-md bg-w overflow-hidden shadow-md border-l-2 border-[#fdb714]">
                                <div className="flex justify-between flex-grow px-6 py-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="bi bi-building-fill-x w-9 h-9"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-3.59 1.787A.5.5 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.5 4.5 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                                    </svg>
                                    <div className="flex flex-col">
                                        <h2 className="font-semibold text-end text-lg">
                                            Izin
                                        </h2>
                                        <h3 className="  font-light text-xs text-end ">
                                            Pengajuan izin berbasis surat
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/riwayat" as="button">
                            <div className="flex items-center mt-6 px-2 text-black rounded-md bg-w overflow-hidden shadow-lg border-l-2 border-[#fdb714]">
                                <div className="flex justify-between flex-grow px-6 py-6">
                                    <svg
                                        className="w-9 h-9"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 1v3m5-3v3m5-3v3M1 7h7m1.506 3.429 2.065 2.065M19 7h-2M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 13H6v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L8 16Z"
                                        />
                                    </svg>
                                    <div className="flex flex-col">
                                        <h2 className="font-semibold text-lg text-end">
                                            Riwayat
                                        </h2>
                                        <h3 className="  font-light text-xs text-end ">
                                            Riwayat presensi dan izin
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/laporan" as="button">
                            <div className="flex items-center mt-6 px-2 text-black rounded-md bg-w overflow-hidden shadow-lg border-l-2 border-[#fdb714]">
                                <div className="flex justify-between flex-grow px-6 py-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                        fill="currentColor"
                                        class="bi bi-file-earmark-arrow-up-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707z" />
                                    </svg>
                                    <div className="flex flex-col">
                                        <h2 className="font-semibold text-lg text-end">
                                            Laporan Bulanan
                                        </h2>
                                        <h3 className="font-light text-xs text-end ">
                                            Pengunggahan Laporan Bulanan
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
