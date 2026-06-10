// import {createSlice} from '@reduxjs/toolkit'

// const initialState={
//     status:false,
//     userData:null,
//     token:null,
//     loading:true
// }

// const authSlice=createSlice({
//     name: 'auth',
//     initialState,

//     reducers:{
//         login: (state,action)=>{
//             state.status=true,
//             state.userData=action.payload.user,
//             state.token=action.payload.token;
//             state.loading=false
//         },

//         logout:(state)=>{
//             state.status=false,
//             state.userData=null,
//             state.token=null,
//             state.loading=false
//         },
//         stopLoading:(state)=>{
//             state.loading=false
//         }
//     }
// })

// export const {login,logout,stopLoading}=authSlice.actions

// export default authSlice.reducer



import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
    userData: null,
    loading: true  // token removed — no longer needed
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.user;
            state.loading = false;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.loading = false;
        },
        stopLoading: (state) => {
            state.loading = false;
        }
    }
})

export const { login, logout, stopLoading } = authSlice.actions
export default authSlice.reducer