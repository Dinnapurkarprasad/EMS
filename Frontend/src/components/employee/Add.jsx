import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Add = () => {

  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({})

  const navigate = useNavigate();

  useEffect(() => {

    const getdepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }
    getdepartments()

  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image") {
      setFormData(prevData => ({ ...prevData, [name]: files[0] }))
    }
    else {
      setFormData(prevData => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    })

    try {
      const response = await axios.post("http://localhost:3000/api/employee/add", formDataObj, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        navigate("/admin-dashbord/employee");
      }
    } catch (error) {
      if (error.response && !error.response.data.error.success) {
        alert(error.response.data.error);
      }
    }

  }


  return (
    <div className="max-w-3xl mx-auto p-5 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            name='name'
            onChange={handleChange}
            placeholder='Enter Name'
            required
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            name='email'
            onChange={handleChange}
            placeholder='Enter Email'
            required
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1" htmlFor="date">Date of Joining</label>
          <input
            type="date"
            name='date'
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1" htmlFor="gender">Gender</label>
          <select
            name="gender"
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1" htmlFor="designation">Designation</label>
          <input
            type="text"
            name='designation'
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
            placeholder='Salary'
            required
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            name='password'
            onChange={handleChange}
            placeholder='Password'
            required
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1" htmlFor="role">Role</label>
          <select
            name="role"
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <div>
          <label className="block mb-1" htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept='image/*'
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type='submit'
            className="w-full mt-4 p-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
