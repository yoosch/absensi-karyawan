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

    const [tableData, setTableData] = useState([
        [ 1, 'yanto' ,'toyanto@gmail.com','12344',null,null,null,null,null],
        // ...
      ]);

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <AdminLayout>
            <div className='mt-[3%] mx-[5%] flex flex-col items-center'>
                <div className='w-full flex gap-x-8 justify-between'>
                    <input 
                        className='bg-[#04042A] w-full rounded-lg text-white' 
                        type="search" 
                        placeholder='Cari Pegawai / NIP' 
                        name="" 
                        id="" 
                    />
                </div>

                <div className='mt-[5%] w-full'>
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
                                <th className="border border-gray-300 p-2">Surat Sakit</th>
                            </tr>
                        </thead>
                    </table>
                </div>             
            </div>
        </AdminLayout>
    )
}