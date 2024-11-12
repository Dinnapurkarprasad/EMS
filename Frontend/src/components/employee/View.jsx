import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function View() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []); // Include 'id' in the dependency array

  return (
    <>
      {employee ? (
        <div className="max-w-5xl mx-auto mt-10 p-20 bg-gradient-to-r from-gray-900 to-gray-500 rounded-lg shadow-l">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Image */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-contain border-4 border-gray-300 shadow-lg"
                src={`http://localhost:3000/uploads/${employee.userId.profileImage}`}
                alt="Profile"
              />
            </div>

            {/* Employee Information */}
            <div className="w-full md:w-2/3">
              <div className="bg-gray-600 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Employee Details</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="font-bold text-white">Name:</p>
                    <p className="font-semibold text-1xl  text-white">{employee.userId.name}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="font-bold  text-white">Date Of Joining:</p>
                    <p className="font-semibold text-1xl  text-white">
                      {new Date(employee.DOJ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="font-bold text-white">Gender:</p>
                    <p className="font-semibold text-1xl text-white">{employee.gender}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="font-bold text-white">Department:</p>
                    <p className= "font-semibold text-1xl text-white">{employee.department.dep_name}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="font-bold text-white">Salary:</p>
                    <p className=" font-semibold text-1xl text-white">{employee.salary}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">Loading...</div>
      )}
    </>
  );
}

export default View;
