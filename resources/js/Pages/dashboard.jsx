import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import '../../css/dashboard.css';
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import { Inertia } from '@inertiajs/inertia';
import { useState, useCallback, usePage } from 'react';
import {Spinner} from "@nextui-org/react";
import {Chip, Progress} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Toaster, toast } from 'sonner';
import { Link } from '@inertiajs/react';

export default function Dashboard({user,laporan_bulanan}) {
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleFileUpload = (file) => {
    const maxFileSize = 5 * 1024 * 1024; 
    setIsUploading(true);
    
    setTimeout(() => {
      if (file && file.type === "application/pdf") {
        if (file.size <= maxFileSize) {
          setFileInfo(file.name);
          setError("");
        } else {
          setError("Ukuran file maksimal 5MB.");
          setFileInfo(null);
        }
      } else {
        setError("File yang diunggah harus berformat .pdf.");
        setFileInfo(null);
      }
      setIsUploading(false);
    }, 1500); 
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const { name } = user;

    const UserLives = ({ user }) => {
      const imageSrc = "/heart.png"; 

      const imageAlt = "Life Icon";
      return (
        <>
          {Array(user.nyawa).fill().map((_, index) => (
            <img
                key={index}
                src={imageSrc}
                alt={imageAlt}
                className="life-icon h-6"
            />
          ))}
        </>
      )
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const file = formData.get("file_laporan");
  
    if (!file) {
      setError("File belum diunggah.");
      return;
    }
  
    Inertia.post(route('dashboard.store'), formData, {
      onSuccess: () => {
        toast.success('Event has been created');
      },
      onError: (errors) => {
        console.log('Terjadi kesalahan:', errors);
        toast.error('Gagal mengunggah file');
      }
    });
  };

  const FileUploadHistoryModal = ({ isOpen, onOpenChange }) => {
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='max-w-2xl'>
          <ModalHeader className="flex flex-col gap-1">
            Histori Unggahan File Anda
          </ModalHeader>
          <ModalBody>
            {laporan_bulanan && laporan_bulanan.length > 0 ? (
              <ul>
                {laporan_bulanan.map((laporan, index) => (
                  <li key={index}>
                    <p><strong>File Anda: </strong>{laporan.file_laporan.split('/').pop()}</p>
                    <p><strong>Bulan: </strong>{laporan.bulan}</p>
                    <p><strong>Tahun: </strong>{laporan.tahun}</p>
                    <p><strong>Last Uploaded: </strong>{new Date(laporan.updated_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</p>

                    <div className="mt-3">
                      <iframe
                        src={`/storage/${laporan.file_laporan}`}
                        width="100%"
                        height="400px"
                        title={`Preview for ${laporan.file_laporan}`}
                      />
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tidak ada file yang diunggah.</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => onOpenChange(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    );
  };

  const navigateToAbsensi = () => {
      Inertia.visit('/absen');
  }

  const navigateToizin = () => {
      Inertia.visit('/izin');
  };

  const navigateToRiwayat = () => {
      Inertia.visit('/riwayat');
  };

  const getDay = () => {
      const date = new Date();
      return date.getDay();
  };

  const Hari = () => {
    const date = new Date();
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return days[date.getDay()];
  };

    return (
        <AuthenticatedLayout>
            <Toaster />
            <Head title="Dashboard" />
            <div className="mt-6 md:px-32">
              <div className='ml-8 flex justify-left items-center'>
                <h1 className="animate-typing text-xl font-bold text-gray-800 whitespace-nowrap animate-marquee">
                    Selamat Datang, {name}
                </h1>
                <span className="text-2xl" aria-label="Waving Hand" role="img">👋</span>
              </div>
              <div className='mx-8 mt-4'>
                <div className="flex items-center bg-blue-800 text-white rounded-lg overflow-hidden shadow-md border-b-4 border-[#fdb714]">
                  <div className="w-20 h-20 bg-gray-300 rounded-full m-4 flex-shrink-0 overflow-hidden">
                    <img src="/putech.png" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col pl-5 justify-center flex-grow">
                    <div className='flex'>
                      <UserLives user={user} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">{name}</h2>
                      <p className="text-sm">1236682443452</p>
                      <p className="text-sm text-gray-200">Kepegawaian</p>
                    </div>
                  </div>
                  <div className = "my-3 mx-5 gap-2 flex flex-col align items-start">
                    <p>Shift : {user.shift}</p>
                    <Chip color="warning" variant="dot">
                        {user.shift === 'Pagi' && !["Jumat", "Sabtu", "Minggu"].includes(Hari()) ? (
                            <p className="text-white">{Hari()} : 07.30 - 16.00</p>
                        ) : user.shift === 'Pagi' && ["Jumat"].includes(Hari()) ? (
                            <p className="text-white">{Hari()} : 07.30 - 16.30</p>
                        ) : user.shift == 'Siang' && !["Sabtu", "Minggu"].includes(Hari()) ?(
                            <p className="text-white">{Hari()} : 14.00 - 21.00</p>
                        ) : ["Sabtu"].includes(Hari())(
                          <p className="text-white">Hari Libur</p>
                        )
                        }
                    </Chip>
                  </div>
              </div>

                <div className='flex flex-col my-4 mt-4'>
                <button onClick={navigateToAbsensi} >
                  <div className="flex items-center mt-6 px-2 text-black rounded-md bg-w overflow-hidden shadow-md border-l-2 border-[#fdb714]">
                    <div className="flex justify-between items-center flex-grow px-6 py-6">
                      <svg className="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/>
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 3h-2l-.447-.894A2 2 0 0 0 12.764 1H7.236a2 2 0 0 0-1.789 1.106L5 3H3a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2Z"/>
                      </svg>
                      <div className='flex flex-col'> 
                        <h2 className="font-semibold text-end text-lg ">Presensi</h2>
                        <h3 className="  font-light text-xs text-end ">Presensi menggunakan foto wajah</h3>
                      </div>
                    </div>
                  </div>
                  </button>

                  <button onClick={navigateToizin}>
                    <div className="flex items-center mt-6 px-2 text-black rounded-md bg-w overflow-hidden shadow-md border-l-2 border-[#fdb714]">
                        <div className="flex justify-between flex-grow px-6 py-6">
                          <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-building-fill-x w-9 h-9" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-3.59 1.787A.5.5 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.5 4.5 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708"/>
                          </svg>
                          <div className='flex flex-col'>
                            <h2 className="font-semibold text-end text-lg">Izin</h2>
                            <h3 className="  font-light text-xs text-end ">Pengajuan izin berbasis surat</h3>
                          </div>
                        </div>
                    </div>
                  </button>

                  <button  onClick={navigateToRiwayat} className="mb-4" >
                      <div className="flex items-center mt-6 px-2 text-black rounded-md bg-w overflow-hidden shadow-lg border-l-2 border-[#fdb714]">
                          <div className="flex justify-between flex-grow px-6 py-6">
                          <svg className="w-9 h-9" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v3m5-3v3m5-3v3M1 7h7m1.506 3.429 2.065 2.065M19 7h-2M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 13H6v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L8 16Z"/>
                          </svg>
                          <div className='flex flex-col'>
                              <h2 className="font-semibold text-lg text-end">Riwayat</h2>
                              <h3 className="  font-light text-xs text-end ">Riwayat presensi dan izin</h3>
                          </div>
                          </div>
                      </div>
                  </button>

                  <Card className="py-4 mb-4">
                  <CardHeader className="pb-3 pt-2 px-4 flex flex-row items-center justify-center relative">
                    <div className = "flex flex-col justify-center items-center">
                      <p className="text-tiny-800 font-bold text-center">Unggah Laporan Bulanan</p>
                      <small className="text-default-500 italic text-center">Silahkan unggah file .pdf Anda di sini</small>
                    </div>
                    <Button onPress={onOpen} className="absolute left-4 bottom-4"> Recent Upload</Button>
                  
                    <FileUploadHistoryModal isOpen={isOpen} onOpenChange={onOpenChange} />

                  </CardHeader>

                    <CardBody>
                      <form onSubmit={handleSubmit} className="overflow-visible py-2 items-center"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}>
                      <label 
                        htmlFor="file-upload" 
                        className="cursor-pointer flex flex-col items-center bg-gray-100 border-2 border-dashed border-gray-500 rounded-lg py-10 px-6 hover:bg-gray-300 transition-colors duration-300 w-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                        </svg>
                        <p className="mt-2 text-gray-600">Drag & drop atau klik untuk unggah file</p>
                        <input 
                          id="file-upload" 
                          type="file" 
                          name="file_laporan"
                          accept=".pdf" 
                          onChange={(e) => handleFileUpload(e.target.files[0])} 
                          className="hidden"
                        />
                        {isUploading && <Spinner color="warning" label="Loading..." />}
                      </label>
                      {fileInfo && <p className="mt-4 text-center text-green-600">File berhasil diunggah: {fileInfo}</p>}
                      {error && <p className="mt-4 text-center text-red-600">{error}</p>}

                      <div className="mt-6">
                          <Button type="submit" className="w-full bg-[#213468] text-white" >
                              Submit Laporan
                          </Button>
                      </div>
                    </form>
                    </CardBody>

                  </Card>
                </div>
              </div>
          </div>
        </AuthenticatedLayout>
    );
  }
