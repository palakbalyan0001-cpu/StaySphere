import axios from "axios"
import { api } from "./axios"
export const logoutapi=()=>{api.post("/home/logout")}