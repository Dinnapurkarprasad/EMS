const columns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
    cell: (row) => (
      <span className="text-xl font-medium text-gray-800">{row.sno}</span>
    ),
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    cell: (row) => (
      <span className="text-xl font-medium text-gray-800">{row.dep_name}</span>
    ),
    sortable:true
  },
  {
    name: "Action",
    cell: (row) => <DepartmentButtons ID={row._id} />, 
  },
];


export default columns;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const DepartmentButtons = ({ID,onDepartmentDelete}) => {
  const navigate = useNavigate();

 const handleDelete=async(ID)=>{
  
  try {
    const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      onDepartmentDelete(ID)
    }
  } catch (error) {
    if (error.response && !error.response.data.error.success) {
      alert(error.response.data.error)
    }
    else{
      alert("An unexpected error occurred.");
    }
  }
 }


  return (
    <div className="flex space-x-2">
      <button
        className="px-4 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300 text-lg"
        onClick={() => navigate(`/admin-dashbord/department/${ID}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 text-lg"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
