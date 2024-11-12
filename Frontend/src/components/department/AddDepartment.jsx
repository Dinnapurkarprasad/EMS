import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: "",
        description: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/department/add", department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashbord/departments");
            }
        } catch (error) {
            if (error.response && !error.response.data.error.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105 mb-20 border-2 border-gray-600">
                <h3 className="text-2xl font-medium text-white mb-6 text-center">Add Department</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="dep_name" className="block text-lg font-normal text-gray-300 mb-1">
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="dep_name"
                            onChange={handleChange}
                            placeholder="Enter Department Name"
                            className="w-full p-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 shadow-sm text-md bg-gray-800 text-white"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="description" className="block text-lg font-medium text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full p-3 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 shadow-sm text-md bg-gray-800 text-white"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-teal-700 transition duration-300 shadow-md transform hover:scale-105"
                    >
                        Add Department
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddDepartment;
