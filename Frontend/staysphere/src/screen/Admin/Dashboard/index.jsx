import { Outlet } from "react-router-dom";
import { Navbarr } from "../../../components/Nav";
import Footer from "../../../components/Footer/Footer";

export function Dashboard(){
    return(
        <>
        <div className="d-flex flex-column min-vh-100">
            <Navbarr />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <Footer />
        </div>
        </>
    )
}