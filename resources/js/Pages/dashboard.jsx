import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ user}) {

    const { name, email, role } = user;

    const navigateToRiwayat = () => {
        window.location.href = '/riwayat';
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="mt-6 md:px-32">
              <div className='ml-8'>
                <h1 className="text-xl font-bold text-gray-800">Selamat Datang,</h1>
                <h1 className="text-xl font-bold text-gray-800">{name}</h1>
              </div>
              <div className='mx-8 mt-4'>
                <div className="flex items-center bg-blue-800 text-white rounded-lg overflow-hidden shadow-md">
                  {/* Profile Picture */}
                  <div className="w-20 h-20 bg-gray-300 rounded-full m-4 flex-shrink-0"></div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-center flex-grow">
                    <h2 className="font-semibold text-lg">{name}</h2>
                    <p className="text-sm">1236682443452</p>
                    <p className="text-sm text-gray-200">Kepegawaian</p>
                  </div>
                </div>

                <div className='flex flex-col my-4 mt-4'>
                  <div className="flex items-center mt-6 px-2 text-black rounded-md bg-w overflow-hidden shadow-md">
                    {/* Text Content */}
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

                  <div className="flex items-center mt-6 px-2 text-black rounded-md bg-w overflow-hidden shadow-md">
                    {/* Text Content */}
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

                    <button  onClick={navigateToRiwayat}>
                        <div className="flex items-center mt-6 px-2 text-black rounded-md bg-w overflow-hidden shadow-lg">
                            {/* Text Content */}
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
                </div>
              </div>
          </div>
        </AuthenticatedLayout>
    );
}