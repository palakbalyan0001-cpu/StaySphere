import { Outlet } from "react-router-dom"
import { Navbarr } from "../../../components/Nav"
import Footer from "../../../components/Footer/Footer"

export const Main=()=>{
    return(
        <>
        <Navbarr />
        <Outlet />
        <Footer />
        </>
    )
}