import React from 'react';
import Sidebar from '../components/EmployeeDashbord/Sidebar';
import {Outlet}from 'react-router-dom'
import Navbar from '../components/dashbord/navbar';
import Summary from '../components/EmployeeDashbord/Summary';

const EmployeeDashbord = () => {
    return (
        <div>
            <div className="min-h-screen flex flex-col">

                <Navbar />


                <div className="flex flex-1">

                    <div>
                        <Sidebar />
                    </div>

                    <div className="flex-1 bg-gray-1000 p-8">
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EmployeeDashbord; 
