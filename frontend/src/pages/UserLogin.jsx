import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

const UserLogin = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [userData, setuserData] = useState({});

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log("hello");
        setuserData({
            email:email,
            password:password
        })
        console.log("userData",userData);
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