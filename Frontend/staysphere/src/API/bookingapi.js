import { api } from "./axios";

export const getMyBooking=async()=>{

    const res=await fetch("http://localhost:3000/booking/my",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        credentials: "include",
    })
    const {data}=await res.json();
    return data;
}

export const cancelBooking=(id)=>{api.delete(`/booking/cancel/${id}`)}
