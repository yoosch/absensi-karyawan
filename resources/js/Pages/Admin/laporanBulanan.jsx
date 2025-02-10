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
import {
    Spinner,
    Button,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    useDisclosure,
    Chip,
} from "@nextui-org/react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Toaster, toast } from "sonner";

import axios from "axios";

export const EyeIcon = ({
    fill = "currentColor",
    size,
    height,
    width,
    ...props
}) => {
    return (
        <svg
            class="w-6 h-6 text-[#FDB714]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                fill-rule="evenodd"
                d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clip-rule="evenodd"
            />
        </svg>
    );
};

export const DownloadIcon = ({
    fill = "currentColor",
    size,
    height,
    width,
    ...props
}) => {
    return (
        <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                fill-rule="evenodd"
                d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z"
                clip-rule="evenodd"
            />
            <path
                fill-rule="evenodd"
                d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
                clip-rule="evenodd"
            />
        </svg>
    );
};

export default function laporan_bulanan() {
    const [value, setValue] = useState("Select option...");
    const [urlIzin, setUrlIzin] = React.useState("");
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

    const year = new Date().getFullYear();
    const month = new Date().toLocaleDateString("en-GB", {
        month: "2-digit",
    });
    const years = Array.from({ length: 4 }, (_, i) => year - 3 + i);
    const [selectedPeriode, setSelectedPeriode] = useState(year);
    const [selectedBulan, setSelectedBulan] = useState(month);
    const [filteredRows, setFilteredRows] = useState([]);
    const [dataUser, setDataUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isDownloadable, setIsDownloadable] = useState(false);

    const handlePeriodeChange = (event) =>
        setSelectedPeriode(event.target.value);
    const handleBulanChange = (event) => setSelectedBulan(event.target.value);

    const handleFilter = () => {
        setLoading(true); // Start loading
        axios
            .get(`/laporan-bulanan/${selectedBulan}/${selectedPeriode}`)
            .then((response) => {
                setFilteredRows(response.data);
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
                <div className=" gap-8">
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
                                            NIK
                                        </TableCell>
                                        <TableCell align="center">
                                            Nama
                                        </TableCell>
                                        <TableCell align="center">
                                            Laporan Bulanan
                                        </TableCell>
                                        <TableCell align="center">
                                            Keterangan
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!loading && filteredRows.length > 0 ? (
                                        filteredRows.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">
                                                    {row.nik}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            isIconOnly
                                                            onPress={() => {
                                                                onOpen();
                                                                setUrlIzin(
                                                                    row.laporan
                                                                );
                                                            }}
                                                            isDisabled={
                                                                !row.laporan
                                                            }
                                                            variant="flat"
                                                            size="sm"
                                                        >
                                                            <EyeIcon />
                                                        </Button>
                                                        <Button
                                                            isIconOnly
                                                            isDisabled={
                                                                !row.laporan
                                                            }
                                                            onPress={() => {
                                                                fetch(
                                                                    row.laporan
                                                                )
                                                                    .then(
                                                                        (
                                                                            response
                                                                        ) =>
                                                                            response.blob()
                                                                    )
                                                                    .then(
                                                                        (
                                                                            blob
                                                                        ) => {
                                                                            const url =
                                                                                URL.createObjectURL(
                                                                                    blob
                                                                                );
                                                                            const link =
                                                                                document.createElement(
                                                                                    "a"
                                                                                );
                                                                            link.href =
                                                                                url;
                                                                            link.download =
                                                                                row.laporan
                                                                                    .split(
                                                                                        "/"
                                                                                    )
                                                                                    .pop(); // Extract the file name from the path
                                                                            link.click();
                                                                            URL.revokeObjectURL(
                                                                                url
                                                                            ); // Clean up the object URL
                                                                        }
                                                                    )
                                                                    .catch(
                                                                        (
                                                                            error
                                                                        ) => {
                                                                            console.error(
                                                                                "Error downloading the file:",
                                                                                error
                                                                            );
                                                                        }
                                                                    );
                                                            }}
                                                            variant="flat"
                                                            size="sm"
                                                        >
                                                            <DownloadIcon />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.laporan ? (
                                                        <Chip
                                                            size="sm"
                                                            color="success"
                                                            radius="full"
                                                            variant="flat"
                                                        >
                                                            Ada
                                                        </Chip>
                                                    ) : (
                                                        <Chip
                                                            size="sm"
                                                            color="danger"
                                                            radius="full"
                                                            variant="flat"
                                                        >
                                                            Tidak Ada
                                                        </Chip>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                colSpan={4}
                                            >
                                                {loading ? (
                                                    <Spinner />
                                                ) : (
                                                    "Tidak ada data"
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* Drawer */}
                        <Drawer
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            size="2xl"
                            backdrop="blur"
                        >
                            <DrawerContent>
                                {(onClose) => (
                                    <>
                                        <DrawerHeader className="flex flex-col gap-1">
                                            Detail Surat
                                        </DrawerHeader>
                                        <DrawerBody className="h-full">
                                            <iframe
                                                src={urlIzin}
                                                className="w-full h-full"
                                                style={{ border: "none" }}
                                            ></iframe>
                                        </DrawerBody>
                                        <DrawerFooter>
                                            <Button
                                                color="danger"
                                                variant="light"
                                                onPress={onClose}
                                            >
                                                Close
                                            </Button>
                                        </DrawerFooter>
                                    </>
                                )}
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
