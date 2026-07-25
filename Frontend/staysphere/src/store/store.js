import {configureStore} from "@reduxjs/toolkit"
import { authslicer } from "../features/authslicer"
export const store=configureStore({
    reducer:{
        auth:authslicer.reducer
    }
})