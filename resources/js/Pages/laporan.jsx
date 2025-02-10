import React, { useEffect, useRef, useState, useCallback } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardBody,
    Popover,
    PopoverTrigger,
    PopoverContent,
    CardFooter,
    Image,
    Button,
} from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Chip,
    Progress,
    Spinner,
} from "@nextui-org/react";
import { Inertia } from "@inertiajs/inertia";
import { Toaster, toast } from "sonner";
import axios from "axios";

export default function Laporan({ laporan_bulanan }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

    const FileUploadHistoryModal = ({
        isOpen,
        onOpenChange,
        laporan_bulanan,
    }) => {
        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="max-w-2xl">
                    <ModalHeader className="flex flex-col gap-1">
                        Histori Unggahan File Anda
                    </ModalHeader>
                    <ModalBody>
                        {laporan_bulanan && laporan_bulanan.length > 0 ? (
                            <ul>
                                {laporan_bulanan.map((laporan, index) => (
                                    <li key={index}>
                                        <p>
                                            <strong>File Anda: </strong>
                                            {laporan.file_laporan
                                                .split("/")
                                                .pop()}
                                        </p>
                                        <p>
                                            <strong>Bulan: </strong>
                                            {laporan.bulan}
                                        </p>
                                        <p>
                                            <strong>Tahun: </strong>
                                            {laporan.tahun}
                                        </p>
                                        <p>
                                            <strong>Last Uploaded: </strong>
                                            {new Date(
                                                laporan.updated_at
                                            ).toLocaleString("id-ID", {
                                                timeZone: "Asia/Jakarta",
                                            })}
                                        </p>

                                        <div className="mt-3">
                                            <iframe
                                                src={`/storage/${laporan.file_laporan}`}
                                                width="100%"
                                                height="400px"
                                                title={`Preview for ${laporan.file_laporan}`}
                                            />
                                        </div>
                                        <hr />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Tidak ada file yang diunggah.</p>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="light"
                            onPress={() => onOpenChange(false)}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const file = formData.get("file_laporan");

        if (!file) {
            setError("File belum diunggah.");
            return;
        }

        axios.post('/laporan/store', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        })
            .then(response => {
                toast.success("File berhasil diunggah");
            })
            .catch(error => {
        });
        
    };
    return (
        <div>
            <AuthenticatedLayout>
                <Toaster richColors />
                <div className="px-6 md:px-32">
                    <Card className="py-4 mb-4 mt-6">
                        <CardHeader className="pb-3 pt-2 px-4 flex flex-row items-center justify-center relative">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-tiny-800 font-bold text-center">
                                    Unggah Laporan Bulanan
                                </p>
                                <small className="text-default-500 italic text-center">
                                    Silahkan unggah file .pdf Anda di sini
                                </small>
                            </div>
                            <Button
                                onPress={onOpen}
                                className="absolute left-4 bottom-4"
                                isIconOnly={isSmallScreen}
                            >
                                {isSmallScreen ? (
                                    <svg
                                        class="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"
                                        />
                                    </svg>
                                ) : (
                                    <span>Recent Upload</span>
                                )}
                            </Button>

                            <FileUploadHistoryModal
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                                laporan_bulanan={laporan_bulanan}
                            />
                        </CardHeader>

                        <CardBody>
                            <form
                                onSubmit={handleSubmit}
                                className="overflow-visible py-2 items-center"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer flex flex-col items-center bg-gray-100 border-2 border-dashed border-gray-500 rounded-lg py-10 px-6 hover:bg-gray-300 transition-colors duration-300 w-full"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi bi-upload"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                    </svg>
                                    <p className="mt-2 text-gray-600">
                                        Drag & drop atau klik untuk unggah file
                                    </p>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        name="file_laporan"
                                        accept=".pdf"
                                        onChange={(e) =>
                                            handleFileUpload(e.target.files[0])
                                        }
                                        className="hidden"
                                    />
                                    {isUploading && (
                                        <Spinner
                                            color="warning"
                                            label="Loading..."
                                        />
                                    )}
                                </label>
                                {fileInfo && (
                                    <p className="mt-4 text-center text-green-600">
                                        File berhasil diunggah: {fileInfo}
                                    </p>
                                )}
                                {error && (
                                    <p className="mt-4 text-center text-red-600">
                                        {error}
                                    </p>
                                )}

                                <div className="mt-6">
                                    <Button
                                        type="submit"
                                        className="w-full bg-[#213468] text-white"
                                    >
                                        Submit Laporan
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
