import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaCalendarDay, FaSuitcaseRolling } from "react-icons/fa";
import { cancelBooking, getMyBooking } from "../../../API/bookingapi";
import { Card } from "react-bootstrap";

export const MyBookings=()=>{
  const [bookings, setBookings] = useState([]);
const [loading, setLoading] = useState(true);

const handleCancel=async(id)=>{
  try{
    console.log("ppp")
    console.log(id)
    const res=await cancelBooking(id);
  }
  catch(error){
    console.log(error)
  }
}

useEffect(() => {
    const fetchBookings = async () => {
        try {
            const data = await getMyBooking();
            setBookings(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    fetchBookings();
}, [bookings]);

if (loading) {
    return <h3>Loading...</h3>;
}

if (!bookings.length) {
    return <h3>No Bookings Found</h3>;
}

return (
    <>
        {bookings.map((booking) => {
            return <Card
                key={booking._id}
                border="warning"
                className="bg-dark m-4 p-2"
            >
                <Card.Header className="text-light">
                    Booking Details
                </Card.Header>

                <Card.Body className="d-flex justify-content-between align-items-center">

                    <div>
                        <Card.Text className="text-light">
                            <FaCalendarDay className="text-warning me-2" />
                            Check In: {booking.checkin?.split("T")[0]}

                            {"   →  "}

                            <FaCalendarDay className="text-warning ms-3 me-2" />
                            Check Out: {booking.checkout?.split("T")[0]}
                        </Card.Text>

                        <Card.Text className="text-light">
                            Nights: {booking.nights}
                        </Card.Text>

                        <Card.Text className="text-warning">
                            ₹ {booking.price}
                        </Card.Text>
                    </div>
                    <div className="d-flex justify-content-between ">
                    <Button variant="outline-warning" className="me-4">
                        {booking.status}
                    </Button>
                    {booking.status=="cancelled"?<Button variant="outline-danger disabled">
                        Cancel
                    </Button>:
                    <Button variant="outline-danger" onClick={()=>{handleCancel(booking._id)}}>
                        Cancel
                    </Button>}
                    </div>
                </Card.Body>
            </Card>
          })}
    </>
);
}
