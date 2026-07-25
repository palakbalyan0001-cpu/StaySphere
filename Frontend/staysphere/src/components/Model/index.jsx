import { Modal ,Button} from "react-bootstrap"
import { Formdata } from "../Form"

export const Model=(props)=>{

    return(
        <>
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial', }}
            >
            <Modal.Dialog >
                <Modal.Header className="bg-dark text-warning" closeButton closeVariant="white" onHide={()=>{props.modalsetter(false)}}>
                <Modal.Title>Add Rooms</Modal.Title>
                </Modal.Header>
                <Formdata  fields={props.roomfields} modalsetter={props.modalsetter} 
                text="Add room" Submit={props.handleroom} initialstate={props.initialState} validationSchema={props.validationSchema} />
            </Modal.Dialog>
        </div>
        </>
    )
}