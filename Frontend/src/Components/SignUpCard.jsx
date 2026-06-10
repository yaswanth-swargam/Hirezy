import { useState } from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import Button from './Button'

export default function SignUpCard() {
  const navigate=useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [resMessage, setResMessage] = useState('')

  const signUpSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
        role,
      })
      setResMessage(response.data)
      navigate('/login')

    } catch (e) {
      setResMessage('Failed to register')
    }
  }

//   return (
//     <div className="w-full max-w-md rounded-xl bg-white shadow-xl p-6">
//       <form onSubmit={signUpSubmit} className="flex flex-col gap-4">
//         <h1 className="text-2xl font-bold text-center text-gray-800">
//           Create Account
//         </h1>

//         {resMessage && (
//           <p className="text-center text-sm text-red-600">
//             {resMessage}
//           </p>
//         )}

//         <input
//           type="text"
//           placeholder="Name"
//           onChange={(e) => setName(e.target.value)}
//           className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="text"
//           placeholder="Role"
//           onChange={(e) => setRole(e.target.value)}
//           className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <button
//           type="submit"
//           className="mt-2 bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
//         >
//           Sign Up
//         </button>

//         <p className="text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <span className="text-blue-600 cursor-pointer hover:underline">
//             Sign In
//           </span>
//         </p>
//       </form>
//     </div>
//   )


return(
    <div className='rounded-lg bg-white shadow-xl w-full max-w-md p-4'>
        <form onSubmit={signUpSubmit} className='flex flex-col gap-4'>
            <h1 className='text-bold text-center text-2xl'>Create Account</h1>
            {resMessage && <p className='text-red-400'>{resMessage}</p>}

            <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)} className='rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-950 px-2 py-2' />
            <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className='rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-950 px-2 py-2' />
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className='rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-950 px-2 py-2' />
            <input type="text" placeholder='Role' onChange={(e)=>setRole(e.target.value)} className='rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-950 px-2 py-2' />
            <Button type="submit">Sign Up</Button>
            <p className='text-center'>Already have an Account? <Link to='/login' className='text-blue-600'>login</Link></p>
        </form>
    </div>
)
}