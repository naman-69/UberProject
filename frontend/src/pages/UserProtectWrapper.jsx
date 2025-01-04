// import React,{useContext, useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react';
// import axios from 'axios';
// import UserContext, { userDataContext } from '../context/userContext';

// const UserProtectWrapper = ({
//     children
// }) => {

//     const navigate = useNavigate();
    
//     const token = localStorage.getItem('token');

//     const {user,setUser} = UserContext(userDataContext);
//     const [isLoading,setIsLoading] = useState(true);

//     useEffect(()=>{
//       if(!token){
//         navigate('/login');
//       }
//     },[token])
    
//     const url = `${import.meta.env.VITE_BASE_URL}/users/profile`;
//     console.log('URL:', url); // Ensure it logs the correct URL
//     axios.get(url, {
//         headers: {
//             authrization: `Bearer ${token}`,
//         },
//     }).then(response => {
//         if(response.status==200){
//             setUsert(response.data.user)
//             setIsLoading(false)
//         }
//     }).catch(err=>{
//         console.log("err",err);
//         localStorage.removeItem('token');
//         navigate('/login');
//     });
    
//     if(response.status==200){
//         const data = response.data;
//         setUser(data.user);
//         localStorage.setItem('token',data.token);
//         navigate('/home');
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

// export default UserProtectWrapper









import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/userContext';

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user, setUser } = useContext(userDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if no token is found
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user profile
    const fetchUserData = async () => {
      try {
        const url = `${import.meta.env.VITE_BASE_URL}/users/profile`;
        console.log('URL:', url); // Ensure it logs the correct URL
        const response = await axios.get(url, {
          headers: {
            authrization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data.user);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        localStorage.removeItem('token'); // Clear token if invalid
        navigate('/login'); // Redirect to login
      }
    };

    fetchUserData();
  }, [navigate, token, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
