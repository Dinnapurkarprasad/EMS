import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-gray-500 to-gray-800 p-8 rounded-lg shadow-2xl flex items-center space-x-5 w-full max-w-lg mx-auto ml-80 mt-20">
      <div className="bg-white p-4 rounded-full shadow-lg">
        <FaUser className="text-3xl text-blue-600" />
      </div>
      <div className="text-white">
        <p className="text-2xl font-semibold">Hello, {user.name}!</p>
        <p className="text-lg mt-2 opacity-75">Welcome back to your dashboard.</p>
      </div>
    </div>
  );
}

export default Summary;
