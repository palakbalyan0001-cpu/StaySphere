import { Card, CardBody, CardFooter, Container } from "react-bootstrap";
import { Navbarr } from "../../../components/Nav";
import "../../../styles/GuestAbout.css"
import Footer from "../../../components/Footer/Footer";
export function About(){
    return(
        <>
        <div  id="con1">
        <img src="hotel_interior.png" style={{width:"100%",height:"500px",position:"relative"}} />
        <div style={{width:"33%",position:"absolute",top:"30%",left:"5%",color:"white"}} className="mx-4">
            <h1>ABOUT US</h1>
            <h3>Experience Luxury. Feel at Home.</h3>
            <p>At StaySphere Hotel, we blend comfort, elegance, and exceptional hospitality to create unforgettable memories. Whether for business or leisure, we ensure a stay that's truly special.</p>
        </div>
        <div className="m-4 px-4 py-4" style={{display:"flex",justifyContent:"space-around",height:"300px"}}>
            <div style={{width:"40%"}}>
            <h1>OUR STORY</h1><br></br>
            <p>Founded with a passion for hospitality, StaySphere Hotel has been welcoming guests with world-class services and premium amenities. Our dedicated team works around the clock to provide a comfortable, safe, and memorable stay for every guest.</p>
            </div>
            <div>
                <img src="hotel_exterior.png" />
            </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-around",backgroundColor:"rgba(9, 17, 27, 1)"}} className="px-4 py-4">
            <img src="room.png" width={"40%"}/>
            <div style={{alignContent:"center",width:"40%"}} >
                <h1 className="text-white">Our Commitment</h1><br></br>
                <p className="text-white">We are committed to offering exceptional hospitality with modern amenities, a warm atmosphere, and personalized services. Your comfort and happiness are our greatest rewards.</p>
            </div>
        </div>
        </div>
        </>
    )
}