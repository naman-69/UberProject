import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

const UserSignup = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [userData, setuserData] = useState({})

  const submitHandler=(e)=>{
    e.preventDefault();
    setuserData({
      fullname:{
        firstName:firstname,
        lastName:lastname
      },
      email:email,
      password:password
    });

    console.log("UserData is:",userData);

    setemail("");
    setfirstname("");
    setlastname("");
    setpassword("");
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <form onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <h3 className='text-base font-medium mb-2'>What's your Name</h3>
                <div className='flex gap-4 mb-6'>
                  <input type="text" required placeholder='firstname' className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm' value={firstname} onChange={(e)=>{
                    setfirstname(e.target.value)
                  }}/>
                  <input type="text" required placeholder='lastname' className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm' value={lastname} onChange={(e)=>{
                    setlastname(e.target.value)
                  }}/>
                </div>
                <h3 className='text-base font-medium mb-2'>What's your email</h3>
                <input type="email" required placeholder='abc@example.com' className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-sm' value={email} onChange={(e)=>{
                    setemail(e.target.value)
                  }}/>
                <h3 className='text-base font-medium mb-2'>Enter Password</h3>
                <input type="password" placeholder='password' required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm' value={password} onChange={(e)=>{
                    setpassword(e.target.value)
                  }}/>
                <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm'>Login</button>
            </form>
            <p className='text-center'>Already have a Account?<Link to="/login" className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
            <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
        </div>
    </div>
  )
}

export default UserSignup