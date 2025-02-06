import React from "react";
import AdminLayout from '@/Layouts/AdminLayout';
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
  Chip,
  User,
  Pagination,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from 'sonner'
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";

export const columns = [
  { name: "NAMA", uid: "nama", sortable: true },
  { name: "NIK", uid: "nik", sortable: true },
  { name: "TANGGAL MULAI", uid: "tanggal_mulai", sortable: true },
  { name: "TANGGAL SELESAI", uid: "tanggal_selesai" },
  { name: "DESKRIPSI", uid: "deskripsi" },
  { name: "SURAT", uid: "surat_pendukung", sortable: true },
  { name: "ACTIONS", uid: "action" },
  { name: "STATUS", uid: "status" },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1)?.toLowerCase() : "";
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

export const CheckIcon = ({ size, height, width, ...props }) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
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

export const WarningIcon = (props) => {
  return (
      <svg class="w-6 h-6 text-[#FDB714] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
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

export const EyeIcon = ({ fill = "currentColor", size, height, width, ...props }) => {
  return (
    <svg class="w-6 h-6 text-[#FDB714]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
    </svg>
  );
};

export const DownloadIcon = ({ fill = "currentColor", size, height, width, ...props }) => {
    return (
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clip-rule="evenodd"/>
        <path fill-rule="evenodd" d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clip-rule="evenodd"/>
      </svg>      
    );
};

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["nama", "nik", "tanggal_mulai", "tanggal_selesai", "deskripsi", "surat_pendukung", "action", "status"];

export default function LupaAbsen({ lupaAbsenData }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set());
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [urlIzin, setUrlIzin] = React.useState("");
  const [user, setUser] = React.useState(lupaAbsenData);
  console.log(user);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUser = [...user];

    if (hasSearchFilter && filterValue) {
      const searchValue = filterValue.toLowerCase();
      filteredUser = filteredUser.filter((user) => {
        const { nama, nik, deskripsi, surat_pendukung } = user;
        return (
          nama?.toLowerCase().includes(searchValue) ||
          nik?.toLowerCase().includes(searchValue) ||
          deskripsi?.toLowerCase().includes(searchValue) ||
          surat_pendukung?.toLowerCase().includes(searchValue)
        );
      });
    }

    return filteredUser;
  }, [user, filterValue, statusFilter, hasSearchFilter]);


  const pages = Math.ceil(filteredItems.length / rowsPerPage);

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

  const approvral = (id, approv) => {
    console.log(id)
    console.log(approv)
    axios.get(`/approval-cuti/${id}/${approv}`)
      .then((response) => {
        console.log(response.data);
        toast.success("Berhasil mengubah status persetujuan")

        setUser((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, status: approv } : user
          )
        );

        Inertia.visit('/absen-lupa-absen');

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }

  const renderCell = React.useCallback((user, columnKey) => {
    switch (columnKey) {
      case "surat_pendukung":
        const filePath = user.surat_pendukung;
        return filePath ? (
          <>
            <div className="flex gap-2">
            <Button isIconOnly onPress={() => {
              onOpen();
              setUrlIzin(filePath);
            }}
              variant="flat"
              size="sm">
              <EyeIcon />
            </Button>
            <Button isIconOnly onPress={() => {
                                                fetch(filePath)
                                                    .then((response) => response.blob())
                                                    .then((blob) => {
                                                    const url = URL.createObjectURL(blob);
                                                    const link = document.createElement("a");
                                                    link.href = url;
                                                    link.download = filePath.split("/").pop(); // Extract the file name from the path
                                                    link.click();
                                                    URL.revokeObjectURL(url); // Clean up the object URL
                                                    })
                                                    .catch((error) => {
                                                    console.error("Error downloading the file:", error);
                                                    });
                                            }}
              variant="flat"
              size="sm">
              <DownloadIcon />
            </Button>
            </div>
          </>
        ) : (
          "No File"
        );
      case "action":
        const status = user.status_persetujuan;
        return (
          <div className="flex gap-2">
            <Button
              onPress={() => approvral(user.id, "Disetujui")}
              color="primary"
              {...(status === "Disetujui" ? { isDisabled: true } : {})}
            >
              Setuju
            </Button>
            <Button
              color="warning"
              onPress={() => approvral(user.id, "Ditolak")}
              {...(status === "Ditolak" ? { isDisabled: true } : {})}
            >
              Tolak
            </Button>

          </div>
        )
      case "status":
                                return user.status_persetujuan === "Disetujui" ? (
                                  <Chip color="success" variant="solid">
                                    Disetujui
                                  </Chip>
                                ) : (
                                  <Chip color={user.status_persetujuan === "Ditolak" ? 'danger' : 'warning'}  variant="solid">
                                    {user.status_persetujuan === "Ditolak" ? 'Ditolak' : 'Pending'}
                                  </Chip>
                                );
              case "deskripsi":
                return (
                    <div className="whitespace-normal break-words max-w-44">
                        {user.deskripsi}
                    </div>
                );

      default:
        const cellValue = user[columnKey];
        return cellValue;
    }
  }, []);





  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

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

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              mainWrapper: "h-full",
              input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search by name / nik / email / description"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
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
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {user.length} record</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="rounded outline-none px-1 text-default-400 text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    user.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (

      <div className="py-2 px-2 flex justify-between items-center">
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <AdminLayout>
      <Head title="Absen Lupa Absen" />
      <div className="mt-[3%] mx-[5%]">
        <Table
          isHeaderSticky
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          selectedKeys={selectedKeys}
          selectionMode="=multiple"
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
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"Tidak Ada Data"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>
                  {renderCell(item, columnKey)}
                </TableCell>
                }

              </TableRow>

            )}
          </TableBody>
        </Table>

        {/* Drawer */}
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" backdrop="blur">
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
                    style={{ border: 'none' }}
                  ></iframe>
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
        <Toaster
          position="top-center"
          richColors
        >
        </Toaster>
      </div>
    </AdminLayout>
  )
}

