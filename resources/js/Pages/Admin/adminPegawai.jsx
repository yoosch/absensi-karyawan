import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function adminPegawai() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <div className='mt-[3%] mx-[5%] flex flex-col items-center'>
                <div className='w-full flex justify-between'>
                    <input className='bg-[#04042A] w-[82%] rounded-lg text-white' type="search" placeholder='Cari Pegawai / NIP' name="" id="" />
                    <button onClick={toggleModal} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className='bg-[#04042A] w-[15%] rounded-lg text-white px-4' type="button">
                        Tambah Pegawai
                    </button>
                </div>
                <div className='mt-[5%] w-full'>
                <table className="w-full border-collapse">
                    <thead className="bg-[#04042A] text-white">
                        <tr>
                        <th className="border border-gray-300 p-2 w-[10%]">No</th>
                        <th className="border border-gray-300 p-2">Nama</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">No Induk</th>
                        <th className="border border-gray-300 p-2 w-[25%]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd:bg-gray-100 even:bg-white">
                            <td className="border border-gray-300 p-2 w-[10%]">1</td>
                            <td className="border border-gray-300 p-2">Sutrio</td>
                            <td className="border border-gray-300 p-2">Sutrio@gmail.com</td>
                            <td className="border border-gray-300 p-2">125367423</td>
                            <td className="border border-gray-300 p-2 flex justify-around">
                                <button className='bg-[#FECE00] px-[10%] py-[2%] rounded-sm font-bold text-sm'>Edit</button>
                                <button className='bg-red-500 px-[10%] py-[2%] rounded-sm font-bold text-sm'>Delete</button>
                            </td>
                        </tr>
                        <tr className="odd:bg-gray-100 even:bg-white">
                            <td className="border border-gray-300 p-2 w-[10%]">2</td>
                            <td className="border border-gray-300 p-2">Jane Doe</td>
                            <td className="border border-gray-300 p-2">jane.doe@example.com</td>
                            <td className="border border-gray-300 p-2">987654321</td>
                            <td className="border border-gray-300 p-2 flex justify-around">
                                <button className='bg-[#FECE00] px-[10%] py-[2%] rounded-sm font-bold text-sm'>Edit</button>
                                <button className='bg-red-500 px-[10%] py-[2%] rounded-sm font-bold text-sm'>Delete</button>
                            </td>
                        </tr>
                    </tbody>

                    </table>

                </div>
                {isOpen && (
                <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-[#04042A] rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Tambah Pegawai
                                </h3>
                                <button type="button" onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form className="p-4 md:p-5" action = "" method = "POST">
                                <div className="grid gap-4 mb-4 grid-cols-1">
                                    <div className="col-span-1">
                                        <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                                        <input type="text" name="nama" id="nama " className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan Nama" required=""/>
                                    </div>
                                    <div className="col-span-1 ">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan Email" required=""/>
                                    </div>
                                    <div className="col-span-1 ">
                                        <label htmlFor="no-induk" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No Induk</label>
                                        <input type="number" name="no-induk" id="no-induk" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan No Induk" required=""/>
                                    </div>
                        
                                </div>
                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Tambah Pegawai
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                )}
                            
            </div>
        </AdminLayout>
    )
}