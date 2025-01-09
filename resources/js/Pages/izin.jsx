import React, { useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useDropzone } from 'react-dropzone';

const Izin = () => {
    const [izin, setIzin] = useState({
        tanggalMulai: '',
        tanggalSelesai: '',
        alasan: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);

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
                        <label className="block text-sm text-gray-600" htmlFor="tipeIzin">Tipe Izin</label>
                        <div className="w-full px-4 py-2 mt-2 text-gray-700 bg-blue-900 rounded-lg focus:outline-none focus:bg-white">
                            <select
                                className="w-full bg-blue-900 outline-none focus:outline-none text-white"
                                id="tipeIzin"
                                name="tipeIzin"
                                onChange={handleInputChange}
                            >
                                <option value="">-- Pilih Alasan --</option>
                                <option value="sakit">Sakit</option>
                                <option value="cuti">Cuti</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm text-gray-600" htmlFor="tanggalMulai">Tanggal Mulai</label>
                        <input
                            type="date"
                            id="tanggalMulai"
                            name="tanggalMulai"
                            value={izin.tanggalMulai}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                        />
                        <small className="text-gray-500 italic">Pilih tanggal mulai dari izin</small>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm text-gray-600" htmlFor="tanggalSelesai">Tanggal Selesai</label>
                        <input
                            type="date"
                            id="tanggalSelesai"
                            name="tanggalSelesai"
                            value={izin.tanggalSelesai}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                        />
                        <small className="text-gray-500 italic">Pilih tanggal selesai dari izin</small>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm text-gray-600" htmlFor="alasan">Deskripsi</label>
                        <textarea
                            id="alasan"
                            name="alasan"
                            value={izin.alasan}
                            placeholder="Jelaskan alasan izin Anda"
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm text-gray-600">Unggah Surat</label>
                        <div
                            className="mt-2 border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer"
                            {...getRootProps()}
                            style={{ minHeight: '150px' }}  // Menambahkan tinggi minimal pada area dropzone
                        >
                            <input
                                {...getInputProps()}
                                type="file"
                                name="file"
                                className="hidden"
                                accept=".pdf"
                                required
                            />
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
                        <button
                            type="submit"
                            className="w-full my-10 px-4 py-2 text-sm text-white bg-blue-900 rounded-lg hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Izin;
