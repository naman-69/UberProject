import React from 'react'
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
        <div 
            className="bg-red-400 h-screen pt-8 flex justify-between flex-col w-full bg-cover bg-bottom" 
            style={{ backgroundImage: "url('https://p7.hiclipart.com/preview/768/813/150/traffic-light-road-transport-cartoon-clip-art-creative-traffic-lights.jpg')" }}
        >
            <img className='w-16 ml-9' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white py-4 px-4 pb-7' >
                <h2 className='text-[30px] font-bold'>Get Started with Uber</h2>
                <Link to="/login" className=' flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home