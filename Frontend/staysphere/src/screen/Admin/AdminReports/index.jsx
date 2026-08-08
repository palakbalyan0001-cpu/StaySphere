import { Bar, Doughnut, Pie } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js"
import { useEffect, useState } from "react"
import {Card, Col, Row} from "react-bootstrap"
import { getBookingReport, getRoomOccupy } from "../../../API/adminapi"

ChartJS.register({
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
})


export const AdminReports = () => {

    const [bookingReport,setBookingReport]=useState([])
    const [roomOccupy,setRoomOccupy]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        async function fetch(){
            try{
                const [resBook,resOccpy]=await Promise.all([
                    getBookingReport(),
                    getRoomOccupy()
                ])
                
                setBookingReport(resBook.data.data)
                setRoomOccupy(resOccpy.data.data)
            }
            catch(error){
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        fetch()
    },[])

    const statusColors = {
        pending: "#ffc107",
        confirm: "#6f42c1",
        cancelled: "#dc3545",
        "check-in": "#0d6efd",
        "check-out":"#34f160"
    };
    const roomstatusColors = {
        "Available": "#33f660",
        "Booked": "#dc3545",
        };

    const ChartBooking = {
        labels: bookingReport.map((b)=>b._id),
        datasets: [{
            label: "Bookings",
            data: bookingReport.map((s) => s.count),
            backgroundColor: bookingReport.map(
                b => statusColors[b._id] 
            )
            // backgroundColor:["rgb(192,244,34)","rgb(34, 244, 104)","rgb(192, 19, 6)","rgb(34, 118, 244)","rgb(34, 90, 244)"]
        }]
    }

    const ChartOccupy={
        labels: roomOccupy.map((b)=>b._id),
        datasets:[{
            label:"Room Occupancy",
            data: roomOccupy.map((b)=>b.count),
            backgroundColor: roomOccupy.map(
                b => roomstatusColors[b._id] 
            )
            // backgroundColor:["rgb(192, 250, 34)","rgb(248, 26, 18)"]
        }]
    }

    const chartTextOptions = {
        responsive:true,
        plugins: { legend: { labels: { color: "#f7f3e8" } } },
        scales: {
            x: { ticks: { color: "#a9b3c9" }, grid: { color: "rgba(255,255,255,0.05)" } },
            y: { ticks: { color: "#a9b3c9" }, grid: { color: "rgba(255,255,255,0.05)" } },
        },
    };

    return (
        <>
            <Row className="g-4">

                <Col md={6}>
                    <Card className="bg-dark p-4">
                        <h5 className="font-display text-warning mb-3">Room Occupancy</h5>
                        <Doughnut options={{plugins: { legend: { labels: { color: "#f7f3e8" } } }}} data={ChartOccupy}></Doughnut>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="bg-dark p-4">
                        <h5 className="font-display text-warning mb-3">Booking Status Breakdown</h5>
                        <Bar options={chartTextOptions} data={ChartBooking}></Bar>
                    </Card>
                </Col>
                
            </Row>
        </>
    )
}