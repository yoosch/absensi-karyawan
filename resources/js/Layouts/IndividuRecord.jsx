import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import PrimaryButton from '@/Components/PrimaryButton';
import { Button } from "@nextui-org/react";
import { Toaster, toast } from 'sonner';

const IndividuRecord = ({ filteredRows, isDownloadable, user }) => {
  const tableRef = useRef(null);

  const bulan = new Date().toLocaleString('default', { month: 'long' });
  const tahun = new Date().getFullYear();

  const exportToXLSX = () => {
    if (!filteredRows || filteredRows.length === 0) {
      alert("No data available to export.");
      return;
    }

    console.log(user);

    // Generate the worksheet from the table DOM
    const ws = XLSX.utils.table_to_sheet(tableRef.current);

    // Add workbook and export
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Rekap Absen');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const fileName = `${user?.name || "UnknownUser"}_${user?.nik || "UnknownNIK"}_${bulan}_${tahun}_Rekap_Absen.xlsx`;
    saveAs(file, fileName);
  };

  const FormatDate = (date) => {
    const d = new Date(date);
    
    const s = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    console.log(s);
    return s;
  }

  const handleDownload = () => {
    
    (!isDownloadable) && toast.warning('Terdapat Perizinanan yang belum di approve');

  };

  return (
    <div>
      <Toaster position="top-center" RichColors />
        <div hidden>
        <table ref={tableRef} border="1" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th colSpan={17} style={{ textAlign: 'center' }}>Rekap Absen</th>
            </tr>
            <tr>
              <th colSpan={17} style={{ textAlign: 'center' }}>
                {user?.name || "Unknown User"} [{user?.nik || "Unknown NIK"}] Periode {bulan} Tahun {tahun}
              </th>
            </tr>
            <tr>
              <th rowSpan={2}>Hari</th>
              <th rowSpan={2}>{`   Tanggal   `}</th>
              <th colSpan={2}>Absensi</th>
              <th colSpan={7}>Kehadiran</th>
              <th colSpan={3}>Lembur</th>
              <th colSpan={2}>Summary</th>
              <th rowSpan={2}>Keterangan</th>
            </tr>
            <tr>
              <th>In</th>
              <th>Out</th>
              <th>Masuk</th>
              <th>Telat</th>
              <th>Alpha</th>
              <th>DL</th>
              <th>C</th>
              <th>S</th>
              <th>LA</th>
              <th>L1</th>
              <th>L2</th>
              <th>L3</th>
              <th>WK</th>
              <th>KJ</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              <>
                {filteredRows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.hari}</td>
                    <td>{FormatDate(row.tanggal)}</td>
                    <td>{row.inn}</td>
                    <td>{row.out}</td>
                    <td>{row.masuk ? '✔' : ''}</td>
                    <td>{row.telat ? '✔' : ''}</td>
                    <td>{row.alpha ? '✔' : ''}</td>
                    <td>{row.dl ? '✔' : ''}</td>
                    <td>{row.c ? '✔' : ''}</td>
                    <td>{row.s ? '✔' : ''}</td>
                    <td>{row.la ? '✔' : ''}</td>
                    <td>{row.l1}</td>
                    <td>{row.l2}</td>
                    <td>{row.l3}</td>
                    <td>{row.wk}</td>
                    <td>{row.kj}</td>
                    <td>{row.keterangan}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} style={{ fontWeight: 'bold', textAlign: 'center' }}>Summary</td>
                  <td>{filteredRows.filter(row => row.masuk).length}</td>
                  <td>{filteredRows.filter(row => row.telat).length}</td>
                  <td>{filteredRows.filter(row => row.alpha).length}</td>
                  <td>{filteredRows.filter(row => row.dl).length}</td>
                  <td>{filteredRows.filter(row => row.c).length}</td>
                  <td>{filteredRows.filter(row => row.s).length}</td>
                  <td>{filteredRows.reduce((sum, row) => sum + (row.la || 0), 0)}</td>
                  <td>{filteredRows.reduce((sum, row) => sum + (row.l1 || 0), 0)}</td>
                  <td>{filteredRows.reduce((sum, row) => sum + (row.l2 || 0), 0)}</td>
                  <td>{filteredRows.reduce((sum, row) => sum + (row.l3 || 0), 0)}</td>
                  <td>{filteredRows.reduce((sum, row) => sum + (row.wk || 0), 0)}</td>
                  <td>{filteredRows.reduce((sum, row) => sum + (row.kj || 0), 0)}</td>
                  <td></td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan={17} style={{ textAlign: 'center' }}>Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

      {/* Export Button */}
      <div style={{ marginTop: '1rem' }}>
        <Button className='bg-[#fdb714]' isDisabled={!isDownloadable} onPress={() => {
          exportToXLSX();
          handleDownload();
        }}>
          Download as XLSX
        </Button>
      </div>
    </div>
  );
};

export default IndividuRecord;
