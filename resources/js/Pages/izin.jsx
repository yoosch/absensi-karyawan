import React, { useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useDropzone } from 'react-dropzone';
import { DateRangePicker } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, Textarea } from "@nextui-org/react";

const Izin = () => {
    const [izin, setIzin] = useState({
        tipeIzin: '',
        jenisCuti: '',
        tanggalMulai: '',
        tanggalSelesai: '',
        deskripsi: '',
        alamat: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);

    const capitalizeFirstLetter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIzin({
            ...izin,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(izin);
    };


    const getSuratLabel = () => {
        if (izin.tipeIzin === "cuti") {
            if (izin.jenisCuti === "tahunan") {
                return "Surat Izin";
            } else if(izin.jenisCuti === "sakit") {
                return "Surat Sakit";
            }else{
                return "Dokumen Pendukung";
            }
        } else if(izin.tipeIzin === "dinas") {
            return "Surat Dinas";
        } else if(izin.tipeIzin === "lupaabsen") {
            return "Surat Dispensasi";
        }else{
            return "Dokumen Pendukung";
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: '.pdf',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            const fileSize = file.size / 1024;
            if (file.type !== 'application/pdf') {
                alert("Hanya file PDF yang diperbolehkan.");
                setSelectedFile(null);
                setFileUploaded(false);
            } else if (fileSize > 500) {
                alert("Ukuran file tidak boleh lebih dari 500KB.");
                setSelectedFile(null);
                setFileUploaded(false);
            } else {
                setSelectedFile(file);
                setFileUploaded(true);
            }
        },
        maxSize: 500 * 1024,
    });

    return (
        <AuthenticatedLayout>
            <div className="mt-6 px-8 md:px-32">
                <form onSubmit={handleSubmit}>
                    <div className="mt-6">
                        <label className="block text-sm text-gray-600 mb-2">Tipe Izin</label>
                        <Dropdown backdrop="blur">
                            <DropdownTrigger>
                                <Button className="w-full bg-[#213468] text-white">{izin.tipeIzin ? capitalizeFirstLetter(izin.tipeIzin) : "Pilih Alasan"}</Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Tipe Izin"
                                onAction={(key) => {
                                    setIzin({ ...izin, tipeIzin: key })
                                    }
                                }
                            >
                                <DropdownItem key="dinas">Dinas</DropdownItem>
                                <DropdownItem key="cuti">Cuti</DropdownItem>
                                <DropdownItem key="lupaabsen">Lupa Absen</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    {izin.tipeIzin === "cuti" && (
                        <div className="mt-6">
                            <label className="block text-sm text-gray-600 mb-2 ">Jenis Cuti</label>
                            <Dropdown backdrop="blur">
                                <DropdownTrigger>
                                    <Button className="w-full bg-[#213468] text-white">{izin.jenisCuti ? capitalizeFirstLetter(izin.jenisCuti) : "Pilih Jenis Cuti"}</Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Jenis Cuti"
                                    onAction={(key) => setIzin({ ...izin, jenisCuti: key })}
                                >
                                    <DropdownItem key="tahunan">Tahunan</DropdownItem>
                                    <DropdownItem key="sakit">Sakit</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    )}

                    <div className="mt-6">
                        <label className="block text-sm text-gray-600 mb-2">Tanggal</label>
                        <DateRangePicker
                            className="w-full rounded-lg"
                            size="lg"
                            onChange={(dates) => {
                                setIzin({
                                    ...izin,
                                    tanggalMulai: dates.start,
                                    tanggalSelesai: dates.end,
                                });
                            }}
                        />
                        <small className="text-gray-500 italic">Pilih tanggal mulai dan selesai</small>
                    </div>

                    {izin.jenisCuti === "tahunan" && izin.tipeIzin === "cuti" && (
                        <div className="mt-6">
                            <label className="block text-sm text-gray-600 mb-2">Alamat</label>
                            <Textarea
                                name="alamat"
                                value={izin.alamat}
                                placeholder="Jl. Contoh No. 123, Kota Contoh"
                                onChange={handleInputChange}
                                fullWidth
                                startContent={<svg class=" my-auto w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
                                  </svg>
                                  }
                            />
                            <small className="text-gray-500 italic">Tulis alamat menjalani Cuti</small>
                        </div>
                    )}

                    <div className="mt-6">
                        <label className="block text-sm text-gray-600 mb-2">Deskripsi</label>
                            <Textarea
                                variant="flat"
                                name="deskripsi"
                                value={izin.deskripsi}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        <small className="text-gray-500 italic">Tulis Deskrpsi singkat</small>
                    </div>
                    
                    <div className="mt-6">
                            <label className="block text-sm text-gray-600 mb-2">{getSuratLabel()}
                            </label>
                            <div
                                {...getRootProps()}
                                className="border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer"
                            >
                                <input {...getInputProps()} type="file" className="hidden" />
                                <p className="text-gray-500">Drag & Drop file PDF disini, atau pilih file</p>
                                {selectedFile && (
                                    <p className="mt-1 text-sm text-gray-600">
                                        File yang dipilih: {selectedFile.name}
                                    </p>
                                )}
                            </div>
                            {fileUploaded && (
                                <p className="mt-2 text-green-500 text-sm">File berhasil diunggah!</p>
                            )}
                    </div>

                    <div className="mt-6">
                        <Button type="submit" className="w-full bg-[#213468] text-white" >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Izin;
