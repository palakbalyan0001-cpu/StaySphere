import { Modal ,Button} from "react-bootstrap"
import { Formdata } from "../Form"

export const Model=(props)=>{

    return(
        <>
            <Modal  show={true}
            onHide={() => props.modalsetter(false)}
            centered
            backdrop="static">
                <Modal.Header className="bg-dark text-warning" closeButton closeVariant="white" onHide={()=>{props.modalsetter(false)}}>
                <Modal.Title>Add Rooms</Modal.Title>
                </Modal.Header>
                <Formdata  fields={props.roomfields} modalsetter={props.modalsetter} 
                text={props.text} Submit={props.handleroom} initialstate={props.initialState} validationSchema={props.validationSchema} />
            </Modal>
        </>
    )
}