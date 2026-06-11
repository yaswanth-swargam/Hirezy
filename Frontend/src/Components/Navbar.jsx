import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { TiThMenuOutline } from "react-icons/ti"
import { AiOutlineClose } from "react-icons/ai"
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
        <div className="relative px-6 py-4 border-b border-white/40">

            <div className="flex items-center justify-between">

                {/* Left — Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={Logo} alt="Hirezy" className="h-10 w-10 object-contain" />
                    <span className="text-red-900 font-bold text-2xl">
                        Hire<span className="text-gray-700">zy</span>
                    </span>
                </Link>

                {/* Right — Desktop Menu (always visible on md+) */}
                <div className="hidden md:flex">
                    <MenuComp />
                </div>

                {/* Right — Mobile Hamburger */}
                <div className="flex md:hidden">
                    <button onClick={handleMenu}>
                        {menu
                            ? <AiOutlineClose className="text-2xl text-gray-700" />
                            : <TiThMenuOutline className="text-2xl text-gray-700" />
                        }
                    </button>
                </div>

            </div>

            {/* Mobile Dropdown Menu */}
            {menu && (
                <div className="md:hidden mt-3 pb-3 border-t border-gray-100">
                    <MenuComp />
                </div>
            )}

        </div>
    )
}