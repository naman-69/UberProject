// import React,{useContext, useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react';
// import axios from 'axios';
// import { captainDataContext } from '../context/CaptainContext';

// const CaptainProtectWrapper = ({
//     children
// }) => {

//     const navigate = useNavigate();
    
//     const token = localStorage.getItem('token');

//     const {captain,setCaptain} = useContext(captainDataContext);
//     const [isLoading,setIsLoading] = useState(true);

//     console.log("token in wrapper:",token);

//     useEffect(()=>{
//       if(!token){
//         navigate('/captain-login');
//       }
//     },[token])

//     const url = `${import.meta.env.VITE_BASE_URL}/captains/profile`;
//     console.log('URL:', url); // Ensure it logs the correct URL
//     axios.get(url, {
//         headers: {
//             authrization: `Bearer ${token}`,
//         },
//     }).then(response => {
//         if(response.status==200){
//             setCaptain(response.data.captain)
//             setIsLoading(false)
//         }
//     }).catch(err=>{
//         console.log("err",err);
//         localStorage.removeItem('token');
//         navigate('/captain-login');
//     });
    
//     if(response.status==200){
//         const data = response.data;
//         setCaptain(data.captain);
//         localStorage.setItem('token',data.token);
//         navigate('/captain-home');
//     }
    
//     if(isLoading){
//         return(
//             <div>Loading ...</div>
//         )
//     }

//   return (
//     <>
//         {children}
//     </>
//   )
// }

// export default CaptainProtectWrapper






import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { captainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { captain, setCaptain } = useContext(captainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if no token is found
    if (!token) {
      navigate('/captain-login');
      return;
    }

    // Fetch captain profile
    const fetchCaptainData = async () => {
      try {
        const url = `${import.meta.env.VITE_BASE_URL}/captains/profile`;
        console.log('URL:', url); // Ensure correct URL
        const response = await axios.get(url, {
            headers: {
                authrization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
          setCaptain(response.data.captain);
          setIsLoading(false); // Data loaded successfully
        }
      } catch (err) {
        console.error('Error fetching captain data:', err);
        localStorage.removeItem('token'); // Clear token if invalid
        navigate('/captain-login'); // Redirect to login
      }
    };

    fetchCaptainData();
  }, [navigate, token, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
