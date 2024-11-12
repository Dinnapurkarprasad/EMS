import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaMoneyBill, FaTachometerAlt, FaUsers } from 'react-icons/fa';

function AdminSidebar() {
    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-6 text-center border-b border-gray-700">
                <h3 className="text-2xl font-semibold">Employee MS</h3>
            </div>

            <div className="flex flex-col p-3 space-y-5">
                <NavLink
                    to="/admin-dashbord"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    <FaTachometerAlt className="mr-3" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/admin-dashbord/employee"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    <FaUsers className="mr-3" />
                    <span>Employee</span>
                </NavLink>

                <NavLink
                    to="/admin-dashbord/departments"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    <FaBuilding className="mr-3" />
                    <span>Department</span>
                </NavLink>

                <NavLink
                    to="/admin-leave"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    <FaCalendarAlt className="mr-3" />
                    <span>Leave</span>
                </NavLink>

                <NavLink
                    to="/admin-dashbord/salary/add"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    <FaMoneyBill className="mr-3" />
                    <span>Salary</span>
                </NavLink>
            </div>
        </div>
    );
}

export default AdminSidebar;
