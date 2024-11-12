import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashbord/AdminSidebar';
import Navbar from '../components/dashbord/navbar';
import { Outlet } from 'react-router-dom';

function AdminDashbord() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      
      <Navbar />

      
      <div className="flex flex-1">
        
        <div>
          <AdminSidebar />
        </div>

        <div className="flex-1 bg-gray-1000 p-8">
           <Outlet/>
        </div>

      </div>
    </div>
  );
}

export default AdminDashbord;
