import {createSlice} from "@reduxjs/toolkit"
const initialState={
    isAuthenticate:false,
    user:null,
}
export const authslicer=createSlice({
    initialState,
    name:'auth',
    reducers:{
        login:(state,action)=>{
            state.isAuthenticate=true,
            state.user=action.payload
        },
        logout:(state,action)=>{
            state.isAuthenticate=false,
            state.user=null
        }
    }
})
export const {login,logout}=authslicer.actions;