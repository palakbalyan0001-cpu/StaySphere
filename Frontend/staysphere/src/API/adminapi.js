import { api } from "./axios";

export const getdashboardstats=()=>{return api.get('/admin/dashboard')}
export const getBookingReport=()=>{return api.get('/admin/bookingReport')}
export const getRoomOccupy=()=>{return api.get('/admin/roomOccupy')}