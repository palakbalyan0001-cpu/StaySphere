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
export const getAllBookings=(params)=>api.get('/booking/all',{params})
export const confirmBooking=(bookid)=>api.patch(`/booking/confirm/${bookid}`)
export const checkin=(bookid)=>api.patch(`/booking/checkin/${bookid}`)
export const checkout=(bookid)=>api.patch(`/booking/checkout/${bookid}`)
export const cancelBooking=(bookid)=>api.patch(`/booking/cancel/${bookid}`)
