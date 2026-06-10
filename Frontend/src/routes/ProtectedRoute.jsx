// import {useSelector} from 'react-redux'
// import {Navigate} from 'react-router-dom'

// export default function ProtectedRoute({children}){
//     const status=useSelector((state)=>state.auth.status)
    
//     if(!status){
//         return <Navigate to="/login" replace />
//     }

//     return children;
// }



import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const { status, loading } = useSelector((state) => state.auth)

    // wait for checkAuth to finish before deciding
    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <p className="text-gray-500">Loading...</p>
        </div>
    }

    if (!status) {
        return <Navigate to="/login" replace />
    }

    return children;
}