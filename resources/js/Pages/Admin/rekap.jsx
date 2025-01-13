import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SearchableDropdown from '@/Components/SearchableDropdown';
// import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



export default function rekap({data}) {

    const [value, setValue] = useState("Select option...");
    const myFilter = (textValue, inputValue) => {
        if (inputValue.length === 0) {
          return true;
        }
    
        // Normalize both strings so we can slice safely
        // take into account the ignorePunctuation option as well...
        textValue = textValue.normalize("NFC").toLocaleLowerCase();
        inputValue = inputValue.normalize("NFC").toLocaleLowerCase();
    
        return textValue.slice(0, inputValue.length) === inputValue;
      };

    const [selectedNik, setSelectedNik] = useState(null);
    const [selectedName, setSelectedName] = useState(null);

    const handleNikChange = (event, value) => {
        setSelectedNik(value);
        if (value) {
            setSelectedName(data.find((item) => item.nik === value.nik) || null);
        } else {
            setSelectedName(null);
        }
    };

    const handleNameChange = (event, value) => {
        setSelectedName(value);
        if (value) {
            setSelectedNik(data.find((item) => item.name === value.name) || null);
        } else {
            setSelectedNik(null);
        }
    };

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
                        <Autocomplete
                            disablePortal
                            options={data}
                            getOptionLabel={(option) => option.nik || ''}
                            value={selectedNik}
                            onChange={handleNikChange}
                            renderInput={(params) => (
                                <div ref={params.InputProps.ref} className="relative mt-1">
                                    <input
                                        {...params.inputProps}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Cari NIK"
                                    />
                                </div>
                            )}
                            classes={{
                                paper: 'shadow-md rounded-md',
                                option: 'px-3 py-2 hover:bg-gray-100',
                            }}
                        />
                        <label htmlFor='nama' className='block text-sm font-medium text-gray-700'>
                            Nama
                        </label>
                        <Autocomplete
                            disablePortal
                            options={data}
                            getOptionLabel={(option) => option.name || ''}
                            value={selectedName}
                            onChange={handleNameChange}
                            renderInput={(params) => (
                                <div ref={params.InputProps.ref} className="relative mt-1">
                                    <input
                                        {...params.inputProps}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Cari Pegawai"
                                    />
                                </div>
                            )}
                            classes={{
                                paper: 'shadow-md rounded-md',
                                option: 'px-3 py-2 hover:bg-gray-100',
                            }}
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