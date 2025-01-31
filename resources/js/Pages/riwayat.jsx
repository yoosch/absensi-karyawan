import React, { useState, useEffect } from 'react';
// import { Calendar } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Toaster, toast } from 'sonner'
import { Chip } from "@nextui-org/react";
import { Head } from "@inertiajs/react";

  const Riwayat = ({dataAbsen}) => {

    console.log(dataAbsen);
    const [filteredData, setFilteredData] = useState(dataAbsen);
    const [Hadir, setHadir] = useState(0);
    const [Izin, setIzin] = useState(0);
    const [Alpha, setAlpha] = useState(0);





    //set filtered data to dataAbsen until today date, not all day in month
    useEffect(() => {
      const today = new Date();
      const filteredData = dataAbsen.filter((record) => {
        const recordDate = new Date(record.tanggal);
        return recordDate <= today;
      });
      setFilteredData(filteredData);


      //count hadir, izin, alpha
      let hadir = 0;
      let izin = 0;
      let alpha = 0;

      filteredData.forEach((record) => {
        if(record.hari === 'Minggu' || record.hari === 'Sabtu') {
          hadir+=0;
        }
        else if (record.status === 'hadir' || (record.status === 'la' && !isOverNoonInUTC7)) {
          hadir++;
        }
        else if (record.status === 'c' || record.status === 's' || record.status === 'dl' || record.status === 'pending' || record.status === 'k') {
          izin++;
        }
        else if (record.status === 'alpha' || (record.status === 'la' && isOverNoonInUTC7)) {
          alpha++;
        }
      });

      setHadir(hadir);
      setIzin(izin);
      setAlpha(alpha);

    }, [dataAbsen]);

    //check is over 12.00 or not utc+7 only one const not a funtion
    const isOverNoonInUTC7 = new Date().toLocaleTimeString("en-US", { 
      timeZone: "Asia/Bangkok", 
      hour12: false, 
      hour: "2-digit" 
    }) >= 12;

    
            
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

  const handleBackClick = () => {
    window.history.back();  
  };

  return (
    <AuthenticatedLayout>
      <Head title='Riwayat' />
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
              <div className="rounded-lg p-4 bg-gradient-to-tr from-green-600 to-cyan-500">
                <div className="text-2xl font-bold text-white">{Hadir}</div>
                <div className="text-sm text-white">Hadir</div>
              </div>
              <div className="rounded-lg p-4 bg-gradient-to-tr from-orange-600 to-yellow-500">
                <div className="text-2xl font-bold text-white">{Izin}</div>
                <div className="text-sm text-white">Izin</div>
              </div>
              <div className="rounded-lg p-4 bg-gradient-to-tr from-red-700 to-pink-500">
                <div className="text-2xl font-bold text-white">{Alpha}</div>
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
            {filteredData.map((record, index) => (
              (record.hari === 'Minggu' || record.hari === 'Sabtu') ? (
                <div key={index} className="grid grid-cols-4 bg-green-50 p-4 rounded-lg text-sm border border-gray-200">
                  <div>{new Date(record.tanggal).toLocaleDateString('en-GB').replace(/\//g, '-')}</div>
                  
                  {/* Waktu Masuk and Keluar */}
                  <div>-</div>
                  <div>-</div>
                  
                  {/* Status Handling */}
                  <div>
                      <Chip
                        classNames={{
                          base: "bg-gradient-to-br from-teal-400 to-gray-300 border-small border-white/50 shadow-pink-500/30",
                          content: "drop-shadow shadow-black text-white",
                        }}
                        size="sm"
                      >
                        Libur
                      </Chip>
                  </div>
                </div>
              ) : (
                <div key={index} className="grid grid-cols-4 bg-white p-4 rounded-lg text-sm border border-gray-200">
                  {/* Date Formatting */}
                  <div>{new Date(record.tanggal).toLocaleDateString('en-GB').replace(/\//g, '-')}</div>
                  
                  {/* Waktu Masuk and Keluar */}
                  <div>{record.waktu_masuk ?? '-'}</div>
                  <div>{record.waktu_keluar ?? '-'}</div>
                  
                  {/* Status Handling */}
                  <div>
                    {(record.status === 'hadir' || (record.status === 'la' && !isOverNoonInUTC7)) && (
                      <Chip 
                        classNames={{
                          base: "bg-gradient-to-br from-green-600 to-cyan-500 border-small border-white/50 shadow-pink-500/30",
                          content: "drop-shadow shadow-black text-white",
                        }}
                        size="sm"
                      >Hadir
                      </Chip>
                    )}
                    {(record.status === 'c' || record.status === 's') && (
                      <Chip color="secondary" variant="flat">
                        {record.status === 'c' ? 'Cuti' : 'Sakit'}
                      </Chip>
                    )}
                    {(record.status === 'alpha' || (record.status === 'la' && isOverNoonInUTC7)) && (
                      <Chip
                        classNames={{
                          base: "bg-gradient-to-br from-red-700 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                          content: "drop-shadow shadow-black text-white",
                        }}
                        size="sm"
                      >
                        {record.status === 'alpha' ? 'Alpha' : 'Lupa Absen'}
                      </Chip>
                    )}
                    {record.status === 'pending' && (
                      <Chip
                        classNames={{
                          base: "bg-gradient-to-br from-orange-600 to-yellow-500 border-small border-white/50 shadow-pink-500/30",
                          content: "drop-shadow shadow-black text-white",
                        }}
                        size="sm"
                      >
                        Pending
                      </Chip>
                    )}
                    {record.status === 'dl' && (
                      <Chip
                        classNames={{
                          base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                          content: "drop-shadow shadow-black text-white",
                        }}
                        size="sm"
                      >
                        Dinas
                      </Chip>
                    )}
                  </div>
                </div>
              )
            ))}

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Riwayat;
