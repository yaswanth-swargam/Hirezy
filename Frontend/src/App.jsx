// import { Routes, Route, Navigate } from "react-router-dom";
// import { Login, SignUp, Jobs } from "./pages/index.js";
// import ProtectedRoute from "./routes/ProtectedRoute.jsx";
// import MainLayout from "./layouts/MainLayout.jsx";
// import SavedJobsComp from './pages/SavedJobsComp.jsx'
// function App() {

  
//   return (
//     <Routes>
//       {/* Public routes (NO Navbar) */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<SignUp />} />

//       {/* Protected layout routes (WITH Navbar) */}
//       <Route
//         element={
//           <ProtectedRoute>
//             <MainLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* 👇 THESE are rendered inside <Outlet /> */}
//         <Route path="/" element={<Navigate to="/jobs" />} />
//         <Route path="/jobs" element={<Jobs />} />
//         <Route path="/saved" element={<SavedJobsComp/>} />
//       </Route>

//       {/* Fallback */}
//       <Route path="*" element={<h1>404 page not found</h1>} />
//     </Routes>
//   );
// }

// export default App;




import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, SignUp, Jobs } from "./pages/index.js";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import SavedJobsComp from './pages/SavedJobsComp.jsx';
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/authActons";

function App() {
  const dispatch = useDispatch();

  // on every page refresh — check if cookie is valid
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/jobs" />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/saved" element={<SavedJobsComp />} />
      </Route>
      <Route path="*" element={<h1>404 page not found</h1>} />
    </Routes>
  );
}

export default App;