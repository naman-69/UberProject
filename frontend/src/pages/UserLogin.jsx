import React,{useContext} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { userDataContext } from '../context/userContext';

const UserLogin = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [userData, setuserData] = useState({});

    const navigate = useNavigate();

    const {user,setUser} = useContext(userDataContext);

    const submitHandler = async (e)=>{
        e.preventDefault();

        const userData = {
            email:email,
            password:password
        };

        console.log("userData",userData);

        const url = `${import.meta.env.VITE_BASE_URL}/users/login`;
        console.log('URL:', url); // Ensure it logs the correct URL
        const response = await axios.post(url, userData);
        console.log("response is:",response);
        if(response.status==200){
        const data = response.data;
        setUser(data.user)
        localStorage.setItem('token', data.token );
        navigate('/home')
        }

        setemail('')
        setpassword('')
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
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
            <p className='text-center'>new here?<Link to="/signup" className='text-blue-600'>Create new Account</Link></p>
        </div>
        <div>
            <Link to='/captain-login' className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin