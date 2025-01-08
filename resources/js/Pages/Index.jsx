import React from "react";

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Container */}
            <div className="bg-white w-full max-w-md mx-8 px-8 py-12 shadow-lg rounded-lg md:max-w-lg">
                {/* Logo */}
                <div className="flex flex-col items-center">

                    <img src="/putech.png" alt="Putech Logo" className="w-44" />
                </div>

                {/* Title */}
                <h1 className="mt-6 text-2xl font-bold text-center text-gray-800">
                    Log in to your account
                </h1>
                <p className="mt-1 text-center text-sm text-gray-500">
                    Enter your credentials to access your account
                </p>

                {/* Form */}
                <form className="mt-6">
                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>
                    {/* Password Input */}
                    <div className="mt-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                    >
                        Login to your account
                    </button>
                </form>

                {/* Forgot Password */}
                <div className="mt-4 text-sm text-center text-gray-500">
                    Forgot your password?{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Reset password
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
