// Sidebar Component
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaMoneyBill, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

function Sidebar() {

    const {user}=useAuth()
    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col shadow-lg">
            <div className="p-6 text-center border-b border-gray-700">
                <h3 className="text-2xl font-semibold">Employee MS</h3>
            </div>

            <div className="flex flex-col p-3 space-y-5 mt-5">
                <NavLink
                    to="/employee-dashbord"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    <FaTachometerAlt className="mr-3 text-xl" />
                    <span className="text-lg">Dashboard</span>
                </NavLink>

                <NavLink
                    to={`/employee-dashbord/profile/${user._id}`}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    <FaUsers className="mr-3 text-xl" />
                    <span className="text-lg">My Profile</span>
                </NavLink>

                <NavLink
                    to="/employee-dashbord/leaves"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    <FaBuilding className="mr-3 text-xl" />
                    <span className="text-lg">Leaves</span>
                </NavLink>

                <NavLink
                    to="/employee-dashbord/salary"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    <FaMoneyBill className="mr-3 text-xl" />
                    <span className="text-lg">Salary</span>
                </NavLink>

                <NavLink
                    to="/employee-dashbord/setting"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    <FaCalendarAlt className="mr-3 text-xl" />
                    <span className="text-lg">Setting</span>
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
