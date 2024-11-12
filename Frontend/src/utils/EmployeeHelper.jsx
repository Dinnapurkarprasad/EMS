import axios from "axios";
import {useNavigate } from "react-router-dom";

export const columns=[
  {
    name:"S No",
    selector:(row)=>row.sno,
    cell: (row) => <span className="font-thin text-2xl text-black ">{row.sno}</span>, // Small font size, medium weight
    width:"140px"
  },
  {
    name:"Name",
    selector:(row)=>row.name,
    cell: (row) =><span className="table-cell font-medium text-base text-gray-900">
    {row.name}
  </span>,
    width:"250px"
  },
  {
    name:"Image",
    selector:(row)=>row.profileImage,
    cell: (row) => <span className="table-cell my-6 rounded-full object-cover">{row.profileImage}</span>,
    width:"140px"
    
  },
  {
    name:"DOJ",
    selector:(row)=>row.DOJ,
    cell: (row) =>   <span className="table-cell text-center font-medium text-sm text-gray-700">
    {row.DOJ}
  </span>,
    width:"220px"
  },
  {
    name:"Action",
    selector:(row)=>row.action,
    cell: (row) => <span className="table-cell text-center font-medium text-sm text-gray-700">
    {row.action}
  </span>,
    
  },

]


 export const fetchDepartments=async()=>{
    let departments
    try {
      const response = await axios.get('http://localhost:3000/api/department', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        departments=response.data.departments
      }
    } catch (error) {
      if (error.response && !error.response.data.error.success) {
        alert(error.response.data.error)
      }
    }
    return departments
  };

  export const getEmployees = async (id) => {
    let employees = [];  // Initialize as an empty array
    try {
      const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.data.success) {
        employees = response.data.employees; 
        console.log(employees)
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      }
    }
    return employees;  // Always return employees (could be an empty array)
  };
  
  


  


  
  export const EmployeeButtons = ({ ID }) => {
    const navigate = useNavigate();
  
    return (
      <div className="flex space-x-2">
        <button
          className="px-2 py-1 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
          onClick={() => navigate(`/admin-dashbord/employee/${ID}`)}
        >
          VIEW
        </button>
        <button
          className="px-2 py-1 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          onClick={()=>navigate(`/admin-dashbord/employee/edit/${ID}`)}
        >
          EDIT
        </button>
        <button
          className="px-2 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          SALARY
        </button>
        <button
          className="px-2 py-1 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          LEAVE
        </button>
      </div>
    );
  };
  