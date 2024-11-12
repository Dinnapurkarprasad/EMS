import React from 'react';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUser } from 'react-icons/fa';

const AdminSummery = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard icon={<FaUser className="text-blue-500 text-4xl" />} text="Total Employees" number={13} />
        <SummaryCard icon={<FaBuilding className="text-yellow-500 text-4xl" />} text="Total Departments" number={5} />
        <SummaryCard icon={<FaMoneyBillWave className="text-red-500 text-4xl" />} text="Monthly Pay" number={"2000 INR"} />
      </div>


      <div className="mt-10 p-4 bg-gray-100 border border-gray-300 rounded-lg"> {/* Increased margin-top */}
        <h4 className="text-2xl font-bold mb-4">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard icon={<FaFileAlt className="text-red-500 text-4xl" />} text="Leave Applied" number={10} />
          <SummaryCard icon={<FaCheckCircle className="text-green-500 text-4xl" />} text="Leave Approved" number={2} />
          <SummaryCard icon={<FaHourglassHalf className="text-yellow-500 text-4xl" />} text="Leave Pending" number={7} />
          <SummaryCard icon={<FaTimesCircle className="text-black-500 text-4xl" />} text="Leave Rejected" number={1} />
        </div>
      </div>
    </div>
  );
};

export default AdminSummery;
