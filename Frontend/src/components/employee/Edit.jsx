import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    salary: 0,
    department: ""
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee({
            name: employee.userId.name,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department
          });
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setErrorMessage(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee(); // Fetch employee data on component mount
  }, [id]); // Dependency on id

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };

    getDepartments(); // Fetch departments on component mount
  }, []); // Empty dependency array to run once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await axios.put(`http://localhost:3000/api/employee/${id}`, employee, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        navigate("/admin-dashbord/employee");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto p-5 bg-gray-800 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Edit Employee</h2>
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                name='name'
                value={employee.name}
                onChange={handleChange}
                placeholder='Enter Name'
                required
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1" htmlFor="designation">Designation</label>
              <input
                type="text"
                name='designation'
                value={employee.designation}
                onChange={handleChange}
                placeholder='Designation'
                required
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1" htmlFor="department">Department</label>
              <select
                name="department"
                onChange={handleChange}
                value={employee.department} // Ensure selected department is correct
                required
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map(dep => (
                  <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1" htmlFor="salary">Salary</label>
              <input
                type="number"
                name='salary'
                onChange={handleChange}
                value={employee.salary}
                placeholder='Salary'
                required
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type='submit'
                className="w-full mt-4 p-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
              >
                Update Employee
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Edit;
