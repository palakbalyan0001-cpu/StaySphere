import { Container, Row, Col } from "react-bootstrap";
import {
  FaCrown,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="py-5"
      style={{ backgroundColor: "rgb(14, 23, 35)" }}
    >
      <Container fluid>
        <Row className="gy-4">
          {/* Brand */}
          <Col md={4}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <FaCrown color="#D4AF37" size={22} />
              <span
                className="fw-bold fs-4"
                style={{ color: "#D4AF37", fontFamily: "Playfair Display, serif" }}
              >
                Stay Sphere
              </span>
            </div>

            <p className="small text-white">
              A refined stay experience—elegant rooms, attentive service, and
              effortless booking, all in one place.
            </p>

            <div className="d-flex gap-3 mt-3">
              <a href="#" style={{ color: "#D4AF37" }}>
                <FaFacebook size={20} />
              </a>
              <a href="#" style={{ color: "#D4AF37" }}>
                <FaInstagram size={20} />
              </a>
              <a href="#" style={{ color: "#D4AF37" }}>
                <FaTwitter size={20} />
              </a>
            </div>
          </Col>

          {/* Contact */}
          <Col md={4}>
            <h5
              className="mb-3"
              style={{ color: "#D4AF37", fontFamily: "Playfair Display, serif" }}
            >
              Contact
            </h5>

            <p className="small text-white d-flex align-items-center gap-2 mb-2">
              <FaMapMarkerAlt color="#D4AF37" />
              12 Regal Avenue, New Delhi, India
            </p>

            <p className="small text-white d-flex align-items-center gap-2 mb-2">
              <FaPhoneAlt color="#D4AF37" />
              +91 98765 43210
            </p>

            <p className="small text-white d-flex align-items-center gap-2">
              <FaEnvelope color="#D4AF37" />
              stay@grandregal.example
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h5
              className="mb-3"
              style={{ color: "#D4AF37", fontFamily: "Playfair Display, serif" }}
            >
              Quick Links
            </h5>

            <div className="d-flex flex-column gap-2">
              <a
                href="/rooms"
                className="text-decoration-none text-white"
              >
                Browse Rooms
              </a>

              <a
                href="/register"
                className="text-decoration-none text-white"
              >
                Create an Account
              </a>

              <a
                href="/login"
                className="text-decoration-none text-white"
              >
                Sign In
              </a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: "#D4AF37", opacity: 0.3 }} />

        <p className="text-center text-white small mb-0">
          © {new Date().getFullYear()}{" "}
          <span style={{ color: "#D4AF37", fontWeight: "600" }}>
            Grand Regal Hotel
          </span>
          . All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;