import { rooms } from "../data/Guest/Rooms";
import axios from "axios"
import { api } from "./axios"
export async function getrooms(id){
    try{
        if(id){
            const data=rooms.filter(data=>{
                if(data.id==id){
                    return data;
                }
            })
            // const get=await fetch(`https://dummyjson.com/products/${id}`)
            // const data=await get.json();
            return({
                success:true,
                result:data
            })
        }
        return({
            data:rooms,
            success:true
        })
    }
    catch(error){
        return({
            data:rooms,
            success:false
        })
    }
}
export const getroom=()=>{return api.get("rooms")}
export const Createrooms=(data)=>{return api.post("rooms/create",data)}
export const UpdateRoom=(data,id)=>{return api.patch(`rooms/edit/${id}`,data)}
export const deleteroom=(id)=>{return api.delete(`rooms/${id}`)}