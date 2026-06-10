import { useState } from 'react'
import api from '../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import Logo from '../assets/logo.png'

export default function SignUpCard() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [resMessage, setResMessage] = useState('')

  const signUpSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        role,
      })
      setResMessage(response.data.message)
      navigate('/login')
    } catch (e) {
      setResMessage('Failed to register')
    }
  }

  return (
    <div className='rounded-lg bg-white shadow-xl w-full max-w-md p-4'>
      <form onSubmit={signUpSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col items-center gap-2 mb-2'>
          <img src={Logo} alt="Hirezy" className="h-14 w-14 object-contain" />
          <h1 className='text-2xl font-semibold text-gray-800'>Create Account</h1>
        </div>
        {resMessage && <p className='text-red-400'>{resMessage}</p>}
        <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} className='rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-950 px-2 py-2' />
        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-950 px-2 py-2' />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-950 px-2 py-2' />
        <input type="text" placeholder='Role' onChange={(e) => setRole(e.target.value)} className='rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-950 px-2 py-2' />
        <Button type="submit">Sign Up</Button>
        <p className='text-center'>Already have an Account? <Link to='/login' className='text-blue-600'>login</Link></p>
      </form>
    </div>
  )
}