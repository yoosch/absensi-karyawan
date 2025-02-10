//import React
import React from "react";

//import Link
import { Link } from "@inertiajs/inertia-react";

function Layout({ children }) {
    return (
        <>
            <header>
                <nav>
                    <div className="flex justify-center mx-2 mt-2 mb-3 shadow">
                        <Link href="/">
                            <img
                                src="/putech.png"
                                alt="Logo"
                                className="h-10 md:h-12 my-4 md:my-2"
                            />
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="container mt-5">{children}</main>
        </>
    );
}

export default Layout;
