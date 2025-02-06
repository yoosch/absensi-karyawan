import React, { useState, useEffect } from "react";
// import { Calendar } from 'lucide-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Toaster, toast } from "sonner";
import { Chip } from "@nextui-org/react";
import { Head } from "@inertiajs/react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import axios from "axios";


export const Month = [
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

const Riwayat = ({ dataAbsen }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [dataAbsensi, setDataAbsensi] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const currentMonth = new Date().toLocaleDateString("en-GB", {
        month: "numeric",
    });
    
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [Hadir, setHadir] = useState(0);
    const [Izin, setIzin] = useState(0);
    const [Alpha, setAlpha] = useState(0);

    useEffect(() => {

        if(!dataAbsensi) return;
        const today = new Date();
        const filteredData = dataAbsensi.filter((record) => {
            const recordDate = new Date(record.tanggal);
            return recordDate <= today;
        });
        setFilteredData(filteredData);
    }, [dataAbsensi]);

    //set filtered data to dataAbsen until today date, not all day in month
    useEffect(() => {
        //count hadir, izin, alpha
        let hadir = 0;
        let izin = 0;
        let alpha = 0;

        filteredData.forEach((record) => {
            if (record.hari === "Minggu" || record.hari === "Sabtu") {
                hadir += 0;
            } else if (
                record.status === "hadir" ||
                (record.status === "la" && !isOverNoonInUTC7)
            ) {
                hadir++;
            } else if (
                record.status === "c" ||
                record.status === "s" ||
                record.status === "dl" ||
                record.status === "pending" ||
                record.status === "k"
            ) {
                izin++;
            } else if (
                record.status === "alpha" ||
                (record.status === "la" && isOverNoonInUTC7)
            ) {
                alpha++;
            }
        });

        setHadir(hadir);
        setIzin(izin);
        setAlpha(alpha);
    }, [filteredData]);

    useEffect(() => {
        if (!selectedMonth || !selectedYear) return;

        axios
            .post("/riwayat", {
                bulan: selectedMonth,
                tahun: selectedYear,
            })
            .then((response) => {
                console.log('iki data anyar');
                console.log(response.data);
                setDataAbsensi(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [selectedMonth, selectedYear]);

    //check is over 12.00 or not utc+7 only one const not a funtion
    const isOverNoonInUTC7 =
        new Date().toLocaleTimeString("en-US", {
            timeZone: "Asia/Bangkok",
            hour12: false,
            hour: "2-digit",
        }) >= 12;

    const [currentDate, setCurrentDate] = useState(null);
    useEffect(() => {
        console.log(currentDate);
    }, [currentDate]);

    const years = [
        currentYear,
        currentYear - 1,
        currentYear - 2,
        currentYear - 3,
    ];

    const handleBackClick = () => {
        window.history.back();
    };


    return (
        <AuthenticatedLayout>
            <Head title="Riwayat" />
            <div className="mt-6 px-8 md:px-32 flex justify-center items-center">
                <div className="w-full bg-white">
                    <div className="text-center mb-6">
                        <div className="flex mb-6 justify-end">
                            <Button
                                onPress={onOpen}
                                color="primary"
                                variant="flat"
                            >
                                {Month[selectedMonth-1]} {selectedYear}
                            </Button>
                        </div>

                        {/* Attendance Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="rounded-lg p-4 bg-gradient-to-tr from-green-600 to-cyan-500">
                                <div className="text-2xl font-bold text-white">
                                    {Hadir}
                                </div>
                                <div className="text-sm text-white">Hadir</div>
                            </div>
                            <div className="rounded-lg p-4 bg-gradient-to-tr from-orange-600 to-yellow-500">
                                <div className="text-2xl font-bold text-white">
                                    {Izin}
                                </div>
                                <div className="text-sm text-white">Izin</div>
                            </div>
                            <div className="rounded-lg p-4 bg-gradient-to-tr from-red-700 to-pink-500">
                                <div className="text-2xl font-bold text-white">
                                    {Alpha}
                                </div>
                                <div className="text-sm text-white">Alpha</div>
                            </div>
                        </div>

                        {/* Table Header */}
                        <div className="grid grid-cols-4 bg-navy-700 text-black rounded-lg text-sm mb-2">
                            <div className="bg-blue-900 rounded-lg mr-2 py-2 text-white">
                                Tanggal
                            </div>
                            <div className="bg-blue-900 rounded-lg mx-2 p-2 text-white">
                                Masuk
                            </div>
                            <div className="bg-blue-900 rounded-lg mx-2 p-2 text-white">
                                Keluar
                            </div>
                            <div className="bg-blue-900 rounded-lg ml-2 pl-2 py-2 text-white">
                                Status
                            </div>
                        </div>

                        {/* Attendance List */}
                        <div className="space-y-2">
                            {filteredData && filteredData.map((record, index) =>
                                record.hari === "Minggu" ||
                                record.hari === "Sabtu" ? (
                                    <div
                                        key={index}
                                        className="grid grid-cols-4 bg-green-50 p-4 rounded-lg text-sm border border-gray-200"
                                    >
                                        <div>
                                            {new Date(record.tanggal)
                                                .toLocaleDateString("en-GB")
                                                .replace(/\//g, "-")}
                                        </div>

                                        {/* Waktu Masuk and Keluar */}
                                        <div>-</div>
                                        <div>-</div>

                                        {/* Status Handling */}
                                        <div>
                                            <Chip
                                                classNames={{
                                                    base: "bg-gradient-to-br from-teal-400 to-gray-300 border-small border-white/50 shadow-pink-500/30",
                                                    content:
                                                        "drop-shadow shadow-black text-white",
                                                }}
                                                size="sm"
                                            >
                                                Libur
                                            </Chip>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        key={index}
                                        className="grid grid-cols-4 bg-white p-4 rounded-lg text-sm border border-gray-200"
                                    >
                                        {/* Date Formatting */}
                                        <div>
                                            {new Date(record.tanggal)
                                                .toLocaleDateString("en-GB")
                                                .replace(/\//g, "-")}
                                        </div>

                                        {/* Waktu Masuk and Keluar */}
                                        <div>{record.waktu_masuk ?? "-"}</div>
                                        <div>{record.waktu_keluar ?? "-"}</div>

                                        {/* Status Handling */}
                                        <div>
                                            {(record.status === "hadir" ||
                                                (record.status === "la" &&
                                                    !isOverNoonInUTC7)) && (
                                                <Chip
                                                    classNames={{
                                                        base: "bg-gradient-to-br from-green-600 to-cyan-500 border-small border-white/50 shadow-pink-500/30",
                                                        content:
                                                            "drop-shadow shadow-black text-white",
                                                    }}
                                                    size="sm"
                                                >
                                                    Hadir
                                                </Chip>
                                            )}
                                            {(record.status === "c" ||
                                                record.status === "s") && (
                                                <Chip
                                                    color="secondary"
                                                    variant="flat"
                                                >
                                                    {record.status === "c"
                                                        ? "Cuti"
                                                        : "Sakit"}
                                                </Chip>
                                            )}
                                            {(record.status === "alpha" ||
                                                (record.status === "la" &&
                                                    isOverNoonInUTC7)) && (
                                                <Chip
                                                    classNames={{
                                                        base: "bg-gradient-to-br from-red-700 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                                                        content:
                                                            "drop-shadow shadow-black text-white",
                                                    }}
                                                    size="sm"
                                                >
                                                    {record.status === "alpha"
                                                        ? "Alpha"
                                                        : "Lupa Absen"}
                                                </Chip>
                                            )}
                                            {record.status === "pending" && (
                                                <Chip
                                                    classNames={{
                                                        base: "bg-gradient-to-br from-orange-600 to-yellow-500 border-small border-white/50 shadow-pink-500/30",
                                                        content:
                                                            "drop-shadow shadow-black text-white",
                                                    }}
                                                    size="sm"
                                                >
                                                    Pending
                                                </Chip>
                                            )}
                                            {record.status === "dl" && (
                                                <Chip
                                                    classNames={{
                                                        base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                                                        content:
                                                            "drop-shadow shadow-black text-white",
                                                    }}
                                                    size="sm"
                                                >
                                                    Dinas
                                                </Chip>
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Select Periode
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-2">
                                    <Dropdown backdrop="blur">
                                        <DropdownTrigger>
                                            <Button variant="bordered">
                                                {Month[selectedMonth-1]}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="Static Actions"
                                            variant="faded"
                                            onAction={(key) =>
                                                setSelectedMonth(key)
                                            }
                                        >
                                            <DropdownItem key="0" value="0">
                                                Januari
                                            </DropdownItem>
                                            <DropdownItem key="1" value="1">
                                                Februari
                                            </DropdownItem>
                                            <DropdownItem key="2" value="2">
                                                Maret
                                            </DropdownItem>
                                            <DropdownItem key="3" value="3">
                                                April
                                            </DropdownItem>
                                            <DropdownItem key="4" value="4">
                                                Mei
                                            </DropdownItem>
                                            <DropdownItem key="5" value="5">
                                                Juni
                                            </DropdownItem>
                                            <DropdownItem key="6" value="6">
                                                Juli
                                            </DropdownItem>
                                            <DropdownItem key="7" value="7">
                                                Agustus
                                            </DropdownItem>
                                            <DropdownItem key="8" value="8">
                                                September
                                            </DropdownItem>
                                            <DropdownItem key="9" value="9">
                                                Oktober
                                            </DropdownItem>
                                            <DropdownItem key="10" value="10">
                                                November
                                            </DropdownItem>
                                            <DropdownItem key="11" value="11">
                                                Desember
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown backdrop="blur" className="mt-2">
                                        <DropdownTrigger>
                                            <Button variant="bordered">
                                                {selectedYear}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="Pilih Tahun"
                                            variant="faded"
                                            onAction={(key) =>
                                                setSelectedYear(years[key])
                                            }
                                        >
                                            {years.map((year, index) => (
                                                <DropdownItem key={index}>
                                                    {year}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Riwayat;
