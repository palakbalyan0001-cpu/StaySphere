import { Col, Container ,Row} from "react-bootstrap"
import { Formdata } from "../../components/Form"
import { fields } from "../../data/Guest/fields"
import "../../styles/Register.css"
import { Link, Navigate } from "react-router-dom"
import { useState } from "react"
import * as yup from "yup"
export function Register(){
    const [data,setdata]=useState({})
    const initialState={
        fullname:"",
        email:"",
        number:"",
        password:"",
        conpassword:""
    }
    const registerSchema=yup.object({
            fullname:yup.string().required("Please enter your first name").min(3),
            email:yup.string().required("Enter your email").matches(/^[a-zA-Z\d]{3,}@gmail\.com$/,"Invalid email format"),
            number:yup.number(),
            password:yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
            conpassword:yup.string().required("Confirm password is required").oneOf([yup.ref("password")],"it should be match with password")
    })
    const handleregister=async(values)=>{
        try{
            const result=await fetch('http://localhost:3000/home/register',{
                method:"POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body:JSON.stringify(values)
            })
            const get=await result.json()
            setdata(get)
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <>
        {console.log(data.success)}
        {data.success==true?<Navigate to="/login" replace/>:null}
        <Container fluid className="register-page">
                <Row className="register-box m-4">
                    <Col md={6} className="img p-0">
                        <img src="hotel_interior.png" alt="Hotel"/>
                    </Col>

                    <Col
                        md={6}
                        className="formdata d-flex justify-content-center align-items-center"
                    >
                        <div className="register-card m-2">
                            <div className="text-center fw-bold text-warning">
                                <h1 >Create Account</h1>
                                <p className="lead">Join StaySphere and experience luxury</p>
                            </div>
                            <Formdata isMultipart={false} fields={fields} text="Register" Submit={handleregister} initialstate={initialState} validationSchema={registerSchema}/>
                            {data.message?<p style={{color:'white'}}>{data.message}</p>:null}
                            <p  style={{color:'gold',textAlign:"center"}} className="mt-2">Already have an account?<Link to="/login">Login</Link></p>
                        </div>

                    </Col>
                </Row>

            </Container>
        </>
    )
}