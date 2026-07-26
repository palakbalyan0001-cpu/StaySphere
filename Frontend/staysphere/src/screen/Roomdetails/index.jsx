
import { Carousel,Container,Image,Row,Col,ListGroup,Card, CardText, Button} from "react-bootstrap"
// import { Cards } from "../../components/Card"
import { Link, useParams} from "react-router-dom"
import { useState ,useEffect} from "react"
import { getroomById, getrooms } from "../../API/rooms"
import { Navbarr } from "../../components/Nav"
import Footer from "../../components/Footer/Footer"
import { useSelector } from "react-redux"
import { IMAGE_URL } from "../../../config"
export function Roomdetails(){
    const {user}=useSelector(state=>state.auth);
    const [data,setdata]=useState([])
    const {id}=useParams()
     useEffect(()=>{
            async function fetch(){
                try{
                    console.log(id)
                    const result=await getroomById(id)
                    const data=[]
                    data.push(result.data.rooms)
                    setdata(data)
                }
                catch(error){
                    console.log(error)
                }
            }
            fetch();
        },[])
        {console.log(data)}
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
            data.map((prod) => {
                {console.log(prod)}
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
                            src={`${IMAGE_URL}${img}`}
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
                    {!user ?<Button variant="outline-dark" as={Link} to="/register" className="w-100">Book</Button>
                    :data[0].status==="Available"?<Button variant="outline-dark" as={Link} to={`/user/booking/${prod.roomNumber}`} className="w-100">Book</Button>
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
                    className="fw-bold "
                    style={{ color: "#085068" }}
                    >
                    {prod.description}
                    </h2>

                    {prod.status=="Available"? (
                    <span className="badge bg-success m-2 px-3 py-2">
                        Available
                    </span>
                    ) : (
                    <span className="badge bg-danger m-2 px-3 py-2">
                        {prod.status}
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

                    <h3
                    className="mb-4"
                    style={{ color: "#D4AF37",lineHeight: "1.8" }}
                    >
                    ${prod.pricePerNight}
                    </h3>

                    <ListGroup >
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>Rating: </b> ⭐ {prod.rating}</ListGroup.Item>
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>Reviews: </b>{prod.reviews}</ListGroup.Item>
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>BedType: </b>{prod.bedType}</ListGroup.Item>
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>Capacity: </b>{prod.capacity}</ListGroup.Item>
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>AcNonAc: </b>{prod.acNonAc}</ListGroup.Item>
                    <ListGroup.Item className="text-light" style={{backgroundColor:"rgba(9, 17, 27, 1)"}}><b>Wifi: {prod.wifi=="true"?<b> Yes</b>:<b> No</b>}</b></ListGroup.Item>
                    </ListGroup>
                </Col>
                </Row>
            );
            })}
        </Container>
        </>
    )
}