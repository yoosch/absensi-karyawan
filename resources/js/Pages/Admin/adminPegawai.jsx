import React from "react";
import { useState } from "react";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Inertia } from "@inertiajs/inertia";

export const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "NIK", uid: "nik", sortable: true},
  {name: "EMAIL", uid: "email"},
  {name: "ACTIONS", uid: "actions"},
];

export const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];



export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const PlusIcon = ({size = 24, width, height, ...props}) => {
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

export const VerticalDotsIcon = ({size = 24, width, height, ...props}) => {
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

export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}) => {
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

const INITIAL_VISIBLE_COLUMNS = ["name", "nik", "actions"];

export default function adminPegawai({data}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedPegawai, setSelectedPegawai] = useState(null);


  const users = data;

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const handleDeleteClick = (pegawai) => {
    setSelectedPegawai(pegawai);
    setIsModalDeleteOpen(true);
    console.log(pegawai);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPegawai(null);
    };

    const handleDeleteConfirm = (id) => {

        // console.log('Deleting pegawai with email : ${selectedPegawai.email}');
        Inertia.delete(route('pegawai.destroy', id), {
            onSuccess: () => alert('Item deleted successfully'),
        });


        setIsModalOpen(false);
        selectedPegawai(null);

    }

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

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "full", size: "sm", src: user.avatar}}
            classNames={{
              description: "text-default-500",
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "nik":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.nik}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem onPress={() => handleDeleteClick(user)} key="delete">Delete</DropdownItem>
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
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              mainWrapper: "h-full",
              input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            style={{
                boxShadow: "none !important", // Ensures your style overrides others
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
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
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button className="bg-foreground text-background" endContent={<PlusIcon />} size="sm" onPress={onOpen}>
              Tambahkan Pegawai
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
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
    users.length,
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
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
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
    [],
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
            wrapper: "after:bg-foreground after:text-background text-background",
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
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
            >
                {column.name}
            </TableColumn>
            )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
            {(item) => (
            <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
            )}
        </TableBody>
        </Table>
        </div>
        <>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                        <ModalContent>
                        {(onClose) => (
                            <>
                            <ModalHeader className="flex flex-col gap-1">Tambah Pegawai</ModalHeader>
                            <ModalBody>
                                <form action="/pegawai" method = "POST">
                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
                                <div className='gap-2'>
                                    <div className="col-span-1 pb-[3%] ">
                                    <Input
                                        key={"outside"}
                                        labelPlacement={"outside"}
                                        placeholder="Masukkan nama"
                                        label="Nama" type="text" name="nama" id="nama"
                                        classNames={{
                                            mainWrapper: "h-full",
                                            input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                     }}
                                     />
                                    </div>
                                    <div className="col-span-1 pb-[3%] ">
                                    <Input
                                        key={"outside"}
                                        labelPlacement={"outside"}
                                        placeholder="Masukkan email"
                                        label="Email" type="email" name="email" id="email" 
                                        classNames={{
                                            mainWrapper: "h-full",
                                            input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                        }}
                                     />
                                    </div>
                                    <div className="col-span-1 pb-[3%] ">
                                    <Input
                                        key={"outside"}
                                        labelPlacement={"outside"}
                                        placeholder="Masukkan NIK"
                                        label="NIK" type="text" name="nik" id="nik" 
                                        classNames={{
                                            mainWrapper: "h-full",
                                            input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                     />
                                    <div className="col-span-1 pb-[3%] ">
                                    <Input
                                        key={"outside"}
                                        labelPlacement={"outside"}
                                        placeholder="Masukkan NIK"
                                        label="NIK" type="text" name="nik" id="nik" 
                                        classNames={{
                                            mainWrapper: "h-full",
                                            input: "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0",
                                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                     />
                                    </div>


                                </div>
                                    <ModalFooter>
                                        <Button type='submit' color="primary" >
                                        Submit
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                            </>
                        )}
                        </ModalContent>
            </Modal>
        </>
        {isModalDeleteOpen && selectedPegawai && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
                                >
                                    <span className="sr-only">Close modal</span>
                                </button>
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
                                        Apakah anda yakin ingin menghapus pegawai{' '}
                                        <span className="font-bold">{selectedPegawai.name}</span>?
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
                                                onClick={() => handleDeleteConfirm(selectedPegawai.id)}
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

