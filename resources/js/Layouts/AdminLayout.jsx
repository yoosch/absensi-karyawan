import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
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
        <div className="min-h-screen bg-white overflow-x-hidden">
            <div className='flex'>
                <aside className='min-h-screen hidden sm:flex sm:flex-col bg-[#D9D9D9] w-[17%] items-center'>
                    <div className='mx-[10%] mt-[5%]'>
                        <img src="putech.png" className='w-48 mx-auto' alt="" />
                        <ul className='mt-[30%] mx-auto'>
                            <li className="mb-4">
                                <a href="/dashboardAdmin" className="text-lg font-semibold">
                                Dashboard
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="/pegawai" className="text-lg font-semibold">
                                Pegawai
                                </a>
                            </li>
                            <li className="mb-4">
                                <a
                                href="#"
                                className="text-lg font-semibold"
                                onClick={handlePresensiClick} // Attach click handler
                                >
                                Presensi
                                </a>
                            </li>

                            {/* Conditional rendering of submenu items */}
                            {isPresensiClicked && (
                                <>
                                <li className="ml-4 mb-2">
                                    <a href="#" className="text-md">
                                    Log absensi
                                    </a>
                                </li>
                                <li className="ml-4 mb-2" >
                                    <button onClick={navigateToDinas}>
                                        <a className="text-md">
                                        Dinas
                                        </a>
                                    </button>
                                </li>
                                <li className="ml-4 mb-2" >
                                    <button onClick={navigateToCuti}>
                                        <a className="text-md">
                                        Cuti
                                        </a>
                                    </button>
                                </li>
                                <li className="ml-4 mb-2" >
                                    <button onClick={navigateToLupaAbsen}>
                                        <a className="text-md">
                                        Lupa Absen
                                        </a>
                                    </button>
                                </li>
                                </>
                            )}
                            </ul>
                    </div>
                </aside>
                <div className='flex flex-col w-[83%]'>
                    <nav className='py-2 pr-4 bg-[#04042A] border-[#FECE00] border-b-4'>
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
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
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
                    <main className='bg-[#F0F0F0] h-screen'>{children}</main>
                </div>
            </div>

        </div>
    );
}