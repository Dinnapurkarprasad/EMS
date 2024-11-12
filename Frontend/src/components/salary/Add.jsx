import React, { useEffect, useState } from 'react';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Add = () => {
    const { id } = useParams(); // Get employee ID from URL
    const [salary, setSalary] = useState({
        employeeId: '', // Change null to an empty string
        allowance: 0,
        deduction: 0,
        date: '',
        basicSalary: ''
    });

    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Fetch employee details if an `id` is present
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
                    setSalary((prev) => ({
                        ...prev,
                        name: employee.userId.name,
                        designation: employee.designation,
                        basicSalary: employee.salary,
                        department: employee.department,
                    }));
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.error || 'Error fetching employee data.');
            } finally {
                setLoading(false); // Ensure loading is set to false
            }
        };

        if (id) {
            fetchEmployee(); // Fetch only if there's an `id`
        } else {
            setLoading(false); // Stop loading if no `id` is present
        }
    }, [id]);

    // Fetch departments when the component loads
    useEffect(() => {
        const getDepartments = async () => {
            try {
                const departments = await fetchDepartments();
                setDepartments(departments);
            } catch (error) {
                setErrorMessage('Error fetching departments.');
            }
        };

        getDepartments();
    }, []);

    // Handle department selection
    const handleDepartmentChange = async (e) => {
        const departmentId = e.target.value;
        setSalary((prev) => ({ ...prev, department: departmentId })); // Store selected department
      
        try {
          // Fetch employees based on departmentId
          const emps = await getEmployees(departmentId); 
          setEmployees(emps); // Set employees in state
        } catch (error) {
          setErrorMessage('Error fetching employees for the selected department.');
        }
      };
      


    // Handle employee selection
    const handleEmployeeChange = (e) => {
        const employeeId = e.target.value;
        setSalary((prev) => ({ ...prev, employeeId }));
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors

        try {
            const response = await axios.post(`http://localhost:3000/api/salary/add`, salary, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                navigate('/admin-dashboard/employee');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Error submitting salary.');
        }
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="max-w-3xl mx-auto p-5 bg-gray-800 text-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Add Salary</h2>
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block mb-1" htmlFor="department">Department</label>
                            <select
                                name="department"
                                value={salary.department || ""}  // Set value to an empty string if it's null or undefined
                                onChange={handleDepartmentChange}
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
                            <label className="block mb-1" htmlFor="employeeId">Employee</label>
                            <select
                                name="employeeId"
                                value={salary.employeeId || ""}  // Ensure it's controlled by the state
                                onChange={handleEmployeeChange}  // Call the handleEmployeeChange function on change
                                required
                                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp._id}>
                                        {emp.employeeId}  {/* Use emp.userId.name to display the employee's name */}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Basic Salary */}
                        <div>
                            <label className="block mb-1" htmlFor="basicSalary">Basic Salary</label>
                            <input
                                type="text"
                                name="basicSalary"
                                onChange={handleChange}
                                placeholder="Basic Salary"
                                value={salary.basicSalary}
                                required
                                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Allowances */}
                        <div>
                            <label className="block mb-1" htmlFor="allowance">Allowances</label>
                            <input
                                type="number"
                                name="allowance"
                                onChange={handleChange}
                                placeholder="Allowances"
                                value={salary.allowance}
                                required
                                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Deductions */}
                        <div>
                            <label className="block mb-1" htmlFor="deduction">Deduction</label>
                            <input
                                type="number"
                                name="deduction"
                                onChange={handleChange}
                                placeholder="Deduction"
                                value={salary.deduction}
                                required
                                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Pay Date */}
                        <div>
                            <label className="block mb-1" htmlFor="date">Pay Date</label>
                            <input
                                type="date"
                                name="date"
                                onChange={handleChange}
                                value={salary.date}
                                required
                                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full mt-4 p-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
                            >
                                Add Salary
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Add;


