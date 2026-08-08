import { useEffect ,useState} from "react"
import { Card, Container,Row,Col, CardTitle } from "react-bootstrap"
import {FaBed, FaCalendarCheck, FaDoorClosed, FaDoorOpen, FaSpinner, FaUser} from "react-icons/fa"
import { getdashboardstats } from "../../../API/adminapi"
import {AdminBookings} from "../AdminBookings"
import { BookingCard } from "../../../components/BookingCard"

export const AdminDashboard=()=>{

    const [states,setdashboardstate]=useState(0)
    console.log(states)
    useEffect(()=>{
        async function fetch(){
            try{
                const res=await getdashboardstats()
                
                const icon=[<FaCalendarCheck></FaCalendarCheck>,<FaBed></FaBed>,<FaDoorOpen></FaDoorOpen>,
                <FaDoorClosed></FaDoorClosed>,<FaDoorClosed></FaDoorClosed>,<FaUser></FaUser>]
                const data = await Object.entries(res.data.stats).map(([title, value], index) => ({
                    title,
                    value,
                    icon: icon[index]
                }));
                console.log(res.data.data)
                setdashboardstate([data,res.data.data])
            }
            catch(error){
                console.log(error)
            }
        }
        fetch()
    },[])
    console.log(states)
    return(
        <>
        <Container className="py-2">
            <Row className="g-4">
                {states!=0?states[0].map((stats)=>{
                    return <Col key={stats.title} lg={6} xl={3} sm={12} md={6} className="">
                        <Card className="bg-dark p-1 border border-warning rounded ">
                            <Card.Body>
                                <div className="d-flex justify-content-evenly align-items-center g-4">
                                    <div>
                                    <CardTitle className="fs-1 text-warning">{stats.icon}</CardTitle>
                                    </div>
                                    <div className="p-2 text-center">
                                    <Card.Title className="text-light">{stats.title}</Card.Title>
                                    <Card.Text className="text-warning fw-bold fs-3">{stats.value}</Card.Text>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>})
                    :<FaSpinner></FaSpinner>
                }
        </Row>
        {states!==0?
        // console.log("recent",states[1])
        <div className="bg-dark m-3 p-2 rounded">
        {states[1].map((booking)=>{
            return <BookingCard booking={booking} />
        })}
        </div>
        :null
        }
        {/* <AdminBookings showrecentbooking={states[1]} text="Recent Bookings"/> */}
        </Container>
        </>
    )
}