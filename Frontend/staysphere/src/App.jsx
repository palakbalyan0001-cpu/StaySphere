import { useEffect, useState } from 'react'
import {Route,Routes} from "react-router-dom"

import { Home } from './screen/Guest/Home'
import { About } from './screen/Guest/About'
import { Rooms } from './screen/Guest/Rooms'
import {Roomdetails} from "./screen/Roomdetails"
import { Register } from './screen/Register'
import { Login } from './screen/Login'
import { Dashboard } from './screen/Admin/Dashboard'
import { AdminDashboard } from './screen/Admin/AdminDashboard'

import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './features/authslicer'
import { RoleProtectedRoute } from './components/RoleProtectedRoutes'
import { Main } from './screen/Guest/Main'
import {Booking} from './screen/Customer/Booking/Booking'
import {MyBookings} from './screen/Customer/MyBookings/MyBookings'
import { FaBed, FaCalendarAlt, FaChartBar, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { DashboardLayout } from './layout/DashboardLayout'
import { AdminRooms } from './screen/Admin/AdminRooms'

function App() {
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.auth);
  console.log("Redux User:", user);
  const [loading, setLoading] = useState(true);


  const adminLinks = [
  { to: "dashboard", label: "Dashboard", icon: <FaTachometerAlt />, end: true },
  { to: "rooms", label: "Rooms", icon: <FaBed /> },
  { to: "bookings", label: "Bookings", icon: <FaCalendarAlt /> },
  { to: "users", label: "Users", icon: <FaUsers /> },
  { to: "reports", label: "Reports", icon: <FaChartBar /> },
];

  useEffect(()=>{
      async function checkrole(){
        try{
          const res=await fetch("http://localhost:3000/",{
            credentials:"include"
          })
          const result=await res.json()
          
          if(result.success==false){
            dispatch(logout())
          }else{
            dispatch(login(result.user))
          }  
        }
        catch(error){
            dispatch(logout())
        }finally {
            setLoading(false);
        }
    }
    checkrole()
   
  },[dispatch])
  if (loading) {
    return <h2>Loading...</h2>;
}
  return (
    <>
      <Routes>
          <Route element={<Main />}>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/rooms' element={<Rooms />}></Route>
            <Route path='/room-details/:id' element={<Roomdetails />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Route>
        
        <Route element={<RoleProtectedRoute  allowedroles={["User"]}/>}>
            <Route path="/user" element={<Dashboard />}>
                <Route index element={<Home />}></Route>
                <Route path='home' element={<Home />}></Route>
                <Route path='rooms' element={<Rooms />}></Route>
                <Route path='booking/:id' element={<Booking/>}></Route>
                <Route path='room-details/:id' element={<Roomdetails />}></Route>
                <Route path='mybooking' element={<MyBookings />}></Route>
            </Route>

        </Route>
        <Route element={<RoleProtectedRoute  allowedroles={["Admin"]}/>}>
            <Route path="/admin" element={<Dashboard />}>
            <Route index element={<Home />}></Route>
              <Route path="panel" element={<DashboardLayout links={adminLinks} title="Admin Panel" />}>
                <Route index element={<AdminDashboard/>} />
                <Route path="dashboard" element={<AdminDashboard/>} />
                <Route path="rooms" element={<AdminRooms />} />
                {/* <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/reports" element={<AdminReports />} /> */}
              </Route>
              <Route path='room-details/:id' element={<Roomdetails />}></Route>
            </Route>
        </Route>
      </Routes>
      
    </>
  )
}

export default App
