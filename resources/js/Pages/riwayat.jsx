import React, { useState, useEffect } from 'react';
// import { Calendar } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

  const Riwayat = ({dataAbsen}) => {
            
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthsOfYear = [
      'Januari', 
      'Februari', 
      'Maret', 
      'April', 
      'Mei', 
      'Juni', 
      'Juli', 
      'Agustus', 
      'September', 
      'Oktober', 
      'November', 
      'Desember'
  ];
  const month = monthsOfYear[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const tanggalAwal = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const tanggalAkhir = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const attendanceStats = {
    hadir: null,
    izin: null,
    alpha: null
  };

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
                <p className="text-lg font-bold text-black">{month} {year}</p>
                <p className="text-xs text-gray-500">
                  { tanggalAwal.getDate() } {month} {year} - { tanggalAkhir.getDate() } {month} {year}
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
              {dataAbsen.map((record, index) => (
                <div key={index} 
                  className="grid grid-cols-4 bg-white p-4 rounded-lg text-sm border border-gray-200"
                >
                  <div>{record.tanggal}</div>
                  <div>{record.waktu_masuk}</div>
                  <div>{record.waktu_keluar ?? '00:00'}</div>
                  <div>
                    <span className="bg-green-100 text-green-800 text-xs ml-[12.5%] px-2 py-1 rounded-xl dark:bg-green-900 dark:text-green-300">Hadir</span>
                  </div>
                  <div>
                    <img src={record.photo_keluar_url} alt="" />
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
