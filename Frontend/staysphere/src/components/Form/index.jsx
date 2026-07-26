import { useFormik } from "formik";
import {
  Form,
  Row,
  Col,
  Button,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";

export const Formdata = (props) => {
  const formik = useFormik({
    initialValues: props.initialstate,
    validationSchema: props.validationSchema,
    onSubmit: (values) => {
        if (props.isMultipart) {
          const formData = new FormData();

          Object.keys(values).forEach((key) => {
            if (key === "RoomImages") {
              values.RoomImages.forEach((file) => {
                formData.append("RoomImages", file);
              });
            } else {
              formData.append(key, values[key]);
            }
          });

          props.Submit(formData, formik);
        } else {
          props.Submit(values, formik);
        }
      }
    });

  const renderform = (field) => {
    switch (field.type) {
      case "select":
        return (
          <>
            <FormGroup className="mb-3">
              <FormLabel className="text-white">
                {field.placeholder}
              </FormLabel>

              <Form.Select
                name={field.name}
                {...formik.getFieldProps(field.name)}
              >
                <option value="">{field.placeholder}</option>

                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>

              {formik.touched[field.name] && formik.errors[field.name] && (
                <Form.Text className="text-danger">
                  {formik.errors[field.name]}
                </Form.Text>
              )}
            </FormGroup>
          </>
        );

      case "textarea":
        return (
          <>
            <FormGroup className="mb-3">
              <FormLabel className="text-white">
                {field.placeholder}
              </FormLabel>

              <Form.Control
                as="textarea"
                rows={4}
                name={field.name}
                placeholder={field.placeholder}
                {...formik.getFieldProps(field.name)}
              />

              {formik.touched[field.name] && formik.errors[field.name] && (
                <Form.Text className="text-danger">
                  {formik.errors[field.name]}
                </Form.Text>
              )}
            </FormGroup>
          </>
        );

        case "file":
          return (
          <>
            <Form.Group className="mb-3">
              <FormLabel className="text-white">
                {field.name}
              </FormLabel>

              <Form.Control
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                multiple
                onChange={(e)=>{
                  formik.setFieldValue(field.name,Array.from(e.target.files))
                }}
              />

              {formik.touched[field.name] && formik.errors[field.name] && (
                <Form.Text className="text-danger">
                  {formik.errors[field.name]}
                </Form.Text>
              )}
            </Form.Group>
          </>
        );

      default:
        return (
          <>
            <Form.Group className="mb-3">
              <FormLabel className="text-white">
                {field.placeholder}
              </FormLabel>

              <Form.Control
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                {...formik.getFieldProps(field.name)}
              />

              {formik.touched[field.name] && formik.errors[field.name] && (
                <Form.Text className="text-danger">
                  {formik.errors[field.name]}
                </Form.Text>
              )}
            </Form.Group>
          </>
        );
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit} style={{backgroundColor:"#09111B"}}>
      <Row className="p-3">
        {props.fields.map((field) => (
          <Col lg={field.col} md={6} sm={12} key={field.name} >
            {renderform(field)}
          </Col>
        ))}
      </Row>

        {props.text=="Add Room"||props.text=="Update Room"?<Modal.Footer  className="bg-dark text-warning">
          <Button
            variant="secondary"
            onClick={() => props.modalsetter(false)}
          >
            Close
          </Button>

          <Button type="submit" variant="outline-warning">
            {props.text}
          </Button>
        </Modal.Footer>:<Button type="submit" variant="outline-warning" className="w-100">
            {props.text}
          </Button>}
    </Form>
  );
};