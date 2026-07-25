
import { Carousel,Container,Image,Row,Col,ListGroup,Card, CardText, Button} from "react-bootstrap"
// import { Cards } from "../../components/Card"
import { Link, useParams} from "react-router-dom"
import { useState ,useEffect} from "react"
import { getrooms } from "../../API/rooms"
import { Navbarr } from "../../components/Nav"
import Footer from "../../components/Footer/Footer"
import { useSelector } from "react-redux"
export function Roomdetails(){
    const {user}=useSelector(state=>state.auth);
    const [data,setdata]=useState([])
    const {id}=useParams()
     useEffect(()=>{
            async function fetch(){
                try{
                    const {result}=await getrooms(id)
                    setdata(result)
                }
                catch(error){
                    console.log(error)
                }
            }
            fetch();
        },[])
    return(
        <>
        <Container
        fluid
        className="py-5 px-3 px-md-5"
        style={{
            backgroundColor: "rgb(251, 254, 254)",
            minHeight: "100vh",
            color: "white",
        }}
        >
        {data &&
            data.length > 0 &&
            data.map((prod) => {
            return (
                <Row className="align-items-center g-5" key={prod.id}>
                <Col xs={12} lg={6} className="text-center">
                    {prod.images.length > 1 ? (
                        <>
                    <Carousel
                        style={{
                        maxWidth: "650px",
                        margin: "auto",
                        }}
                    >
                        {prod.images.map((img, index) => (
                        
                        <Carousel.Item key={index}>
                            <Image
                            src={img}
                            fluid
                            rounded
                            style={{
                                height: "450px",
                                width: "100%",
                                objectFit: "cover",
                            }}
                            />
                        </Carousel.Item>
                        ))}
                    </Carousel><br />
                    {!user?<Button variant="outline-dark" as={Link} to="/register" className="w-100">Book</Button>
                    :data[0].availability===true?<Button variant="outline-dark" as={Link} to={`/user/booking/${prod.id}`} className="w-100">Book</Button>
                    :<Button variant="outline-danger">Not Available</Button>}
                    </>
                    ): (
                    <Image
                        src={prod.images}
                        fluid
                        rounded
                        style={{
                        maxHeight: "450px",
                        width: "100%",
                        objectFit: "cover",
                        }}
                    />
                    )}
                </Col>

                <Col xs={12} lg={6}>
                    <h2
                    className="fw-bold mb-2"
                    style={{ color: "#D4AF37" }}
                    >
                    {prod.type}
                    </h2>

                    <h5 className="text-dark mb-3">{prod.name}</h5>

                    {prod.availability ? (
                    <span className="badge bg-success me-2 px-3 py-2">
                        Available
                    </span>
                    ) : (
                    <span className="badge bg-danger me-2 px-3 py-2">
                        Booked
                    </span>
                    )}

                    <span
                    className="badge px-3 py-2"
                    style={{
                        backgroundColor: "#09111B",
                        color: "#D4AF37",
                    }}
                    >
                    ⭐ {prod.rating}
                    </span>

                    <p
                    className="mt-4"
                    style={{
                        color: "#e0e0e0",
                        lineHeight: "1.8",
                    }}
                    >
                    {prod.description}
                    </p>

                    <h3
                    className="mb-4"
                    style={{ color: "#D4AF37" }}
                    >
                    ${prod.pricePerNight}
                    <span
                        className="ms-2 badge bg-danger"
                        style={{ fontSize: "15px" }}
                    >
                        {prod.discountPercentage}% OFF
                    </span>
                    </h3>

                    <ListGroup >
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>Rating: </b> ⭐ {prod.rating}</ListGroup.Item>
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>Reviews: </b>{prod.reviews}</ListGroup.Item>
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>Size: </b>{prod.size}</ListGroup.Item>
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>Capacity: </b>{prod.capacity}</ListGroup.Item>
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>View: </b>{prod.view}</ListGroup.Item>
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>Bathroom: </b>{prod.bathroom}</ListGroup.Item>
                    </ListGroup>
                </Col>
                </Row>
            );
            })}
        </Container>
        </>
    )
}