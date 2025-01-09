import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';


export default function adminPegawai({data}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedPegawai, setSelectedPegawai] = useState(null);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    console.log(data);

    const handleDeleteClick = (pegawai) => {
        setSelectedPegawai(pegawai);
        setIsModalDeleteOpen(true);
        console.log(pegawai);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPegawai(null);
    };

    const handleDeleteConfirm = (id) => {

        // console.log('Deleting pegawai with email : ${selectedPegawai.email}');
        Inertia.delete(route('pegawai.destroy', id), {
            onSuccess: () => alert('Item deleted successfully'),
        });


        setIsModalOpen(false);
        selectedPegawai(null);

    }

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
                    {data.map((pegawai, index) => (
                                <tr key={pegawai.id} className="odd:bg-gray-100 even:bg-white">
                                    <td className="border border-gray-300 p-2 w-[10%]">{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{pegawai.name}</td>
                                    <td className="border border-gray-300 p-2">{pegawai.email}</td>
                                    <td className="border border-gray-300 p-2">111111111</td>
                                    <td className="border border-gray-300 p-2 flex justify-around">
                                        <button className="bg-[#FECE00] px-[10%] py-[2%] rounded-sm font-bold text-sm">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(pegawai)}
                                            className="bg-red-500 px-[10%] py-[2%] rounded-sm font-bold text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                    </table>

                </div>

                {isModalOpen &&  (
                <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow border border-[#04042A]">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Tambah Pegawai
                                </h3>
                                <button type="button" onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form className="p-4 md:p-5" action="/pegawai" method = "POST">
                             <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
                                <div className="grid gap-4 mb-4 grid-cols-1">
                                    <div className="col-span-1">
                                        <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900 ">Nama</label>
                                        <input type="text" name="nama" id="nama " className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan Nama" required=""/>
                                    </div>
                                    <div className="col-span-1 ">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                        <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Masukkan Email" required=""/>
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
                 {isModalDeleteOpen && selectedPegawai && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
                                >
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-4 text-center">
                                    <svg
                                        className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <p className="mb-4 text-gray-500 dark:text-gray-300">
                                        Apakah anda yakin ingin menghapus pegawai{' '}
                                        <span className="font-bold">{selectedPegawai.name}</span>?
                                    </p>
                                    <div className="flex justify-center items-center space-x-4">
                                        <button
                                            onClick={handleCloseModal}
                                            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border hover:bg-gray-100"
                                        >
                                            Tidak
                                        </button>
                                        {/* <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} /> */}
                                            <button
                                                onClick={() => handleDeleteConfirm(selectedPegawai.id)}
                                                className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                                            >
                                                Yakin
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                            
            </div>
        </AdminLayout>
    )
}