import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SearchableDropdown from '@/Components/SearchableDropdown';


export default function rekap() {

    const [value, setValue] = useState("Select option...");


    const pegawai = [
        { id: 1, name: 'Aldi', nik: '123456' },
        { id: 2, name: 'Budi', nik: '123457' },
        { id: 3, name: 'Caca', nik: '123458' },
        { id: 4, name: 'Dedi', nik: '123459' },
        { id: 5, name: 'Eka', nik: '123460' },

    ]

    return (
        <AdminLayout>
            <div className='mt-[3%] mx-[5%]'>
                <div className='w-full border-b-2'>
                    <h1 className='font-bold'>FILTER</h1>
                </div>
                <div className='grid grid-cols-2  gap-8'>
                    <div className='mt-4'>
                        <label htmlFor='nik' className='block text-sm font-medium text-gray-700'>
                            NIK
                        </label>
                        <input
                            type='text'
                            id='nik'
                            name='nik'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                        <label htmlFor='nik' className='block text-sm font-medium text-gray-700'>
                            Nama
                        </label>
                        <SearchableDropdown
                            data={pegawai}
                            placeholder='Pilih Pegawai'
                            label='name'
                            value='id'
                            handleChange={(val) => setValue(val)}
                        />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='option' className='block text-sm font-medium text-gray-700'>
                            Periode
                        </label>
                        <select
                            id='option'
                            name='option'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        >
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                        <label htmlFor='option' className='block text-sm font-medium text-gray-700'>
                            Bulan
                        </label>
                        <select
                            id='option'
                            name='option'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        >
                            <option value='january'>January</option>
                            <option value='february'>February</option>
                            <option value='march'>March</option>
                            <option value='april'>April</option>
                            <option value='may'>May</option>
                            <option value='june'>June</option>
                            <option value='july'>July</option>
                            <option value='august'>August</option>
                            <option value='september'>September</option>
                            <option value='october'>October</option>
                            <option value='november'>November</option>
                            <option value='december'>December</option>
                        </select>
                    </div>
                </div>
                <div className='mt-[3%]'>
                    <PrimaryButton>
                        Tampilkan
                    </PrimaryButton>
                </div>
            </div>
        </AdminLayout>
    )
}