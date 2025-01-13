import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import {Select, SelectItem} from "@nextui-org/react";

DataTable.use(DT);

export const animals = [
    {key: "tahunan", label: "Tahunan"},
    {key: "sakit", label: "Sakit"},
  ];

export default function adminPegawai({data}) {

    const colors = ["default"];

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const [isOpen, setIsOpen] = useState(false);

    const fadeInStyle = {
        animation: 'fadeIn 2s ease-in-out',
        color: 'black',
        textWeight: 'bold',
        textAlign: 'center',
        marginTop: '20px',
    };

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <AdminLayout>
            <div className='mt-[3%] mx-[5%] flex flex-col items-center'>
                <div className='w-full flex gap-x-8 justify-between'>
                <input 
                    className='bg-[#04042A] w-[75%] rounded-lg text-white' 
                    type="search" 
                    placeholder='Cari Pegawai / NIP' 
                    name="" 
                    id="" 
                />
                <div className="w-[25%] flex flex-row flex-wrap gap-4 border border-[#04042A] rounded-lg">
                    {colors.map((color) => (
                        <Select
                            key={color}
                            className={`max-w-xs ${color}`}
                            defaultSelectedKeys={["Tahunan"]}
                            label="Kategori Cuti"
                            placeholder="Pilih kategori cuti"
                            selectionVariant="filled"
                        >
                            {animals.map((animal) => (
                                <SelectItem key={animal.key} className="bg-[#04042A] text-white">
                                    {animal.label}
                                </SelectItem>
                            ))}
                        </Select>
                    ))}
                </div>
            </div>

                <div className='mt-[5%] w-full'>

                    {selectedOption === "" && (
                        <div style={fadeInStyle}>
                        <p className='italic'>-- Silakan pilih kategori cuti untuk menampilkan data --</p>
                    </div>
                    )}

                    {selectedOption === "tahunan" && (
                        <table className='w-full border-collapse'>
                            <thead className="bg-[#04042A] text-white">
                                <tr>
                                    <th className="border border-gray-300 p-2 w-[10%]">No</th>
                                    <th className="border border-gray-300 p-2">Nama</th>
                                    <th className="border border-gray-300 p-2">Email</th>
                                    <th className="border border-gray-300 p-2">No Induk</th>
                                    <th className="border border-gray-300 p-2">Tanggal Mulai</th>
                                    <th className="border border-gray-300 p-2">Tanggal Selesai</th>
                                    <th className="border border-gray-300 p-2">Deskripsi</th>
                                    <th className="border border-gray-300 p-2">Alamat</th>
                                    <th className="border border-gray-300 p-2">Surat</th>
                                </tr>
                            </thead>
                        </table>
                    )}

                    {selectedOption === "sakit" && (
                        <table className='w-full border-collapse'>
                            <thead className="bg-[#04042A] text-white">
                                <tr>
                                    <th className="border border-gray-300 p-2 w-[10%]">No</th>
                                    {/* <th className="border border-gray-300 p-2">Nama</th> */}
                                    {/* <th className="border border-gray-300 p-2">Email</th> */}
                                    <th className="border border-gray-300 p-2">No Induk</th>
                                    <th className="border border-gray-300 p-2">Tanggal Mulai</th>
                                    <th className="border border-gray-300 p-2">Tanggal Selesai</th>
                                    <th className="border border-gray-300 p-2">Deskripsi</th>
                                    <th className="border border-gray-300 p-2">Alamat</th>
                                    <th className="border border-gray-300 p-2">Surat sakit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((pegawai, index) =>(
                                    <tr key={index}>
                                        <td className="border border-gray-300 p-2">{index + 1}</td>
                                        {/* <td className="border border-gray-300 p-2">{pegawai.name}</td> */}
                                        {/* <td className="border border-gray-300 p-2">{pegawai.email}</td> */}
                                        <td className="border border-gray-300 p-2">{pegawai.NIK}</td>
                                        <td className="border border-gray-300 p-2">{pegawai.tanggal_mulai}</td>
                                        <td className="border border-gray-300 p-2">{pegawai.tanggal_selesai}</td>
                                        <td className="border border-gray-300 p-2">{pegawai.deskripsi}</td>
                                        <td className="border border-gray-300 p-2">{pegawai.alamat}</td>
                                        <td className="border border-gray-300 p-2">{pegawai.surat_path}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>   
                    )}
                </div>             
            </div>
        </AdminLayout>
    )
}