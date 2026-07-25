import { useEffect, useState } from "react"
import { Container,Col,Row, Button, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Model } from "../../../components/Model"
import {roomfield} from "../../../data/roomfield"
import { Createrooms, deleteroom, getroom } from "../../../API/rooms"
import * as yup from "yup"
export const AdminRooms=()=>{
    const [room,setroom]=useState([])
    const [modal,showModal]=useState(false)

    const openCreate=()=>{
        showModal(true)
    } 
    const initialState={
            roomNumber:"",
            type:"",
            pricePerNight:"",
            capacity:"",
            acNonAc:"",
        }
        const CreateRoomSchema=yup.object({
                type:yup.string().required("Please enter the type of room").min(3),
                roomNumber:yup.number().required(),
                pricePerNight:yup.number().required("Enter room price"),
                capacity:yup.number().required(),
                acNonAc:yup.string().required("Choose either Ac or NonAc")
        })
        const Createroom=async(values)=>{
            try{
                const result=await Createrooms(values)
                    const res=await getroom()
                    setroom(res.data.rooms)
                showModal(false)
            }
            catch(err){
                console.log(err)
            }
        }

        const handleDelete=async(id)=>{
            const res=await deleteroom(id);
            if(res.data.success==true){
                const rooms = await getroom();
                setroom(rooms.data.rooms);
            }
        }
    
    useEffect(()=>{
        async function fetch(){
            const res=await getroom()
            console.log(res.data.rooms)
            setroom(res.data.rooms)
        }
        fetch();
    },[])
    return(
        <>
           <Container fluid className="py-4">
            <Row className="justify-content-center">
                <Col lg={12}>
                <div className="bg-dark rounded-4 shadow p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="text-warning fw-bold mb-1">
                        Manage Rooms
                        </h2>
                        
                    </div>

                    <Button variant="warning" className="fw-semibold px-4" onClick={()=>{openCreate()}}>
                        + Add Room
                    </Button>
                    </div>

                    <Table
                    responsive
                    hover
                    striped
                    bordered
                    variant="dark"
                    className="align-middle rounded overflow-hidden"
                    >
                    <thead>
                        <tr className="text-warning">
                        <th>Room No.</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Capacity</th>
                        <th>Status</th>
                        <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {room.map((item) => (
                        <tr key={item._id}>
                            <td className="fw-semibold">{item.roomNumber}</td>

                            <td>{item.type}</td>

                            <td className="text-warning fw-bold">
                            ₹ {item.pricePerNight}
                            </td>

                            <td>{item.capacity}</td>

                            <td>
                            <span
                                className={`badge ${
                                item.status === "Available"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                            >
                                {item.status}
                            </span>
                            </td>

                            <td>
                            <Button
                                size="sm"
                                variant="outline-warning"
                                className="me-2"
                            >
                                Edit
                            </Button>

                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={()=>{handleDelete(`${item.roomNumber}`)}}
                            >
                                Delete
                            </Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </Table>

                </div>
                </Col>
            </Row>
         </Container>
         {modal==true?<Model roomfields={roomfield} 
            initialState= {initialState} 
            handleroom={Createroom} 
            modalsetter={showModal}
            validationSchema={CreateRoomSchema}/>:null}
        </>
    )
}