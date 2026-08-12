import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
} from "react-bootstrap";
import { FaCalendarCheck } from "react-icons/fa";
import { getroomById } from "../../../API/rooms";
import { nightsBetween } from "../../../utils/helpers";
import { IMAGE_URL } from "../../../../config";
import { verifyPayment } from "../../../API/payment";

export function Booking() {
  const { id } = useParams();
  const Navigate = useNavigate();

  const [room, setrooms] = useState([]);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [error, seterror] = useState("");
  const [checkavailable, setavailability] = useState(false);
  const [bookingId, setBookingId] = useState(null); 

  const nights = checkin && checkout ? nightsBetween(checkin, checkout) : 0;
  const total = room.length > 0 ? nights * room[0].pricePerNight : 0;

  const handleBooking = async (checkin, checkout, roomid) => {
    seterror("");

    if (!checkin || !checkout) {
      return seterror("Both Fields is required");
    }
    if (checkout < checkin) {
      return seterror("CheckOut date must be after CheckIn");
    } else if (checkout === checkin) {
      return seterror("CheckIn and Checkout date not be same");
    }

    try {
      const data = {
        checkin,
        checkout,
        nights,
        price: room[0].pricePerNight * nights,
      };

      const res = await fetch(`http://localhost:3000/user/booking/${roomid}`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setBookingId(result.bookingId); 
        setavailability(true); 
      } else {
        seterror(result.message);
      }
    } catch (error) {
      console.log(error);
      seterror("Something went wrong, please try again");
    }
  };

  const handlepayment = async () => {
    try {
      const amount = room[0].pricePerNight * nights; 

      const keyRes = await fetch(`http://localhost:3000/key`, {
        credentials: "include",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const { key } = await keyRes.json(); 

      const orderRes = await fetch(`http://localhost:3000/payment/create-order`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: amount, bookingId }),
      });
      const order = await orderRes.json();

      const options = {
        key,
        amount: order.amount, 
        currency: "INR",
        name: "StaySphere",
        description: "Hotel Management System",
        order_id: order.id,
        handler: async function (response) {
          try {
            const info = {
              bookingId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount,
            };
            const verify = await verifyPayment(info);
            if (verify.data.success) {
              Navigate("/user/mybooking", { replace: true });
            } else {
              seterror("Payment verification failed");
            }
          } catch (error) {
            console.log(error);
            seterror("Payment verification failed");
          }
        },
        prefill: {
          name: "StaySphere",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        theme: { color: "#5494f3" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      seterror("Unable to start payment");
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const result = await getroomById(id);
        setrooms([result.data.rooms]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, [id]);

  return (
    <>
      <Container fluid="lg" className="my-4 px-3 px-md-4">
        <div className="text-center mb-4">
          <FaCalendarCheck className="text-gold mb-2" size={28} />
          <h2 className="font-display text-gold">Confirm Your Booking</h2>
        </div>

        {error ? (
          <div className="bg-danger rounded text-white p-2 w-100 mb-3" style={{ maxWidth: "640px" }}>
            {error}
          </div>
        ) : null}

        <Row className="g-4">
          <Col lg={8} md={12} xs={12}>
            <div>
              {room.length > 0 ? (
                <img
                  className="img-fluid rounded w-100"
                  style={{ height: "clamp(220px,35vw,320px)", objectFit: "cover" }}
                  src={`${IMAGE_URL}${room[0].images[0]}`}
                  alt=""
                />
              ) : null}
            </div>

            <div className="row g-3 my-4">
              <div className="col-12 col-md-6">
                <FormGroup>
                  <Form.Label>Check-in Date</Form.Label>
                  <Form.Control
                    className="form-control-navy"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={checkin}
                    onChange={(e) => {
                      seterror("");
                      setavailability(false); // dates changed, must re-check
                      setCheckin(e.target.value);
                    }}
                  />
                </FormGroup>
              </div>

              <div className="col-12 col-md-6">
                <FormGroup>
                  <Form.Label>Check-Out Date</Form.Label>
                  <Form.Control
                    className="form-control-navy"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={checkout}
                    onChange={(e) => {
                      seterror("");
                      setavailability(false);
                      setCheckout(e.target.value);
                    }}
                  />
                </FormGroup>
              </div>
            </div>

            {!checkavailable ? (
              <Button className="w-100 py-2 mt-2" onClick={() => handleBooking(checkin, checkout, id)}>
                Check Availability
              </Button>
            ) : (
              <Button className="w-100 py-2 mt-2" onClick={handlepayment}>
                Proceed to pay
              </Button>
            )}
          </Col>

          <Col lg={4} md={12} xs={12} className="mt-4">
            {room.length > 0 ? (
              <div className="p-4 bg-dark rounded border border-3 border-warning">
                <h6 className="font-display text-warning mb-3">Price Summary</h6>
                <div className="d-flex justify-content-between text-white small mb-2">
                  <span>
                    ₹{room[0].pricePerNight} × {nights || 0} night{nights !== 1 ? "s" : ""}
                  </span>
                  <span>₹{total}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold text-warning">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}