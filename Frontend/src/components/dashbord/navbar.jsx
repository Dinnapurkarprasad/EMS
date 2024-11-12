import React from 'react';
import { useAuth } from '../../context/authContext';

function Navbar() {
  const { user,logout} = useAuth(); // Correctly destructure user and logout from useAuth

  return (
    <div className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
      <p className="text-lg">Welcome, {user?.name || 'Guest'}</p> 
      <button 
        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
         onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
