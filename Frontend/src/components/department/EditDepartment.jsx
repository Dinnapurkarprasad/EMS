import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
   const { id } = useParams();
   const [department, setDepartment] = useState([]);
   const [depLoading, setDepLoading] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchDepartments = async () => {
         setDepLoading(true);
         try {
            const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
               headers: {
                  "Authorization": `Bearer ${localStorage.getItem('token')}`
               }
            });
            if (response.data.success) {
               setDepartment(response.data.department);
            }
         } catch (error) {
            if (error.response && !error.response.data.success) {
               alert(error.response.data.error);
            }
         } finally {
            setDepLoading(false);
         }
      };
      fetchDepartments();
   }, [id]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setDepartment({ ...department, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.put(`http://localhost:3000/api/department/${id}`, department, {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
         });
         if (response.data.success) {
            navigate("/admin-dashbord/departments");
         }
      } catch (error) {
         if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
         }
      }
   };

   return (
      <>
         {depLoading ? (
            <div>Loading....</div>
         ) : (
            <div className="flex items-center justify-center min-h-screen bg-white">
               <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-md mb-20">
                  <h3 className="text-2xl font-bold text-white mb-6">Edit Department</h3>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
                     <div>
                        <label htmlFor="dep_name" className="block text-sm font-medium text-gray-300 mb-2">
                           Department Name
                        </label>
                        <input
                           type="text"
                           name="dep_name"
                           onChange={handleChange}
                           value={department.dep_name}
                           placeholder="Enter Department Name"
                           className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                           required
                        />
                     </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                           Description
                        </label>
                        <textarea
                           name="description"
                           onChange={handleChange}
                           value={department.description}
                           placeholder="Enter Description"
                           className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                           rows="4"
                           required
                        ></textarea>
                     </div>
                     <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                     >
                        Edit Department
                     </button>
                  </form>
               </div>
            </div>
         )}
      </>
   );
};

export default EditDepartment;
