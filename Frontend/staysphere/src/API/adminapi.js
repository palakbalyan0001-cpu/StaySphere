import { api } from "./axios";

export const getdashboardstats=()=>{return api.get('/admin/dashboard')}