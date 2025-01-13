import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Sidebar } from "flowbite-react";
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    // Define state to toggle visibility
    const [isPresensiClicked, setIsPresensiClicked] = useState(false);

    // Function to handle "Presensi" click
    const handlePresensiClick = (e) => {
        e.preventDefault(); // Prevent default link behavior
        setIsPresensiClicked(!isPresensiClicked); // Toggle visibility
    };

    const navigateToCuti = () => {
        window.location.href = '/absenCuti';
    }

    const navigateToDinas = () => {
        window.location.href = '/absenDinas';
    }

    const navigateToLupaAbsen = () => {
        window.location.href = '/absenLupaAbsen';
    }

    return (
        <div className="flex h-screen overflow-x-hidden">
        <Sidebar aria-label="Sidebar with logo branding example">
          <div className="flex justify-center my-4">
            <img src="putech.png" className="w-[80%]" alt="" />
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Pegawai
              </Sidebar.Item>
              <Sidebar.Collapse icon={HiInbox} label="Presensi">
                <Sidebar.Item href="#">Log Absensi</Sidebar.Item>
                <Sidebar.Item href="#">Dinas</Sidebar.Item>
                <Sidebar.Item href="#">Cuti</Sidebar.Item>
                <Sidebar.Item href="#">Lupa Absen</Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      
        <div className="flex flex-col w-[83%]">
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
      
          {/* Pastikan tinggi konten sesuai */}
          <main className="flex-grow bg-[#F0F0F0]">{children}</main>
        </div>
      </div>
          
    );
}