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
    { date: '31-12-2024', checkIn: '06:57', checkOut: '17:51', status: 'Hadir (WFO)' },
    { date: '30-12-2024', checkIn: '06:53', checkOut: '16:02', status: 'Hadir (WFO)' },
    { date: '27-12-2024', checkIn: '07:34', checkOut: '18:43', status: 'Hadir (WFO)' },
    { date: '24-12-2024', checkIn: '07:05', checkOut: '17:52', status: 'Hadir (WFO)' },
    { date: '23-12-2024', checkIn: '07:06', checkOut: '18:22', status: 'Hadir (WFO)' },
    { date: '20-12-2024', checkIn: '07:13', checkOut: '17:11', status: 'Hadir (WFO)' },
    { date: '19-12-2024', checkIn: '06:48', checkOut: '16:28', status: 'Hadir (WFO)' },
  ];

  return (
    <AuthenticatedLayout>
      <div className="w-full h-full bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-4">Riwayat</h1>
            
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
              <div className="bg-navy-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-black">{attendanceStats.hadir}</div>
                <div className="text-sm text-black">Hadir</div>
              </div>
              <div className="bg-navy-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-black">{attendanceStats.izin}</div>
                <div className="text-sm text-black">Izin</div>
              </div>
              <div className="bg-navy-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-black">{attendanceStats.alpha}</div>
                <div className="text-sm text-black">Alpha</div>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-4 gap-2 bg-navy-700 text-black p-2 rounded-lg text-sm mb-2">
              <div>Tanggal</div>
              <div>Masuk</div>
              <div>Keluar</div>
              <div>Status</div>
            </div>

            {/* Attendance List */}
            <div className="space-y-2">
              {attendanceHistory.map((record, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 bg-white p-2 rounded-lg text-sm">
                  <div>{record.date}</div>
                  <div>{record.checkIn}</div>
                  <div>{record.checkOut}</div>
                  <div className="text-navy-700 font-medium">{record.status}</div>
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
