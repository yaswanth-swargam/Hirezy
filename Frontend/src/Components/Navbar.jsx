
// import React,{useState} from 'react'
// import {useDispatch} from 'react-redux'
// import {Link,useNavigate} from 'react-router-dom'
// import Button from './Button.jsx'
// import { TiThMenuOutline } from "react-icons/ti";
// import MenuComp from './MenuComp.jsx'


// import Logo from '../assets/logo.png'

// export default function Navbar(){
//     const dispatch=useDispatch()
//     const navigate=useNavigate()
//     const [menu,setMenu]=useState(false)
//     const handleLogout=()=>{
//         dispatch(logoutUser())
//         navigate('/login')
//     }

//     const handleMenu=()=>{
//         setMenu((prev)=>!prev)
//     }

    
//     return(
//     //     <div className='bg-transparent px-3 py-3 pt-6 flex justify-center items-center text-slate-700 gap-20 border-b border-white/40 shadow-none'>
//     //     <div className="flex gap-6 mt-4 justify-center">
//     //             {/* <img src={Logo} width="150px"/> */}
//     //             <h1 className='text-red-900 font-bold font-inter text-4xl'><Link to={'/'}>Work<span className='text-gray-700'>aRa</span></Link></h1>
//     //         {/* <div className='flex items-center gap-6'>
//     //             <Link to='/' className="text-slate-700 hover:text-sky-700">Home</Link>
//     //             <Link to='/saved' className="text-slate-700 hover:text-sky-700">Saved</Link>
                
//     //         </div> */}
//     //     </div>
//     //         {/* <div className='mt-4'>
//     //             <Button  onClick={handleLogout}><RiLogoutCircleRLine /></Button>
//     //         </div> */}
//     //         <div className='mt-4 justify-end' onClick={handleMenu}>
//     //             <TiThMenuOutline className={menu ? "text-black" : ""} />
//     //             {menu && <MenuComp />}
//     //         </div>
            

//     // </div>
    
//     <div className="relative px-3 py-6 border-b border-white/40 text-slate-700">

//     {/* 🔹 Center Logo */}
//     <div className="flex justify-center">
//         <h1 className="text-red-900 font-bold text-4xl">
//             <Link to="/">Hire<span className="text-gray-700">zy</span></Link>
//         </h1>
//     </div>

//     {/* 🔹 Right Section (icon + menu) */}
//     <div className="absolute right-5 top-6 flex items-center">

//         {/* 📱 Mobile Menu Icon */}
//         <div className="md:hidden">
//             <button onClick={handleMenu}>
//                 <TiThMenuOutline className="text-2xl cursor-pointer" />
//             </button>
//         </div>

//         {/* 🔥 SAME MenuComp for both */}
//         <div className={`
//             ${menu ? "block" : "hidden"} 
//             md:block
//         `}>
//             <MenuComp />
//         </div>

//     </div>

// </div>
    
// )
// }














import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button.jsx'
import { TiThMenuOutline } from "react-icons/ti"
import MenuComp from './MenuComp.jsx'
import { logoutUser } from '../store/authActons'
import Logo from '../assets/logo.png'

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/login')
    }

    const handleMenu = () => {
        setMenu((prev) => !prev)
    }

    return (
        <div className="relative px-3 py-6 border-b border-white/40 text-slate-700">

            {/* Center Logo */}
<div className="flex justify-center items-center gap-2 pt-3">
    <Link to="/" className="flex items-center gap-2">
        <img src={Logo} alt="Hirezy" className="h-10 w-auto" />
        <span className="text-red-900 font-bold text-2xl">
            Hire<span className="text-gray-700">zy</span>
        </span>
    </Link>
</div>

            {/* 🔹 Right Section (icon + menu) */}
            <div className="absolute right-5 top-6 flex items-center">

                {/* 📱 Mobile Menu Icon */}
                <div className="md:hidden">
                    <button onClick={handleMenu}>
                        <TiThMenuOutline className="text-2xl cursor-pointer" />
                    </button>
                </div>

                {/* Menu */}
                <div className={`${menu ? "block" : "hidden"} md:block`}>
                    <MenuComp />
                </div>

            </div>

        </div>
    )
}