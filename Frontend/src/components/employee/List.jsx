import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper.jsx';
import DataTable from 'react-data-table-component';

import axios from 'axios';



const List = () => {

  const[employees,setEmployees]=useState([])
  const [empLoading,setEmpLoading]=useState(false)

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/api/employee', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
       
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || 'N/A', // Handle missing department data
            name: emp.userId?.name || 'No Name', // Check if userId exists before accessing name
            DOJ: new Date(emp.DOJ).toDateString(),
            profileImage: emp.userId && emp.userId.profileImage ? (
              <img 
                src={`http://localhost:3000/uploads/${emp.userId.profileImage}`} 
                alt={emp.userId.name} 
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <span>No Image</span>
            ),
            action: (<EmployeeButtons ID={emp._id}/>),
          }));
          
          setEmployees(data);
        }
      } catch (error) {
        console.log(error); // Log the error to inspect its structure
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
       
        } else {
          alert("An unknown error occurred");
        }
      }
      finally{
        setEmpLoading(false)
      }
    }
    fetchEmployees()
  }, [])


  return (
     <>
  <div className="max-w-3xl mx-auto p-5 bg-gray-800 text-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-center">Manage Employees</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder='Search by Department Name'
          className="border border-gray-600 rounded-lg p-3 w-full text-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
        />
      </div>
      <Link
        to="/admin-dashbord/add-employee"
        className="inline-block w-full px-4 py-2 bg-teal-600 text-white rounded-lg text-center hover:bg-teal-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
      >
        Add New Employee
      </Link>

  
    </div>
    <div className="w-100 bg-gray-950 p-4 my-12">
  <DataTable columns={columns} data={employees} />
</div>
     </>
  
  );
}

export default List;
