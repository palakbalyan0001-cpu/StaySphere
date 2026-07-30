import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authslicer";
import { logoutapi } from "../../API/auth";

export function Navbarr() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handlelogout = async () => {
    try {
      await logoutapi();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="py-2"
      style={{ backgroundColor: "rgba(9, 17, 27, 1)" }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src="logo.png"
            alt="Logo"
            style={{ height: "50px", width: "180px" }}
            className="img-fluid"/>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav" className="font-display text-white py-2">
          {!user ? (
            <>
              <Nav className="ms-auto align-items-lg-center">
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>

                <Nav.Link as={Link} to="/rooms">
                  Rooms
                </Nav.Link>

                <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link>

                <Button
                  as={Link}
                  to="/register"
                  variant="outline-light"
                  className="ms-lg-3 mt-2 mt-lg-0"
                >
                  Register
                </Button>

                <Button
                  as={Link}
                  to="/login"
                  variant="outline-light"
                  className="ms-lg-2 mt-2 mt-lg-0"
                >
                  Login
                </Button>
              </Nav>
            </>
          ) : user.role === "User" ? (
            <>
              <Nav className="ms-auto align-items-lg-center">
                <Nav.Link as={Link} to="/user/home">
                  Home
                </Nav.Link>

                <Nav.Link as={Link} to="/user/rooms">
                  Rooms
                </Nav.Link>

                <Nav.Link as={Link} to="/user/mybooking">
                  My Booking
                </Nav.Link>

                <Button
                  variant="outline-warning"
                  className="ms-lg-3 mt-2 mt-lg-0"
                  onClick={handlelogout}
                >
                  Logout
                </Button>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="ms-auto align-items-lg-center">
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>

                <Nav.Link as={Link} to="/rooms">
                  Rooms
                </Nav.Link>

                <Nav.Link as={Link} to="/admin/panel">
                  Admin Panel
                </Nav.Link>

                <Button
                  variant="outline-warning"
                  className="ms-lg-3 mt-2 mt-lg-0"
                  onClick={handlelogout}
                >
                  Logout
                </Button>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}