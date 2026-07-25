import { Navbarr } from "../../../components/Nav";
import { homeData } from "../../../data/Guest/Home";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../../../styles/GuestHome.css";
import Footer from "../../../components/Footer/Footer";
import { useSelector } from "react-redux";

export function Home() {
  const {user}=useSelector(state=>state.auth)
  return (
    <Container fluid className="home-container">
      
      <div id="hero-section">
        <img
          src={homeData.hero.image}
          alt="Hotel"
          id="hero-image"
        />

        <div className="hero-content">
          <h1>{homeData.hero.title}</h1>
          <h3>{homeData.hero.subtitle}</h3>
        </div>
      </div>

      <Row className="services-section">
        <h1 className="services-heading">Services</h1>

        {homeData.services.map((data) => (
          <Col key={data.id} className="service-col">
            <Card className="service-card">
              <Card.Img variant="top" src={data.image} />

              <Card.Body>
                <Card.Title>{data.title}</Card.Title>

                <Card.Text className="text-truncate">
                  {data.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}