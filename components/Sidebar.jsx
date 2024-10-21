// src/components/Sidebar.jsx
'use client'
import React from 'react';
import { FiHome, FiSettings } from 'react-icons/fi'; 
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const Sidebar = () => {
    return (
        <div className="flex flex-col h-screen bg-white bg-opacity-20 backdrop-blur-lg border-r border-gray-300">
            <div className="flex items-center justify-center h-16">
                <h1 className="text-2xl font-bold text-gray-900">My App</h1>
            </div>
            <nav className="flex-grow">
                <ul className="space-y-4 p-4">
                    <li>
                        <a href="/" className="flex items-center p-2 text-gray-900 hover:text-blue-500 transition">
                            <FiHome className="mr-3" />
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/budget" className="flex items-center p-2 text-gray-900 hover:text-blue-500 transition">
                            <FaMoneyBillTrendUp className="mr-3" />
                            Budget Manager
                        </a>
                    </li>
                    <li>
                        <a href="/settings" className="flex items-center p-2 text-gray-900 hover:text-blue-500 transition">
                            <FiSettings className="mr-3" />
                            Settings
                        </a>
                    </li>
                    {/* Add more nav items here */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
