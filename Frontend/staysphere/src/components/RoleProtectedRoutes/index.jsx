import { useSelector } from "react-redux"
import { Navigate, Outlet } from 'react-router-dom';
export const RoleProtectedRoute=({allowedroles})=>{
    const {isAuthenticate,user}=useSelector((state)=>state.auth);
        console.log("Protected:", { isAuthenticate, user });
        console.log("protectedPage rendered");
    if(!isAuthenticate){
        return <Navigate to="/" replace />
    }
    if(allowedroles && !allowedroles.includes(user.role)){
        return <Navigate to="/" replace/>
    }
    return <Outlet />
}