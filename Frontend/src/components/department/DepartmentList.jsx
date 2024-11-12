import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component"
import columns, { DepartmentButtons } from '../../utils/DepartmentHelper';

import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [depLoading,setDepLoading]=useState(false)
  const [filteredDepartments,setFilteredDepartmets]=useState([])
  
  const onDepartmentDelete = async (ID) => {
    const data = departments.filter(dep => dep._id !== ID);
    setDepartments(data);
};

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/api/department', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (<DepartmentButtons ID={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
          }));
          setDepartments(data);
          setFilteredDepartmets(data)
        }
      } catch (error) {
        if (error.response && !error.response.data.error.success) {
          alert(error.response.data.error)
        }
      }
      finally{
        setDepLoading(false)
      }
    }
    fetchDepartments()
  }, [])

  const filterDepartments=(e)=>{
       const records=departments.filter((dep)=>
       dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
      
      )
      setFilteredDepartmets(records)
  }

  return (
    <>{depLoading ? 
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">Loading....</div> : 
      <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800">Manage Departments</h3>
        <div>
          <input
            type="text"
            onChange={filterDepartments}
            placeholder='Search by Department Name'
            className="border border-gray-300 rounded-lg p-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          />
        </div>
        <Link
          to="/admin-dashbord/add-department"
          className="inline-block px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
        >
          Add New Department
        </Link>
    
        <div className="flex justify-center">
          <div className="overflow-x-auto w-full max-w-6xl p-4">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md text-lg"
              pagination
            />
          </div>
        </div>
      </div>
    }</>    
  );
}

export default DepartmentList;
