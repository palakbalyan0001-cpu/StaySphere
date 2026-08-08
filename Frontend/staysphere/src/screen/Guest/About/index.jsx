import { Container, Row, Col } from "react-bootstrap";
import "../../../styles/GuestAbout.css";

export function About() {
  return (
    <>
      <div className="position-relative">
        <img
          src="hotel_interior.png"
          alt="Hotel Interior"
          className="img-fluid w-100"
          style={{ height: "500px", objectFit: "cover" }}
        />

        <div
          className="position-absolute text-white"
          style={{
            top: "50%",
            left: "5%",
            transform: "translateY(-50%)",
            maxWidth: "550px",
          }}
        >
          <h1 className="display-5 fw-bold">ABOUT US</h1>

          <h3>Experience Luxury. Feel at Home.</h3>

          <p className="lead">
            At StaySphere Hotel, we blend comfort, elegance, and exceptional
            hospitality to create unforgettable memories. Whether for business
            or leisure, we ensure a stay that's truly special.
          </p>
        </div>
      </div>

      <Container className="py-5">
        <Row className="align-items-center gy-4">
          <Col xs={12} lg={6}>
            <h2 className="mb-4">OUR STORY</h2>

            <p>
              Founded with a passion for hospitality, StaySphere Hotel has been
              welcoming guests with world-class services and premium amenities.
              Our dedicated team works around the clock to provide a
              comfortable, safe, and memorable stay for every guest.
            </p>
          </Col>

          <Col xs={12} lg={6} className="text-center">
            <img
              src="hotel_exterior.png"
              alt="Hotel Exterior"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </Container>

      <section className="bg-dark py-5">
        <Container>
          <Row className="align-items-center gy-4">
            <Col xs={12} lg={6} className="text-center">
              <img
                src="room.png"
                alt="Hotel Room"
                className="img-fluid rounded shadow"
              />
            </Col>

            <Col xs={12} lg={6}>
              <h2 className="text-white mb-4">Our Commitment</h2>

              <p className="text-white">
                We are committed to offering exceptional hospitality with modern
                amenities, a warm atmosphere, and personalized services. Your
                comfort and happiness are our greatest rewards.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}