import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function DashboardAdmin({absenData}) {
    // RealTimeDate function to get real-time date and time
    const RealTimeDate = () => {
        const [currentDate, setCurrentDate] = useState(new Date());

        useEffect(() => {
            const timer = setInterval(() => {
                setCurrentDate(new Date());
            }, 1000); // Update every second

            // Clean up the interval when the component is unmounted
            return () => clearInterval(timer);
        }, []);

        const daysOfWeek = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        const monthsOfYear = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
        const month = monthsOfYear[currentDate.getMonth()];

        const dayOfWeek = daysOfWeek[currentDate.getDay()];
        const dayOfMonth = currentDate.getDate();
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        // Format time to always show two digits
        const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes
            }:${seconds < 10 ? "0" + seconds : seconds}`;

        return <h1>{`${dayOfWeek}, ${dayOfMonth} ${month} ${year}`}</h1>;
    };

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <div className="mt-[3%] mx-[5%]">
                <div className="font-bold text-3xl">
                    <RealTimeDate /> {/* Call the RealTimeDate component */}
                </div>
                <div className="bg-white mt-[5%] border-2 rounded-xl border-gray-300">
                    <div className="py-[1%] pl-[1%]">
                        <h1>Kehadiran karyawan hari ini</h1>
                    </div>
                    <div className="border-b border border-gray-400"></div>
                    <div className="grid grid-cols-3 py-[2%] px-[1%]">
                        <div className="flex items-center justify-around mx-[20%] rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="currentColor"
                                class="bi bi-person-lines-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                            </svg>
                            <div className="flex flex-col">
                                <h1>Total Karyawan</h1>
                                <h1 className="text-3xl font-bold">{absenData.totalKaryawan}</h1>
                            </div>
                        </div>
                        <div className="flex items-center justify-around mx-[20%] rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="currentColor"
                                class="bi bi-person-fill-check"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                            </svg>
                            <div className="flex flex-col">
                                <h1>Karyawan Hadir</h1>
                                <h1 className="text-3xl font-bold">{absenData.totalHadir}</h1>
                            </div>
                        </div>
                        <div className="flex items-center justify-around mx-[20%] rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="currentColor"
                                class="bi bi-person-fill-x"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                            </svg>
                            <div className="flex flex-col">
                                <h1>Karyawan Tidak Hadir</h1>
                                <h1 className="text-3xl font-bold">{absenData.totalTidakHadir}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
