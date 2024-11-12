import React, { useState } from 'react';
import axios from "axios";
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(null); // State for success message
    const {login}=useAuth()
    const navigate= useNavigate()

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError("Email and password are required.");
            setSuccess(null); // Reset success message
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
            if (response.data.success) {
                login(response.data.user)
                localStorage.setItem("token",response.data.token)
                if(response.data.user.role==="admin"){
                      navigate("/admin-dashbord")  
                }
                else{
                    navigate("/employee-dashbord")
                }
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || "Server error, please try again later.");
                setSuccess(null); // Reset success message
            } else {
                setError("An unexpected error occurred, please try again.");
                setSuccess(null); // Reset success message
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-gray-900 p-10 rounded-2xl shadow-lg w-full max-w-md transform transition-all duration-300 hover:scale-105">
                <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
                    Employee Management System
                </h2>
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold text-gray-200 text-center mb-4">
                        Login
                    </h2>
                    {error && <p className="text-red-500 text-center font-bold text-lg">{error}</p>}
                    {success && <p className="text-green-500 text-center font-bold text-lg">{success}</p>}
                    <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 p-3 w-full border border-gray-700 bg-gray-800 text-white rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 p-3 w-full border border-gray-700 bg-gray-800 text-white rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-1"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
