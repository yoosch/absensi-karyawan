import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ user}) {

    const { name, email, role } = user;

    return (
        <AuthenticatedLayout
        >
            <Head title="Dashboard" />
            <div className="mt-6">
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

                <div className='flex flex-col mt-4'>
                  <div className="flex items-center text-black rounded-md bg-w overflow-hidden shadow-md">
                    {/* Text Content */}
                    <div className="flex justify-between flex-grow px-6 py-6">
                      <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/>
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 3h-2l-.447-.894A2 2 0 0 0 12.764 1H7.236a2 2 0 0 0-1.789 1.106L5 3H3a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2Z"/>
                      </svg>
                      <h2 className="font-semibold text-lg text-center">Presensi</h2>
                    </div>
                  </div>

                  <div className="flex items-center text-black rounded-md bg-w overflow-hidden shadow-md">
                    {/* Text Content */}
                    <div className="flex justify-between flex-grow px-6 py-6">
                      <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
                      </svg>
                      <h2 className="font-semibold text-lg text-center">Cuti</h2>
                    </div>
                  </div>

                  <div className="flex items-center text-black rounded-md bg-w overflow-hidden shadow-md">
                    {/* Text Content */}
                    <div className="flex justify-between flex-grow px-6 py-6">
                      <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h7m1.506 3.429 2.065 2.065M19 7h-2M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 13H6v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L8 16Z"/>
                      </svg>
                      <h2 className="font-semibold text-lg text-center">Riwayat</h2>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </AuthenticatedLayout>
    );
}