import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';


const userContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token')
                if (token) {
                    const response = await axios.get('http://localhost:3000/api/auth/verify',
                        {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        }
                    );
                    if (response.data.success) {
                        setUser(response.data.user);
                    }
                }
                else {
                    setUser(null)
                    setLoading(false)
                }

            } catch (error) {
                if (error.response && error.response.data.error) {
                    // If there's an error, navigate to the login page
                   setUser(null)// Replace '/login' with the route to your login page
                }
            }
            finally{
                setLoading(false)
            }  
        };

        verifyUser();
    }, []); // Add navigate to the dependency array

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <userContext.Provider value={{ user, login, logout,setLoading }}>
            {children}
        </userContext.Provider>
    );
};

// Hook to use the auth context
export const useAuth = () => useContext(userContext);

export default AuthContext;
