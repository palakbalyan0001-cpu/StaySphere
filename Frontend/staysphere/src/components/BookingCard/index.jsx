import { Badge, Card } from "react-bootstrap"
import { FaCalendarDay } from "react-icons/fa"

export const BookingCard = ({booking,children}) => {
    return (
        <Card
            key={booking._id}
            border="warning"
            className="bg-dark m-4 ">
            <Card.Header className="text-light fw-bolder">
                Booking Details
            </Card.Header>
            <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                    <Card.Text className="text-light">
                        <p className="text-warning ">{booking.room.type}-#RoomNo:{booking.room.roomNumber}</p>
                        <p>Guest : {booking.user.email}</p>
                        <FaCalendarDay className="text-warning me-2" />
                        Check In: {booking.checkin?.split("T")[0]}
                        {"   →  "}
                        <FaCalendarDay className="text-warning ms-3 me-2" />
                        Check Out: {booking.checkout?.split("T")[0]}
                        <Badge className={`ms-4 ${booking.status=="pending"?"bg-warning":booking.status=="cancelled"?"bg-danger":"bg-primary"} p-2 fs-bolder`}>
                         {booking.status}
                        </Badge>
                    </Card.Text>

                    <Card.Text className="text-light">
                        Nights: {booking.nights}
                    </Card.Text>

                    <Card.Text className="text-warning">
                        ₹ {booking.price}
                    </Card.Text>
                    
                </div>
                <div className="d-flex justify-content-between ">
                    {children}
                </div>
            </ Card.Body>
        </Card>
    )
}