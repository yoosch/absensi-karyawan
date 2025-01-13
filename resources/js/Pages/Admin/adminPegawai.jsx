import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
  } from "@nextui-org/react";

  export const UserIcon = ({fill = "currentColor", size, height, width, ...props}) => {
    return (
      <svg
        data-name="Iconly/Curved/Profile"
        height={size || height || 24}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        >
          <path
            d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
            data-name="Stroke 1"
          />
          <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
        </g>
      </svg>
    );
  };

  export const MailIcon = (props) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <path
          d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
          fill="currentColor"
        />
      </svg>
    );
  };
  
  export const LockIcon = (props) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <path
          d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
          fill="currentColor"
        />
        <path
          d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
          fill="currentColor"
        />
      </svg>
    );
  };

export default function adminPegawai({data}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedPegawai, setSelectedPegawai] = useState(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
                    <Button color="primary" onPress={onOpen}>
                        Tambahkan Pegawai
                    </Button>
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
                                    <td className="border border-gray-300 p-2">{pegawai.nik}</td>
                                    <td className="border border-gray-300 p-2 flex justify-around">
                                    <Button color="danger" onPress={() => handleDeleteClick(pegawai)} startContent={<UserIcon />}>
                                        Delete user
                                    </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                    </table>

                </div>
                <>
                    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                        <ModalContent>
                        {(onClose) => (
                            <>
                            <ModalHeader className="flex flex-col gap-1">Tambah Pegawai</ModalHeader>
                            <ModalBody>
                                <form action="/pegawai" method = "POST">
                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
                                <div className='gap-2'>
                                    <div className="col-span-1 pb-[3%] ">
                                    <Input
                                        key={"outside"}
                                        labelPlacement={"outside"}
                                        placeholder="Masukkan nama"
                                        label="Nama" type="text" name="nama" id="nama"
                                        classNames={{
                                            mainWrapper: "h-full",
                                            input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                     }}
                                     />
                                    </div>
                                    <div className="col-span-1 pb-[3%] ">
                                    <Input
                                        key={"outside"}
                                        labelPlacement={"outside"}
                                        placeholder="Masukkan email"
                                        label="Email" type="email" name="email" id="email" 
                                        classNames={{
                                            mainWrapper: "h-full",
                                            input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                        }}
                                     />
                                    </div>
                                    <div className="col-span-1 pb-[3%] ">
                                    <Input
                                        key={"outside"}
                                        labelPlacement={"outside"}
                                        placeholder="Masukkan NIK"
                                        label="NIK" type="text" name="nik" id="nik" 
                                        classNames={{
                                            mainWrapper: "h-full",
                                            input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                     />
                                    </div>

                                </div>
                                    <ModalFooter>
                                        <Button type='submit' color="primary" >
                                        Submit
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                            </>
                        )}
                        </ModalContent>
                    </Modal>
                </>
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