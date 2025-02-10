import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import IndividuRecord from "@/Layouts/IndividuRecord";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchableDropdown from "@/Components/SearchableDropdown";
// import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {
    TextField,
    Autocomplete,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    alpha,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Spinner, Button } from "@nextui-org/react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Toaster, toast } from "sonner";

import axios from "axios";

const ExportTable = ({ filteredRows, loading }) => {
    const exportToXLSX = () => {
        const ws = XLSX.utils.json_to_sheet(filteredRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Export the XLSX file
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], {
            bookType: "xlsx",
            type: "application/octet-stream",
        });
        saveAs(file, "table_data.xlsx");
    };

    return (
        <div>
            <PrimaryButton onClick={exportToXLSX}>
                Download as XLSX
            </PrimaryButton>
        </div>
    );
};

export default function rekap({ data, absen }) {
    const [value, setValue] = useState("Select option...");
    const myFilter = (textValue, inputValue) => {
        if (inputValue.length === 0) {
            return true;
        }

        // Normalize both strings so we can slice safely
        // take into account the ignorePunctuation option as well...
        textValue = textValue.normalize("NFC").toLocaleLowerCase();
        inputValue = inputValue.normalize("NFC").toLocaleLowerCase();

        return textValue.slice(0, inputValue.length) === inputValue;
    };

    const rows = absen.map((item) => {
        return {
            hari: item.hari,
            tanggal: item.tanggal,
            inn: item.waktu_masuk,
            out: item.waktu_keluar,
            masuk: item.masuk,
            telat: item.telat,
            alpha: item.alpha,
            dl: item.dl,
            c: item.c,
            s: item.s,
            la: item.la,
            wk: item.wk,
            kj: item.kj,
        };
    });

    const year = new Date().getFullYear();
    const month = new Date().toLocaleDateString("en-GB", {
        month: "2-digit",
    });
    const years = Array.from({ length: 4 }, (_, i) => year - 3 + i);

    const [selectedNik, setSelectedNik] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedPeriode, setSelectedPeriode] = useState(year);
    const [selectedBulan, setSelectedBulan] = useState(month);
    const [filteredRows, setFilteredRows] = useState([]);
    const [dataUser, setDataUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isDownloadable, setIsDownloadable] = useState(false);

    const handleNikChange = (event, value) => {
        setSelectedNik(value);
        if (value) {
            setSelectedName(
                data.find((item) => item.nik === value.nik) || null
            );
        } else {
            setSelectedName(null);
        }
    };

    const handleNameChange = (event, value) => {
        setSelectedName(value);
        if (value) {
            setSelectedNik(
                data.find((item) => item.name === value.name) || null
            );
        } else {
            setSelectedNik(null);
        }
    };

    const handlePeriodeChange = (event) =>
        setSelectedPeriode(event.target.value);
    const handleBulanChange = (event) => setSelectedBulan(event.target.value);

    const handleFilter = () => {
        setLoading(true); // Start loading
        axios
            .get(
                `/rekap-individu/${selectedNik.nik}/${selectedBulan}/${selectedPeriode}`
            )
            .then((response) => {
                setFilteredRows(response.data.dataAbsen);
                // Set fetched data
                setIsDownloadable(response.data.isDownloadable);
                setDataUser(response.data.user);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };

    return (
        <AdminLayout>
            <Head title="Rekap Individu" />
            <div className="mt-[3%] mx-[5%]">
                <div className="w-full border-b-2">
                    <h1 className="font-bold">FILTER</h1>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div className="mt-4">
                        <label
                            htmlFor="nik"
                            className="block text-sm font-medium text-gray-700"
                        >
                            NIK
                        </label>
                        <Autocomplete
                            disablePortal
                            options={data}
                            getOptionLabel={(option) => option.nik || ""}
                            value={selectedNik}
                            onChange={handleNikChange}
                            renderInput={(params) => (
                                <div
                                    ref={params.InputProps.ref}
                                    className="relative mt-1"
                                >
                                    <input
                                        {...params.inputProps}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Cari NIK"
                                    />
                                </div>
                            )}
                            classes={{
                                paper: "shadow-md rounded-md",
                                option: "px-3 py-2 hover:bg-gray-100",
                            }}
                        />
                        <label
                            htmlFor="nama"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nama
                        </label>
                        <Autocomplete
                            disablePortal
                            options={data}
                            getOptionLabel={(option) => option.name || ""}
                            value={selectedName}
                            onChange={handleNameChange}
                            renderInput={(params) => (
                                <div
                                    ref={params.InputProps.ref}
                                    className="relative mt-1"
                                >
                                    <input
                                        {...params.inputProps}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Cari Pegawai"
                                    />
                                </div>
                            )}
                            classes={{
                                paper: "shadow-md rounded-md",
                                option: "px-3 py-2 hover:bg-gray-100",
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="option"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Periode
                        </label>
                        <select
                            id="option"
                            name="option"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={selectedPeriode}
                            onChange={handlePeriodeChange}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="option"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Bulan
                        </label>
                        <select
                            id="option"
                            name="option"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={selectedBulan}
                            onChange={handleBulanChange}
                        >
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                </div>
                <div className="mt-[3%]">
                    <PrimaryButton onClick={handleFilter}>
                        Tampilkan
                    </PrimaryButton>
                </div>
            </div>
            <div className="mt-[3%] mx-[5%]">
                <div className="flex flex-col">
                    <div className="flex flex-grow overflow-hidden">
                        <TableContainer
                            component={Paper}
                            className="max-h-[40vh] overflow-y-auto"
                        >
                            <Table
                                size="small"
                                stickyHeader
                                aria-label="a dense table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            Hari
                                        </TableCell>
                                        <TableCell align="center">
                                            Tanggal
                                        </TableCell>
                                        <TableCell align="center">In</TableCell>
                                        <TableCell align="center">
                                            Out
                                        </TableCell>
                                        <TableCell align="center">
                                            Masuk
                                        </TableCell>
                                        <TableCell align="center">
                                            Telat
                                        </TableCell>
                                        <TableCell align="center">
                                            Alpha
                                        </TableCell>
                                        <TableCell align="center">DL</TableCell>
                                        <TableCell align="center">C</TableCell>
                                        <TableCell align="center">S</TableCell>
                                        <TableCell align="center">LA</TableCell>
                                        <TableCell align="center">WK</TableCell>
                                        <TableCell align="center">KJ</TableCell>
                                        <TableCell align="center">L</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!loading && filteredRows.length > 0 ? (
                                        filteredRows.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                className={`${
                                                    row.hari === "Sabtu" ||
                                                    row.hari === "Minggu"
                                                        ? "bg-green-200"
                                                        : ""
                                                }`}
                                            >
                                                <TableCell align="center">
                                                    {row.hari}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.formatted_tanggal}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.inn}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.out}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.masuk && (
                                                        <div>
                                                            <CheckIcon
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                            <span className="hidden">
                                                                ✓
                                                            </span>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.telat && (
                                                        <div>
                                                            <CheckIcon
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                            <span className="hidden">
                                                                ✓
                                                            </span>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.alpha && (
                                                        <div>
                                                            <CheckIcon
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                            <span className="hidden">
                                                                ✓
                                                            </span>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.dl && (
                                                        <div>
                                                            <CheckIcon
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                            <span className="hidden">
                                                                ✓
                                                            </span>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.c && (
                                                        <div>
                                                            <CheckIcon
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                            <span className="hidden">
                                                                ✓
                                                            </span>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.s && (
                                                        <div>
                                                            <CheckIcon
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                            <span className="hidden">
                                                                ✓
                                                            </span>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.la && (
                                                        <div>
                                                            <CheckIcon
                                                                style={{
                                                                    color: "green",
                                                                }}
                                                            />
                                                            <span className="hidden">
                                                                ✓
                                                            </span>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.hari === "Sabtu" ||
                                                    row.hari === "Minggu"
                                                        ? null
                                                        : row.wk}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {row.hari === "Sabtu" ||
                                                    row.hari === "Minggu"
                                                        ? null
                                                        : row.kj}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.hari === "Sabtu" ||
                                                    row.hari === "Minggu"
                                                        ? null
                                                        : row.lembur}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                colSpan={13}
                                            >
                                                {loading ? (
                                                    <Spinner />
                                                ) : (
                                                    "Tidak ada data"
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            {/* Export to XLSX Button */}
            <div className="flex mx-[5%] justify-end">
                <IndividuRecord
                    filteredRows={filteredRows}
                    isDownloadable={isDownloadable}
                    user={dataUser}
                />
            </div>
        </AdminLayout>
    );
}
