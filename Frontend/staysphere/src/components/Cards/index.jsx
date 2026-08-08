import { Col, Container, Row,Card,Button, ListGroup, ListGroupItem } from "react-bootstrap";
// import { rooms } from "../../data/Guest/Rooms";
import { MdAcUnit } from "react-icons/md";
import { FaBed, FaWifi } from "react-icons/fa";
import "../../styles/GuestHome.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IMAGE_URL } from "../../../config";

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
                    className="service-card w-100  m-4"
                    style={{
                    maxWidth: "20rem",
                    backgroundColor: "rgba(9, 17, 27, 1)",
                    color: "white",
                    }}
                >
                    <Card.Img
                    variant="top"
                    src={`${IMAGE_URL}${data.images[0]}`}
                    style={{
                        height: "14rem",
                        objectFit: "cover",
                    }}
                    />

                    <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                        <div>
                        <Card.Title>{data.description}</Card.Title>
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
                                data.status=="Available" ? "bg-success" : "bg-danger"
                            }`}
                            >
                            {data.status}
                            </span>
                        </div>
                        </div>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-around mb-3">
                        <span><FaBed /> {data.bedType}</span>
                        {data.acNonAc && <span><MdAcUnit /> AC</span>}
                        {data.wifi && <span><FaWifi /> WiFi</span>}
                    </div>

                    <Button
                        className="mt-auto w-100"
                        variant="outline-warning"
                        as={Link}
                        to={
                        `/room-details/${data._id}`
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