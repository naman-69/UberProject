import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { captainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {

  const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");

    const [vehicleColor, setvehicleColor] = useState('')
    const [vehiclePlate, setvehiclePlate] = useState('')
    const [vehicleCapacity, setvehicleCapacity] = useState('')
    const [vehicleType, setvehicleType] = useState('')

    const {captain , setCaptain} = React.useContext(captainDataContext);
  
    const submitHandler= async(e)=>{
      e.preventDefault();
      const captainData = {
        fullname:{
          firstname:firstname,
          lastname:lastname
        },
        email:email,
        password:password,
        vehicle:{
          color:vehicleColor,
          plate:vehiclePlate,
          capacity:vehicleCapacity,
          vehicleType:vehicleType
        }
      };
  
      console.log("captainData is:",captainData);

      const url = `${import.meta.env.VITE_BASE_URL}/captains/register`;
      console.log('URL:', url); // Ensure it logs the correct URL
      const response = await axios.post(url, captainData);
      console.log("response is:",response);
  
      if(response.status==201){
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token',data.token);
        navigate('/captain-home');
      }

      setemail("");
      setfirstname("");
      setlastname("");
      setpassword("");
      setvehicleCapacity("");
      setvehicleColor("");
      setvehiclePlate("");
      setvehicleType("");
    }

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
            <form onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <h3 className='text-base font-medium mb-2'>What's our captain's Name</h3>
                <div className='flex gap-4 mb-6'>
                  <input type="text" required placeholder='firstname' className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm' value={firstname} onChange={(e)=>{
                    setfirstname(e.target.value)
                  }}/>
                  <input type="text" required placeholder='lastname' className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm' value={lastname} onChange={(e)=>{
                    setlastname(e.target.value)
                  }}/>
                </div>
                <h3 className='text-base font-medium mb-2'>What's our captain's email</h3>
                <input type="email" required placeholder='abc@example.com' className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-sm' value={email} onChange={(e)=>{
                    setemail(e.target.value)
                  }}/>
                <h3 className='text-base font-medium mb-2'>Enter Password</h3>
                <input type="password" placeholder='password' required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm' value={password} onChange={(e)=>{
                    setpassword(e.target.value)
                  }}/>

                <h3 className='text-base font-medium mb-2'>vehicle Information</h3>
                <div className='flex gap-4'>
                  <input type="text" placeholder='Vehicle Color' required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm' value={vehicleColor} onChange={(e)=>{
                    setvehicleColor(e.target.value)
                  }}/>
                  <input type="text" placeholder='vechicle Plate' required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm' value={vehiclePlate} onChange={(e)=>{
                    setvehiclePlate(e.target.value)
                  }}/>
                </div>
                <div className='flex gap-4'>
                  <input type="number" placeholder='Capacity' required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm' value={vehicleCapacity} onChange={(e)=>{
                    setvehicleCapacity(e.target.value)
                  }}/>
                  <select required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm' value={vehicleType} onChange={(e)=>{
                    setvehicleType(e.target.value)
                  }}>
                    <option value="" disabled> Select Vehicle Type</option>
                    <option value="car" > Car</option>
                    <option value="moto" > Moto</option>
                    <option value="auto" > Auto</option>
                  </select>
                </div>

                <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm'>Create Captain Account</button>
            </form>
            <p className='text-center'>Already have a Account?<Link to="/captain-login" className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
            <p className='text-[10px] leading-tight'>This site is protected by the reCAPTCHA and the <span className='underline'>Google Policy</span> and <span className='underline'>Terms of services apply</span>.</p>
        </div>
    </div>
  )
}

export default CaptainSignup