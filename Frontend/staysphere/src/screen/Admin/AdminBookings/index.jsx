import { useState } from "react";
import { cancelBooking, checkin, checkout, confirmBooking, getAllBookings } from "../../../API/bookingapi";
import { useEffect } from "react";
import { Card, Button, Badge, Row, Col, FormControl, FormSelect, CardText } from "react-bootstrap";
import { FaCalendarDay } from "react-icons/fa";
import { BookingCard } from "../../../components/BookingCard";

export const AdminBookings = (props) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");
    const handleCancel = async (bookid) => {
        try {
            const res = await cancelBooking(bookid, roomid);
            setBookings((prev) => {
                return prev.map(bookings => {
                    if (bookings._id == bookid) {
                        return { ...bookings, status: "cancelled" }
                    }
                    return bookings
                })
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleConfirm = async (bookid, roomid) => {
        try {
            const res = await confirmBooking(bookid);
            setBookings((prev) => {
                return prev.map(bookings => {
                    if (bookings._id == bookid) {
                        return { ...bookings, status: "confirm" }
                    }
                    return bookings
                })
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleCheckin=async(bookid)=>{
        try{
            const res = await checkin(bookid);
                setBookings((prev) => {
                    return prev.map(bookings => {
                        if (bookings._id == bookid) {
                            return { ...bookings, status: "check-in" }
                        }
                        return bookings
                    })
                })
        }
        catch(error){
            console.log(error)
        }
    }

    const handleCheckout=async(bookid)=>{
        try{
            const res = await checkout(bookid);
                setBookings((prev) => {
                    return prev.map(bookings => {
                        if (bookings._id == bookid) {
                            return { ...bookings, status: "check-out" }
                        }
                        return bookings
                    })
                })
        }
        catch(error){
            console.log(error)
        }
    }

    // useEffect(()=>{
    //     async function fetch()
    // },[statusFilter])

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (props.showrecentbooking) {
                    setBookings(props.showrecentbooking)
                } else {
                    if (statusFilter && statusFilter != "All Bookings") {
                        const status = statusFilter;
                        const res = await getAllBookings({ status });
                        return setBookings(res.data.data);
                    }
                    const res = await getAllBookings();
                    setBookings(res.data.data);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [props.showrecentbooking, statusFilter]);

    if (loading) {
        return <h3>Loading...</h3>;
    }

    // if (!bookings.length) {
    //     return <h3>No Bookings Found</h3>;
    // }

    return (
        <>
            <Row>
                <Col className="m-4 bg-dark border rounded">
                    {
                        props.text ? <h3 className="text-warning m-4 ">{props.text}</h3>
                            : <div className="d-flex justify-content-between  m-4">
                                <h3 className="text-warning">Manage Bookings</h3>
                                <FormSelect style={{ width: "200px" }}
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="All Bookings">All Bookings</option>
                                    <option value="pending">pending</option>
                                    <option value="check-in">check-in</option>
                                    <option value="check-out">check-out</option>
                                    <option value="confirm">confirm</option>
                                    <option value="cancelled">cancelled</option>
                                </FormSelect>
                            </div>
                    }
                    {bookings.length == 0 ? <Card border="warning"
                        className="bg-dark m-4 p-2"><Card.Text className="text-white">No Booking Found</Card.Text></Card>
                        : bookings.map((booking) => {
                            return <BookingCard booking={booking}>

                                <div className="d-flex justify-content-between ">
                                        {booking.status == "pending"?
                                        <>
                                            <Button variant="outline-warning" className="me-4"  onClick={() => { handleConfirm(booking._id) }} >
                                                confirm
                                            </Button>
                                            <Button variant="outline-danger" onClick={() => { handleCancel(booking._id) }}>
                                                Cancel
                                            </Button>
                                        </>
                                            :booking.status == "confirm"?<Button variant="outline-warning" className="me-4" onClick={() => { handleCheckin(booking._id) }}>
                                                CheckIn
                                            </Button>:booking.status=="check-in"?
                                            <Button variant="outline-warning" onClick={() => { handleCheckout(booking._id) }}>
                                                Checkout
                                            </Button>:null}
                                    </div>

                                {/* {props.showrecentbooking ? null : */}
                                    {/* <div className="d-flex justify-content-between ">
                                        {booking.status == "confirm" || booking.status == "check-in" || booking.status == "check-out" ?
                                            <Button variant="outline-warning disabled" className="me-4" >
                                                confirm
                                            </Button>
                                            : <Button variant="outline-warning" className="me-4" onClick={() => { handleConfirm(booking._id, booking.room._id) }}>
                                                confirm
                                            </Button>}
                                        {booking.status == "cancelled" || booking.status == "check-in" || booking.status == "check-out" 
                                        ? <Button variant="outline-danger disabled">
                                            Cancel
                                        </Button> :
                                            <Button variant="outline-danger" onClick={() => { handleCancel(booking._id, booking.room._id) }}>
                                                Cancel
                                            </Button>}
                                    </div> */}
                                {/* } */}
                            </BookingCard>
                            //     return <Card
                            //         key={booking._id}
                            //         border="warning"
                            //         className="bg-dark m-4 p-2"
                            //     >
                            //         <Card.Header className="text-light">
                            //             Booking Details
                            //         </Card.Header>
                            //         <Card.Body className="d-flex justify-content-between align-items-center">
                            //             <div>
                            //                 <div className="d-flex align-items-center">
                            //                 <Card.Text className="text-light mb-0">
                            //                     <FaCalendarDay className="text-warning me-2" />
                            //                     Check In: {booking.checkin?.split("T")[0]}

                            //                     {"   →  "}

                            //                     <FaCalendarDay className="text-warning ms-3 me-2" />
                            //                     Check Out: {booking.checkout?.split("T")[0]}
                            //                 </Card.Text>

                            //                 <div className="ms-4">
                            //                     {
                            //                         booking.status=="cancelled"?
                            //                         <Badge className="p-2 bg-danger">{booking.status}</Badge>
                            //                         :booking.status=="pending"?
                            //                         <Badge className="p-2 bg-warning">{booking.status}</Badge>
                            //                         :<Badge className="p-2">{booking.status}</Badge>
                            //                     }
                            //                 </div>

                            //                 </div>

                            //                 <Card.Text className="text-light">
                            //                     Nights: {booking.nights}
                            //                 </Card.Text>

                            //                 <Card.Text className="text-warning">
                            //                     ₹ {booking.price}
                            //                 </Card.Text>
                            //             </div>
                            //              {props.showrecentbooking?null:
                            //             <div className="d-flex justify-content-between ">
                            //             {booking.status=="confirm"||booking.status=="check-in"||booking.status=="check-out"?
                            //             <Button variant="outline-warning disabled" className="me-4" >
                            //                 confirm
                            //             </Button>
                            //             :<Button variant="outline-warning" className="me-4"  onClick={()=>{handleConfirm(booking._id,booking.room)}}>
                            //                 confirm
                            //             </Button>}
                            //             {booking.status=="cancelled"||booking.status=="check-in"||booking.status=="check-out"?<Button variant="outline-danger disabled">
                            //                 Cancel
                            //             </Button>:
                            //             <Button variant="outline-danger" onClick={()=>{handleCancel(booking._id,booking.room)}}>
                            //                 Cancel
                            //             </Button>}
                            //             </div>
                            // }
                            //         </Card.Body>
                            //     </Card>
                        })}
                </Col>
            </Row>
        </>
    );
}
