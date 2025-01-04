

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const url = `${import.meta.env.VITE_BASE_URL}/users/logout`;
                console.log('URL:', url);

                const response = await axios.get(url, {
                    headers: {
                        authrization: `Bearer ${token}`,
                    },
                });

                console.log("response is:", response);
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    console.log("Logging out and navigating...");
                    navigate('/login');
                }
            } catch (error) {
                console.error("Error during logout:", error);
                // Navigate or handle error if needed
                navigate('/login');
            }
        };

        logoutUser();
    }, [navigate, token]); // Dependency array ensures this runs only once on mount

    return <div>UserLogout</div>;
};

export default UserLogout;
