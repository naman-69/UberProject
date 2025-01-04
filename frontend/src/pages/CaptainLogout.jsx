import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainLogout = () => {
  
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const logoutCaptain = async () => {
            try {
                const url = `${import.meta.env.VITE_BASE_URL}/captains/logout`;
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
                    navigate('/captain-login');
                }
            } catch (error) {
                console.error("Error during logout:", error);
                // Navigate or handle error if needed
                navigate('/captain-login');
            }
        };

        logoutCaptain();
    }, [navigate, token]); // Dependency array ensures this runs only once on mount

    return <div>CaptainLogout</div>;

};

export default CaptainLogout

