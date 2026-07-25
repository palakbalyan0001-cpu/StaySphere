import { useEffect,useState } from "react";
import { Navbarr } from "../../../components/Nav";
import { Cards } from "../../../components/Cards";
import { getrooms } from "../../../API/rooms";
import Footer from "../../../components/Footer/Footer";

import { Col, Container, FormControl, FormGroup, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export function Rooms(){
    const [data,setdata]=useState([])
    const [search,setsearch]=useState("")
    const [show,setshow]=useState([])
    const [toggle,settoggle]=useState(false)
    const handlesearch=(event)=>{
        console.log(event.target.value)
        setsearch(event.target.value)
    }
    const handletoggle=()=>{
        settoggle(!toggle)
    }
    useEffect(()=>{
        async function fetch(){
            try{
                const result=await getrooms()
                console.log("result",result)
                setdata(result.data)
            }
            catch(error){
                console.log()
            }
        }
        fetch()
    },[])

    useEffect(()=>{
        async function fetch(){
            try{
                const res=data.filter(detail=>{
                    return Object.values(detail).some(item=>{
                        return (typeof(item)==="string"?item.toLowerCase():item.toString()).includes(search.toLowerCase())
                    })
                })
                console.log(res)
                setshow(res);
            }
            catch(error){
                console.log()
            }
        }
        fetch()
    },[toggle])

    return(
        <>
        <Container className="my-4 mx-4" fluid >
            <Row>
                <Col>
                <FormGroup>
                    <FormControl
                    type="text" value={search} onChange={handlesearch} placeholder="Search..."></FormControl>
                </FormGroup>
                </Col>
                <Col><FaSearch onClick={handletoggle}/>
                </Col>
            </Row>
        </Container>
        {console.log(show)}
        {search === "" ? (
            <Cards data={data} />
        ) : show.length > 0 ? (
            <Cards data={show} />
        ) : (
            <h4 className="text-center mt-4">No Rooms Found</h4>
        )}
        </>
    )
}