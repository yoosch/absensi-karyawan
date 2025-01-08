import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Riwayat = () => {
  const [currentPeriod, setCurrentPeriod] = useState({
    month: 'Desember 2024',
    startDate: '01-12-2024',
    endDate: '31-12-2024'
  });

  const attendanceStats = {
    hadir: 28,
    izin: 3,
    alpha: 0
  };

  const attendanceHistory = [
    { date: '31-12-2024', checkIn: '06:57', checkOut: '17:51', status: 'Hadir' },
    { date: '30-12-2024', checkIn: '06:53', checkOut: '16:02', status: 'Hadir' },
    { date: '27-12-2024', checkIn: '07:34', checkOut: '18:43', status: 'Hadir' },
    { date: '24-12-2024', checkIn: '07:05', checkOut: '17:52', status: 'Hadir' },
    { date: '23-12-2024', checkIn: '07:06', checkOut: '18:22', status: 'Hadir' },
    { date: '20-12-2024', checkIn: '07:13', checkOut: '17:11', status: 'Hadir' },
    { date: '19-12-2024', checkIn: '06:48', checkOut: '16:28', status: 'Hadir' },
  ];

  const handleBackClick = () => {
    window.history.back();  
  };

  return (
    <AuthenticatedLayout>
      <div className="mt-6 px-8 md:px-32 flex justify-center items-center">
        <div className="w-full bg-white">
          <div className="text-center mb-6">
            
            {/* Period Selector */}
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm mb-6">
              <div className="text-left">
                <p className="text-sm text-gray-500">Periode</p>
                <p className="text-lg font-bold text-black">{currentPeriod.month}</p>
                <p className="text-xs text-gray-500">
                  {currentPeriod.startDate} - {currentPeriod.endDate}
                </p>
              </div>
            </div>

            {/* Attendance Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-navy-700 rounded-lg p-4 bg-blue-900">
                <div className="text-2xl font-bold text-white">{attendanceStats.hadir}</div>
                <div className="text-sm text-white">Hadir</div>
              </div>
              <div className="bg-navy-700 rounded-lg p-4 bg-blue-900">
                <div className="text-2xl font-bold text-white">{attendanceStats.izin}</div>
                <div className="text-sm text-white">Izin</div>
              </div>
              <div className="bg-navy-700 rounded-lg p-4 bg-blue-900">
                <div className="text-2xl font-bold text-white">{attendanceStats.alpha}</div>
                <div className="text-sm text-white">Alpha</div>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-4 bg-navy-700 text-black rounded-lg text-sm mb-2">
              <div className="bg-blue-900 rounded-lg mr-2 py-2 text-white">Tanggal</div>
              <div className="bg-blue-900 rounded-lg mx-2 p-2 text-white">Masuk</div>
              <div className="bg-blue-900 rounded-lg mx-2 p-2 text-white">Keluar</div>
              <div className="bg-blue-900 rounded-lg ml-2 pl-2 py-2 text-white">Status</div>
            </div>

            {/* Attendance List */}
            <div className="space-y-2">
              {attendanceHistory.map((record, index) => (
                <div key={index} 
                  className="grid grid-cols-4 bg-white p-4 rounded-lg text-sm border border-gray-200"
                >
                  <div>{record.date}</div>
                  <div>{record.checkIn}</div>
                  <div>{record.checkOut}</div>
                  <div>
                    <span class="bg-green-100 text-green-800 text-xs ml-[12.5%] px-2 py-1 rounded-xl dark:bg-green-900 dark:text-green-300">{record.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Riwayat;
