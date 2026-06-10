import { useState,useEffect } from 'react'
import {loginUser} from '../store/authActons'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate,Link} from 'react-router-dom'
import Button from './Button'
import Logo from '../assets/logo.png'

export default function LoginCard() {
  const dispatch=useDispatch()
  const {status,loading}=useSelector((state)=> state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resMessage, setResMessage] = useState('')

  const navigate=useNavigate()
  const signUpSubmit = async (e) => {
    e.preventDefault()
    setResMessage("")
    dispatch(loginUser({email:email,password:password}))
    }


  useEffect(()=>{
    if(status) navigate('/jobs')
  },[status,navigate])
return(
    <div className='rounded-lg bg-white shadow-xl w-full max-w-md p-4'>
        <form onSubmit={signUpSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col items-center gap-2 mb-2'>
          <img src={Logo} alt="Hirezy" className="h-14 w-14 object-contain" />
          <h1 className='text-2xl font-semibold text-gray-800'>Login</h1>
        </div>
            {resMessage && <p className="text-red-400">{resMessage}</p>}
            {loading && <p className="text-gray-500">Logging in...</p>}
            <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className='rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-950 px-2 py-2' />
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className='rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-950 px-2 py-2' />
            {/* <button type="submit" className='rounded bg-red-800 text-center text-white font-semibold hover:bg-red-950'>Sign In</button> */}
            <Button type="submit">Sign In</Button>
            <p className='text-center'>Don't have an Account?<Link to='/signup'className="text-blue-600">Register</Link></p>
        </form>
    </div>
)
}