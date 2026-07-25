import { Col, Container, Row,Card,Button, ListGroup, ListGroupItem } from "react-bootstrap";
// import { rooms } from "../../data/Guest/Rooms";
import { MdAcUnit } from "react-icons/md";
import { FaBed, FaWifi } from "react-icons/fa";
import "../../styles/GuestHome.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function Cards(props){
    const {user}=useSelector(state=>state.auth)
    return(
        <>
            <Container fluid>
            <Row className="g-4 justify-content-center">
            {props.data.map((data) => (
                <Col
                key={data._id || data.id}
                xs={12}
                sm={6}
                md={6}
                lg={2}
                xl={3}
                className="d-flex justify-content-center"
                >
                <Card
                    className="service-card w-100 "
                    style={{
                    maxWidth: "20rem",
                    backgroundColor: "rgba(9, 17, 27, 1)",
                    color: "white",
                    }}
                >
                    <Card.Img
                    variant="top"
                    src={data.images[0]}
                    style={{
                        height: "14rem",
                        objectFit: "cover",
                    }}
                    />

                    <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                        <div>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text className="text-warning fs-5">
                            ₹{data.pricePerNight}
                            <span className="text-secondary fs-6">/Night</span>
                        </Card.Text>
                        </div>

                        <div className="text-end">
                        <small className="text-secondary">
                            ({data.reviews} Reviews)
                        </small>

                        <div className="mt-2">
                            <span
                            className={`badge ${
                                data.availability ? "bg-success" : "bg-danger"
                            }`}
                            >
                            {data.availability ? "Available" : "Booked"}
                            </span>
                        </div>
                        </div>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-around mb-3">
                        <span><FaBed /> {data.bed}</span>
                        {data.ac && <span><MdAcUnit /> AC</span>}
                        {data.wifi && <span><FaWifi /> WiFi</span>}
                    </div>

                    <Button
                        className="mt-auto w-100"
                        variant="outline-warning"
                        as={Link}
                        to={
                        !user
                            ? `/room-details/${data.id}`
                            : `/user/room-details/${data.id}`
                        }
                    >
                        View Details
                    </Button>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </Container>
        </>
    )
}