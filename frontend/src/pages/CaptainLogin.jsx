import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { captainDataContext } from '../context/CaptainContext';
import axios from 'axios';  

const CaptainLogin = () => {

    const navigate = useNavigate();
    const {captain , setCaptain} = React.useContext(captainDataContext);
    
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    
    const submitHandler = async (e)=>{
        e.preventDefault();

       const captainData = {
            email:email,
            password:password
        };
        console.log("captainData",captainData);

        const url = `${import.meta.env.VITE_BASE_URL}/captains/login`;
        console.log('URL:', url); // Ensure it logs the correct URL
        const response = await axios.post(url, captainData);
        console.log("response is:",response);
    
        if(response.status==200){
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token',data.token);
            navigate('/captain-home');
        }

        setemail('')
        setpassword('')
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-20 mb-4' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
            <form onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                <input type="email" value={email} onChange={(e)=>{
                    setemail(e.target.value)
                }} required placeholder='abc@example.com' className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'/>
                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                <input type="password" value={password} onChange={(e)=>{
                    setpassword(e.target.value)}} placeholder='password' required className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'/>
                <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
            </form>
            <p className='text-center'>loin a fleet?<Link to="/captain-signup" className='text-blue-600'>Register as a captain</Link></p>
        </div>
        <div>
            <Link to='/login' className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin