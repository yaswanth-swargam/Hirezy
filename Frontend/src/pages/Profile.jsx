import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { login } from '../store/authSlice'
import Button from '../Components/Button'
import Logo from '../assets/logo.png'

export default function Profile() {
    const { userData } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [role, setRole] = useState(userData?.role || '')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            const res = await api.put('/users/update-role', { role })
            // update redux state with new role
            dispatch(login({
                user: { ...userData, role }
            }))
            setMessage('Role updated successfully')
        } catch (e) {
            setMessage('Failed to update role')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200'>
            <div className='rounded-lg bg-white shadow-xl w-full max-w-md p-6'>

                {/* Logo + Title */}
                <div className='flex flex-col items-center gap-2 mb-4'>
                    <img src={Logo} alt="Hirezy" className="h-14 w-14 object-contain" />
                    <h1 className='text-2xl font-semibold text-gray-800'>My Profile</h1>
                </div>

                {/* User Info */}
                <div className='flex flex-col gap-2 mb-4 text-gray-600 text-sm'>
                    <p><span className='font-medium text-gray-800'>Name:</span> {userData?.name}</p>
                    <p><span className='font-medium text-gray-800'>Email:</span> {userData?.email}</p>
                    <p><span className='font-medium text-gray-800'>Current Role:</span> {userData?.role}</p>
                </div>

                {/* Update Role */}
                <form onSubmit={handleUpdate} className='flex flex-col gap-3'>
                    <label className='text-sm font-medium text-gray-700'>Update Your Domain</label>
                    <input
                        type="text"
                        value={role}
                        placeholder='e.g. developer, designer, analyst'
                        onChange={(e) => setRole(e.target.value)}
                        className='rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-950 px-3 py-2 border border-gray-200'
                    />
                    {message && (
                        <p className={`text-sm text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-400'}`}>
                            {message}
                        </p>
                    )}
                    <Button type="submit">
                        {loading ? 'Updating...' : 'Update Role'}
                    </Button>
                </form>

                <button
                    onClick={() => navigate('/jobs')}
                    className='mt-3 text-sm text-center w-full text-blue-600 hover:underline'
                >
                    ← Back to Jobs
                </button>

            </div>
        </div>
    )
}