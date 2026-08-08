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
import { getroomById, getrooms } from "../../../API/rooms";
import { nightsBetween } from "../../../utils/helpers";
import { IMAGE_URL } from "../../../../config";

export function Booking() {
  const { id } = useParams();
  const Navigate = useNavigate();

  const [room, setrooms] = useState([]);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [error, seterror] = useState("");

  const nights = checkin && checkout ? nightsBetween(checkin, checkout) : 0;
  const total = room.length > 0 ? nights * room[0].pricePerNight : 0;

  const handleBooking = async (checkin, checkOut,roomid) => {
    seterror("");

    if (!checkin || !checkOut) {
      return seterror("Both Fields is required");
    }

    if (checkout < checkin) {
      return seterror("CheckOut date must be after CheckIn");
    } else if (checkout == checkin) {
      return seterror("CheckIn and Checkout date not be same");
    }

    try {
      const data = {
        checkin,
        checkout,
        nights,
        price: room[0].pricePerNight * nights,
      };

      const CreateBooking = await fetch(
        `http://localhost:3000/user/booking/${roomid}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const { success,message } = await CreateBooking.json();

      if (success == true) {
        Navigate("/user/mybooking",{replace:true});
      }else{
        seterror(message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getroomById(id);
        const data=[]
        data.push(result.data.rooms)
        setrooms(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <Container fluid="lg" className="my-4 px-3 px-md-4">
        <div className="text-center mb-4">
          <FaCalendarCheck className="text-gold mb-2" size={28} />
          <h2 className="font-display text-gold">
            Confirm Your Booking
          </h2>
        </div>

        {error ? (
          <div
            className="bg-danger rounded text-white p-2 w-100 mb-3"
            style={{ maxWidth: "640px" }}
          >
            {error}
          </div>
        ) : null}

        <Row className="g-4">
          <Col lg={8} md={12} xs={12}>
            <div>
              {room && room.length>0 ? (
                <img
                  className="img-fluid rounded w-100"
                  style={{
                    height: "clamp(220px,35vw,320px)",
                    objectFit: "cover",
                  }}
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
                      setCheckout(e.target.value);
                    }}
                  />
                </FormGroup>
              </div>
            </div>

            <Button
              className="w-100 py-2 mt-2"
              onClick={() => {
                handleBooking(checkin, checkout,id);
              }}
            >
              Confirm Booking
            </Button>
          </Col>

          <Col lg={4} md={12} xs={12} className="mt-4">
            {room.length > 0 ? (
              <div className="p-4 bg-dark rounded border border-3 border-warning ">
                <h6 className="font-display text-warning mb-3">
                  Price Summary
                </h6>

                <div className="d-flex justify-content-between text-white small mb-2">
                  <span>
                    ₹{room[0].pricePerNight} × {nights || 0} night
                    {nights !== 1 ? "s" : ""}
                  </span>

                  <span>₹{total}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold text-warning">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <p className="text-white small mt-3 mb-0">
                  Payment is handled at check-in / check-out by our front desk
                  for this booking flow.
                </p>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}