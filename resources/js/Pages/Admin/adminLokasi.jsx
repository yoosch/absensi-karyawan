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
} from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";

export const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "LATITUDE", uid: "latitude", sortable: true },
    { name: "LONGITUDE", uid: "longitude" },
    { name: "RADIUS", uid: "radius" },
    { name: "ACTIONS", uid: "actions" },
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



const INITIAL_VISIBLE_COLUMNS = ["name", "longitude", "latitude", "radius", "actions"];

export default function adminLokasi({ data }) {
    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]); // update state with clicked location
            },
        });
        return null;
    };
    const [position, setPosition] = useState([-6.9772774, 110.4488306]); // Default position for the map
    const [step, setStep] = useState(1);
    const [nama, setNama] = useState("");
    const [radius, setRadius] = useState("");

    const handleNext = () => {
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: event.target[0].value,
            radius: event.target[1].value,
            radius: radius,
            latitude: position[0],
            longitude: position[1],
        }
        axios.post('/location', data)
            .then((response) => {
                toast.success("Berhasil menambahkan lokasi"), {
                    duration: 3000
                };

                setTimeout(() => {
                    Inertia.visit('/lokasi');
                }, 1000);
            });

        onOpenChange(false);
    };

    const handleDeleteClick = (location) => {
        setSelectedLocation(location);
        setIsModalDeleteOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalDeleteOpen(false);
        setSelectedLocation(null);
    };

    const handleDeleteConfirm = (id) => {

        Inertia.delete(route("location.destroy", id), {
            onSuccess: () => alert("Item deleted successfully"),
        });

        setIsModalOpen(false);
        selectedLocation(null);
    };

    const [selectedLocation, setSelectedLocation] = useState(null);
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

    const locations = data;

    const [page, setPage] = React.useState(1);

    const pages = Math.ceil(locations.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredLocations = [...locations];

        if (hasSearchFilter) {
            filteredLocations = filteredLocations.filter((location) =>
                location.name.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return filteredLocations;
    }, [locations, filterValue]);



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

    const renderCell = React.useCallback((location, columnKey) => {
        const cellValue = location[columnKey];

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
                                    onPress={() => handleEditPegawai(user)}
                                >
                                    Edit
                                </DropdownItem>
                                <DropdownItem
                                    onPress={() => handleDeleteClick(location)}
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
                            Tambahkan Lokasi
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {locations.length} locations
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
        locations.length,
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
            <Head title="Lokasi" />
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
                        emptyContent={"No locations found"}
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

            <Modal isOpen={isOpen}  onClose={() => onOpenChange(false)} placement="top-center">
                <ModalContent>
                    <ModalHeader>{"Tambah Lokasi"}</ModalHeader>
                    <ModalBody>
                        {step === 1 ? (
                            // Step 1: Select Location on Map
                            <>
                                <div style={{ position: "relative", height: "400px", marginBottom: "20px" }}>
                                    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <MapEvents />
                                        <Marker position={position} draggable={true} onDragend={(e) => setPosition([e.target.getLatLng().lat, e.target.getLatLng().lng])}>
                                            <Popup>
                                                <span>Location: {position[0]}, {position[1]}</span>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                                <ModalFooter style={{ justifyContent: "center" }}>
                                    <Button colorScheme="blue" onClick={handleNext}>Next</Button>
                                </ModalFooter>
                            </>
                        ) : (
                            // Step 2: Fill out Name and Radius
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: "15px" }}>
                                    <Input
                                        value={nama}
                                        onChange={(e) => setNama(e.target.value)}
                                        placeholder="Nama"
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: "15px" }}>
                                    <Input
                                        type="number"
                                        value={radius}
                                        onChange={(e) => setRadius(e.target.value)}
                                        placeholder="Radius (KM)"
                                        required
                                    />
                                </div>
                                <ModalFooter style={{ justifyContent: "center" }}>
                                    <Button colorScheme="blue" onClick={handleBack} style={{ marginRight: "10px" }}>Back</Button>
                                    <Button type="submit" colorScheme="blue">Submit</Button>
                                </ModalFooter>
                            </form>
                        )}
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