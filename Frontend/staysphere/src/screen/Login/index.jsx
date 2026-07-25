import { Col, Container ,Row} from "react-bootstrap"
import { Formdata } from "../../components/Form"
import { fields } from "../../data/Guest/fieldslogin"
import "../../styles/Register.css"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import * as yup from "yup"
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { logout ,login} from "../../features/authslicer"


export function Login(){
    // const [user,setuser]=useState({})
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const initialState={
            email:"",
            password:"",
        }
        const loginSchema=yup.object({
                email:yup.string().required("Enter your email").matches(/^[a-zA-Z\d]{3,}@gmail\.com$/,"Invalid email format"),
                password:yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        })

    const handleLogin=async(values,formik)=>{
        
        try{
            const res=await fetch("http://localhost:3000/home/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials: "include", 
                body:JSON.stringify(values),
            })
            
            const collect=await res.json();
            
            if(!collect.success){
                formik.setFieldError(collect.field,collect.message)
                return;
            }
            if(collect.success){
                dispatch(login(collect.token)) 
                if(collect.token.role==="User"){
                    navigate("/user");
                }else{
                    navigate("/admin");
                }
                
            }
            // setuser(collect.token)
            
        }
        catch(err){
            dispatch(logout())
            console.log(err)
        }
    }
    return(
        <>
        {/* {console.log(user)} */}

        {/* {user.role=="User"?<Navigate to="/customer/dashboard" replace></Navigate>
        :user.role=="Admin"?<Navigate to="/Admin/dashboard" replace></Navigate>:null} */}

        <Container fluid className="register-page">
                <Row className="register-box m-4">
                    <Col md={6} className="img p-0">
                        <img src="hotel_interior.png" alt="Hotel"/>
                    </Col>

                    <Col
                        md={6}
                        className="formdata d-flex justify-content-center align-items-center"
                    >
                        <div className="register-card p-4">
                            <Formdata fields={fields} text="Login" Submit={handleLogin} initialstate={initialState} validationSchema={loginSchema}/>
                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    )
}