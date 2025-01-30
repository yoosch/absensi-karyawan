import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    TimeInput,
} from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

export const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAMA", uid: "nama", sortable: true },
    { name: "JAM MASUK", uid: "jam_masuk", sortable: true },
    { name: "TP", uid: "turning_point" },
    { name: "JAM KELUAR", uid: "jam_keluar" },
    { name: "DURASI ISTIRAHAT (MENIT)", uid: "durasi_istirahat" },
];

export function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const PlusIcon = ({ size = 24, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M6 12h12" />
                <path d="M12 18V6" />
            </g>
        </svg>
    );
};

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                fill="currentColor"
            />
        </svg>
    );
};

export const SearchIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
};

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...otherProps}
        >
            <path
                d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};



const INITIAL_VISIBLE_COLUMNS = ["nama", "jam_masuk", "turning_point", "jam_keluar", "durasi_istirahat", "actions"];

export default function adminShift({ data }) {
    const [nama, setNama] = useState("");
    const [jamMasuk, setJamMasuk] = useState("");
    const [mulaiJamMasuk, setMulaiJamMasuk] = useState("");
    const [turningPoint, setTurningPoint] = useState("");
    const [jamKerja, setJamKerja] = useState(0);
    const [jamKeluar, setJamKeluar] = useState("");
    const [selesaiJamKeluar, setSelesaiJamKeluar] = useState("");
    const [durasiIstirahat, setDurasiIstirahat] = useState(60);
    const [durasiIstirahatJumat, setDurasiIstirahatJumat] = useState(90);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            nama: nama,
            jamMasuk: jamMasuk,
            mulaiJamMasuk: mulaiJamMasuk,
            turningPoint: turningPoint,
            jamKerja: jamKerja,
            jamKeluar: jamKeluar,
            selesaiJamKeluar: selesaiJamKeluar,
            durasiIstirahat: durasiIstirahat ? durasiIstirahat : 60,
            durasiIstirahatJumat: durasiIstirahatJumat ? durasiIstirahatJumat : 90,
        }
        console.log("Submitting:", { data });
        axios.post('/shift', data)
            .then((response) => {
                console.log(response);
                toast.success("Berhasil menambahkan Shift"), {
                    duration: 3000
                };
            });

        onOpenChange(false);
    };

    const handleDeleteClick = (shift) => {
        setSelectedShift(shift);
        setIsModalDeleteOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalDeleteOpen(false);
        setSelectedShift(null);
    };

    useEffect(() => {
        console.log("jamMasuk", jamMasuk);
        console.log("jamKeluar", jamKeluar);
        console.log("durasi", durasiIstirahat);
        const calculateJamKerja = () => {
            if (!jamMasuk || !jamKeluar || !durasiIstirahat) return 0;

            const jamMasukInMinutes = jamMasuk.hour * 60 + jamMasuk.minute;
            const jamKeluarInMinutes = jamKeluar.hour * 60 + jamKeluar.minute;


            const totalMinutes = jamKeluarInMinutes - jamMasukInMinutes - durasiIstirahat;

            const totalHours = (totalMinutes / 60).toFixed(1);
            return totalHours;
        };

        // Update state with the calculated value
        setJamKerja(calculateJamKerja());
    }, [jamMasuk, jamKeluar, durasiIstirahat]);






    const handleDeleteConfirm = (id) => {
        // console.log('Deleting pegawai with email : ${selectedPegawai.email}');

        Inertia.delete(route("shift.destroy", id), {
            onSuccess: () => alert("Item deleted successfully"),
        });

        setIsModalOpen(false);
        selectedShift(null);
    };

    const [selectedShift, setSelectedShift] = useState(null);
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "age",
        direction: "ascending",
    });

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const shifts = data;

    const [page, setPage] = React.useState(1);

    const pages = Math.ceil(shifts.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredShifts = [...shifts];

        if (hasSearchFilter) {
            filteredShifts = filteredShifts.filter((shift) =>
                shift.name.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return filteredShifts;
    }, [shifts, filterValue]);



    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((shift, columnKey) => {
        const cellValue = shift[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    radius="full"
                                    size="sm"
                                    variant="light"
                                >
                                    <VerticalDotsIcon className="text-default-400" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="edit"
                                    onPress={() => handleEditPegawai(shift)}
                                >
                                    Edit
                                </DropdownItem>
                                <DropdownItem
                                    onPress={() => handleDeleteClick(shift)}
                                    key="delete"
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <Toaster richColors position="top-center" />
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            mainWrapper: "h-full",
                            input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                            inputWrapper:
                                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        style={{
                            boxShadow: "none !important",
                        }}
                        placeholder="Search by name..."
                        size="sm"
                        startContent={
                            <SearchIcon className="text-default-300" />
                        }
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={
                                        <ChevronDownIcon className="text-small" />
                                    }
                                    size="sm"
                                    variant="flat"
                                >
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem
                                        key={column.uid}
                                        className="capitalize"
                                    >
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            className="bg-foreground text-background"
                            endContent={<PlusIcon />}
                            size="sm"
                            onPress={onOpen}
                        >
                            Tambahkan Shift
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {shifts.length} shifts
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent text-default-400 text-small "
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        shifts.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <span className="text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${items.length} selected`}
                </span>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            th: [
                "bg-transparent",
                "text-default-500",
                "border-b",
                "border-divider",
            ],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]/tr:first:before:rounded-none",
                "group-data-[first=true]/tr:last:before:rounded-none",
                // middle
                "group-data-[middle=true]/tr:before:rounded-none",
                // last
                "group-data-[last=true]/tr:first:before:rounded-none",
                "group-data-[last=true]/tr:last:before:rounded-none",
            ],
        }),
        []
    );

    return (
        <AdminLayout>
            <div className="m-4 px-4 py-3 rounded-lg bg-white">
                <Table
                    isCompact
                    removeWrapper
                    aria-label="Example table with custom cells, pagination and sorting"
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    checkboxesProps={{
                        classNames: {
                            wrapper:
                                "after:bg-foreground after:text-background text-background",
                        },
                    }}
                    classNames={classNames}
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    topContent={topContent}
                    topContentPlacement="outside"
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={
                                    column.uid === "actions"
                                        ? "center"
                                        : "start"
                                }
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        emptyContent={"No shift found"}
                        items={sortedItems}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Modal isOpen={isOpen} onClose={() => onOpenChange(false)} placement="top-center">
                <ModalContent>
                    <ModalHeader>{"Tambah Shift"}</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 mb-4">
                                <Input
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    placeholder="Suhadi"
                                    label="Nama"
                                    labelPlacement="outside"
                                    required
                                    classNames={{
                                        mainWrapper: "h-full",
                                        input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                                        inputWrapper:
                                            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <TimeInput
                                    value={jamMasuk}
                                    className=""
                                    onChange={(time) => setJamMasuk(time)}
                                    name="jamMasuk"
                                    hourCycle={24}
                                    label="Jam Masuk"
                                    labelPlacement="outside"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <TimeInput
                                    value={mulaiJamMasuk}
                                    className=""
                                    onChange={(time) => setMulaiJamMasuk(time)}
                                    name="mulaiJamMasuk"
                                    hourCycle={24}
                                    label="Mulai Jam Masuk"
                                    labelPlacement="outside"
                                />
                            </div>
                            <div className="mb-4">
                                <TimeInput
                                    value={jamKeluar}
                                    className=""
                                    onChange={(time) => setJamKeluar(time)}
                                    name="setJamKeluar"
                                    hourCycle={24}
                                    label="Jam Keluar"
                                    labelPlacement="outside"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <TimeInput
                                    value={selesaiJamKeluar}
                                    className=""
                                    onChange={(time) => setSelesaiJamKeluar(time)}
                                    name="setSelesaiJamKeluar"
                                    hourCycle={24}
                                    label="Selesai Jam Keluar"
                                    labelPlacement="outside"
                                />
                            </div>
                            <div className="mb-4">
                                <TimeInput
                                    value={turningPoint}
                                    className=""
                                    onChange={(time) => setTurningPoint(time)}
                                    name="setTurningPoint"
                                    hourCycle={24}
                                    label="Turning Point"
                                    labelPlacement="outside"
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    isReadOnly
                                    value={jamKerja}
                                    className=""
                                    name="setJamKerja"
                                    label="Jam Kerja"
                                    labelPlacement="outside"
                                    classNames={{
                                        mainWrapper: "h-full",
                                        input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                                        inputWrapper:
                                            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    value={durasiIstirahat}
                                    onChange={(e) => setDurasiIstirahat(e.target.value)}
                                    name="setDurasiIstirahat"
                                    label="Durasi Istirahat (menit)"
                                    labelPlacement="outside"
                                    classNames={{
                                        mainWrapper: "h-full",
                                        input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                                        inputWrapper:
                                            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    value={durasiIstirahatJumat}
                                    onChange={(e) => setDurasiIstirahatJumat(e.target.value)}
                                    name="setDurasiIstirahatJumat"
                                    label="Durasi Istirahat Jumat"
                                    labelPlacement="outside"
                                    classNames={{
                                        mainWrapper: "h-full",
                                        input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                                        inputWrapper:
                                            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                />
                            </div>
                            <div className="col-span-2 mb-4">
                                <Button type="submit" color="primary" className="w-full">Submit</Button>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {isModalDeleteOpen && selectedLocation && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                            <div className="p-4 text-center">
                                <svg
                                    className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <p className="mb-4 text-gray-500 dark:text-gray-300">
                                    Apakah anda yakin ingin menghapus lokasi{" "}
                                    <span className="font-bold">
                                        {selectedLocation.name}
                                    </span>
                                    ?
                                </p>
                                <div className="flex justify-center items-center space-x-4">
                                    <button
                                        onClick={handleCloseModal}
                                        className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border hover:bg-gray-100"
                                    >
                                        Tidak
                                    </button>
                                    {/* <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} /> */}
                                    <button
                                        onClick={() =>
                                            handleDeleteConfirm(
                                                selectedLocation.id
                                            )
                                        }
                                        className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                                    >
                                        Yakin
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </AdminLayout>
    );


}