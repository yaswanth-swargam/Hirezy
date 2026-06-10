// import api from "../api/axios";
// import { login, logout, stopLoading } from "./authSlice";

// // LOGIN
// export const loginUser = (data) => async (dispatch) => {
//   try {
//     const res = await api.post("/auth/login", data);
//     const token=res.data.token;
//     const user=res.data.user;


//     localStorage.setItem('token',token)
//     localStorage.setItem('user',JSON.stringify(user))
//     dispatch(
//       login({
//         token: res.data.token,
//         user: res.data.user
//       })
//     );
//   } catch (e) {
//     dispatch(stopLoading());
//     console.error(e.response?.data || e.message);
//   }
// };

// // LOGOUT (frontend only)
// export const logoutUser = () => (dispatch) => {
//   dispatch(logout());
//   localStorage.removeItem('token')
//   localStorage.removeItem('user')
// };

// // NO CHECK AUTH (backend doesn’t support it)
// export const checkAuth = () => (dispatch) => {
//   dispatch(stopLoading());
// };




import api from "../api/axios";
import { login, logout, stopLoading } from "./authSlice";

// LOGIN
export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await api.post("/auth/login", data);
    // no token in response anymore — cookie is set automatically
    dispatch(login({
      user: res.data.user
    }));
  } catch (e) {
    dispatch(stopLoading());
    console.error(e.response?.data || e.message);
  }
};

// LOGOUT
export const logoutUser = () => async (dispatch) => {
  try {
    await api.post("/auth/logout");
  } catch (e) {
    console.error(e.message);
  } finally {
    dispatch(logout());
  }
};

// CHECK AUTH — called on page refresh
export const checkAuth = () => async (dispatch) => {
  try {
    const res = await api.get("/auth/verify");
    dispatch(login({ user: res.data.user }));
  } catch (e) {
    dispatch(stopLoading());
  }
};