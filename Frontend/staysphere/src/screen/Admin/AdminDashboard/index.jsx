import { useEffect } from "react"
import { Card } from "react-bootstrap"

export const AdminDashboard=()=>{

    useEffect(()=>{
        async function fetch(){
            try{
                
            }
            catch(error){
                console.log(error)
            }
        }
        fetch()
    },[])

    return(
        <>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Total Booking</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{}</Card.Subtitle>
            </Card.Body>
        </Card>
        </>
    )
}