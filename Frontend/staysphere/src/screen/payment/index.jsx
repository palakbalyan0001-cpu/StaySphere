import { Container, Row, Col, Card, Form, Button, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function Payment() {
  return (
    <Container fluid className="bg-dark min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card bg="black" text="light" border="warning">
              <Card.Header className="bg-warning text-dark">
                <h3 className="mb-0">💳 Secure Payment</h3>
              </Card.Header>

              <Card.Body>
                <Row className="g-4">
                  {/* Payment Form */}
                  <Col lg={7}>
                    <h5 className="text-warning mb-4">Payment Details</h5>

                    <Form>
                      <Row className="mb-4">
                        <Col md={4}>
                          <Form.Check
                            type="radio"
                            name="payment"
                            label="Card"
                            defaultChecked
                          />
                        </Col>

                        <Col md={4}>
                          <Form.Check
                            type="radio"
                            name="payment"
                            label="UPI"
                          />
                        </Col>

                        <Col md={4}>
                          <Form.Check
                            type="radio"
                            name="payment"
                            label="Cash"
                          />
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Card Holder</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="John Doe"
                          className="bg-dark text-light border-secondary"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="bg-dark text-light border-secondary"
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Expiry</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="MM/YY"
                              className="bg-dark text-light border-secondary"
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="***"
                              className="bg-dark text-light border-secondary"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        variant="warning"
                        className="w-100 fw-bold text-dark" as={Link} to="/user/mybooking"
                      >
                        Pay Now
                      </Button>
                    </Form>
                  </Col>

                  {/* Order Summary */}
                  <Col lg={5}>
                    <Card bg="dark" text="light" border="warning">
                      <Card.Header className="text-warning fw-bold">
                        Order Summary
                      </Card.Header>

                      <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Premium Plan</span>
                          <span>$40.00</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                          <span>Tax</span>
                          <span>$5.00</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                          <span>Discount</span>
                          <span className="text-success">-$5.00</span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between">
                          <h5>Total</h5>
                          <h4 className="text-warning">$40.00</h4>
                        </div>

                        <ListGroup className="mt-4">
                          <ListGroup.Item className="bg-dark text-light border-secondary">
                            ✅ Secure Checkout
                          </ListGroup.Item>

                          <ListGroup.Item className="bg-dark text-light border-secondary">
                            ⚡ Instant Confirmation
                          </ListGroup.Item>

                          <ListGroup.Item className="bg-dark text-light border-secondary">
                            🎧 24/7 Support
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}