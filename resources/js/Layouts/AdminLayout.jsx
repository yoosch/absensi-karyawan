import React, { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { HiArrowSmRight, HiChartPie, HiInbox,HiPencilAlt, HiDocumentText, HiShoppingBag, HiTable, HiUser, HiLocationMarker, HiViewBoards } from "react-icons/hi";
import { Sidebar } from "flowbite-react";
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

    const { url } = usePage(); // Get the current URL from Inertia
    const isActive = (path) => url.startsWith(path);

    // Update the `isDesktop` state when the window is resized
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Render a message for mobile users
    if (!isDesktop) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">This application is only accessible on desktop screens.</h1>
                    <p className="mt-2 text-gray-600">Please switch to a larger screen to use this application.</p>
                </div>
            </div>
        );
    }

    // Render the main admin layout for desktop users
    return (
        <div className="flex h-screen overflow-x-hidden">
            <Sidebar aria-label="Sidebar with logo branding example">
                <div className="flex justify-center my-4">
                    <img src="putech.png" className="w-[80%]" alt="" />
                </div>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/dashboard" as={Link} icon={HiChartPie} className={isActive('/dashboard') ? 'bg-[#fdb714] border border-[#fdb714] rounded-lg font-bold text-white hover:translate-x-2 transition-all hover:bg-[#fdb714]' : ''}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} href='/pegawai' icon={HiUser} className={isActive('/pegawai') ? 'bg-[#fdb714] border border-[#fdb714] rounded-lg font-bold text-white hover:translate-x-2 transition-all hover:bg-[#fdb714]' : ''}>
                            Pegawai
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} href='/log-presensi' icon={HiPencilAlt} className={isActive('/log-presensi') ? 'bg-[#fdb714] border border-[#fdb714] rounded-lg font-bold text-white hover:translate-x-2 transition-all hover:bg-[#fdb714]' : ''}>
                            Presensi 
                        </Sidebar.Item>
                        <Sidebar.Collapse icon={HiInbox} label="Perizinan" className={isActive('/absen-dinas') || isActive('/absen-cuti') || isActive('/absen-lupa-absen') ? 'bg-[#fdb714] border border-[#fdb714] rounded-lg font-bold text-white hover:translate-x-2 transition-all hover:bg-[#fdb714]' : ''}>
                            <Sidebar.Item as={Link} href="/absen-dinas" className={isActive('/absen-dinas') ? 'bg-[#fdb714] border border-[#fdb714] rounded-lg font-bold text-white hover:translate-x-2 transition-all hover:bg-[#fdb714]' : ''}
                            >Dinas</Sidebar.Item>
                            <Sidebar.Item as={Link} href="/absen-cuti" className={isActive('/absen-cuti') ? 'bg-[#fdb714] border border-[#fdb714] rounded-lg font-bold text-white hover:translate-x-2 transition-all hover:bg-[#fdb714]' : ''}
                            >Cuti</Sidebar.Item>
                            <Sidebar.Item as={Link} href="/absen-lupa-absen" className={isActive('/absen-lupa-absen') ? 'bg-[#fdb714] border border-[#fdb714] rounded-lg font-bold text-white hover:translate-x-2 transition-all hover:bg-[#fdb714]' : ''}
                            >Lupa Absen</Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Collapse icon={ HiDocumentText} label="Laporan" className={isActive('/rekap-individu') ? 'bg-[#fdb714] border border-[#fdb714] rounded-lg font-bold text-white hover:translate-x-2 transition-all hover:bg-[#fdb714]' : ''}
                        >
                            <Sidebar.Item as={Link} href="/rekap-individu" className={isActive('/rekap-individu') ? 'bg-[#fdb714] border border-[#fdb714] rounded-lg font-bold text-white hover:translate-x-2 transition-all hover:bg-[#fdb714]' : ''}
                            >Rekap Individu</Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Item as={Link} href='/location' icon={HiLocationMarker} className={isActive('/location') ? 'bg-[#fdb714] border border-[#fdb714] rounded-lg font-bold text-white hover:translate-x-2 transition-all hover:bg-[#fdb714]' : ''}
                        >
                            Lokasi 
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} href='/shift' icon={HiLocationMarker} className={isActive('/shift') ? 'bg-[#fdb714] border border-[#fdb714] rounded-lg font-bold text-white hover:translate-x-2 transition-all hover:bg-[#fdb714]' : ''}
                        >
                            Shift 
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            <div className="flex flex-col w-screen">
                <nav className="py-2 pr-4 bg-[#04042A] border-[#FECE00] border-b-4">
                    <div className="hidden sm:flex sm:items-center sm:justify-end">
                        <div className="flex items-center space-x-4">
                            <div className="text-white">
                                <div>{user.name}</div>
                                <div>{user.nip}</div>
                            </div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-full border border-transparent bg-white p-1 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            <img
                                                src="https://ui-avatars.com/api/?name=John+Doe&color=7F9CF5&background=EBF4FF"
                                                alt=""
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="flex-grow bg-[#F0F0F0]">{children}</main>
            </div>
        </div>
    );
}
