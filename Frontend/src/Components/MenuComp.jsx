import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Button from './Button';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import {logoutUser} from '../store/authActons.js'



export default function MenuComp(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/login')
    }

    return (
        <div className="
            flex items-center gap-6 
            bg-blue-300 px-4 py-2 rounded-lg shadow-md
            md:static 
            absolute right-0 top-12
        ">
            <Link to='/' className="text-slate-700 hover:text-sky-700">Home</Link>
            <Link to='/saved' className="text-slate-700 hover:text-sky-700">Saved</Link>
            <Link to='/profile' className="text-slate-700 hover:text-sky-700">Profile</Link>
            <Button onClick={handleLogout}>
                <RiLogoutCircleRLine />
            </Button>
        </div>
    )
}