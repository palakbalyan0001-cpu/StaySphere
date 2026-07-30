import { NavLink, Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export const DashboardLayout = ({ links }) => {
  return (
    <Container fluid className="px-0">
  <Row className="g-0">
    <Col
      xs="auto"
      className="bg-dark border-top border-warning"
      style={{ width: "200px", minHeight: "100vh" }}
    >
      <div className="p-3">
        <div className="d-flex flex-column gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none ${
                  isActive
                    ? "bg-warning text-dark"
                    : "border border-warning text-warning"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </Col>

    <Col className="p-3">
      <Outlet />
    </Col>
  </Row>
</Container>
  );
};