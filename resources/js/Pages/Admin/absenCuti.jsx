import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

DataTable.use(DT);

export default function adminPegawai() {

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
                    <select 
                        className='bg-[#04042A] w-[25%] rounded-lg text-white px-4' 
                        onChange={handleOptionChange}
                    >
                        <option value="">-- Pilih Jenis Cuti --</option>
                        <option value="tahunan">Tahunan</option>
                        <option value="sakit">Sakit</option>
                    </select>
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
                                    <th className="border border-gray-300 p-2">Nama</th>
                                    <th className="border border-gray-300 p-2">Email</th>
                                    <th className="border border-gray-300 p-2">No Induk</th>
                                    <th className="border border-gray-300 p-2">Tanggal Mulai</th>
                                    <th className="border border-gray-300 p-2">Tanggal Selesai</th>
                                    <th className="border border-gray-300 p-2">Deskripsi</th>
                                    <th className="border border-gray-300 p-2">Surat sakit</th>
                                </tr>
                            </thead>
                        </table>   
                    )}
                </div>             
            </div>
        </AdminLayout>
    )
}