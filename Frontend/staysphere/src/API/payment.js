import axios from "axios"
import { api } from "./axios"
export const verifyPayment=(data)=>{return api.post("/payment/verify-payment",data)}