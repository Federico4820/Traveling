import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const MyNavbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("https://localhost:7200/api/account/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" className="my-navbar sticky-top">
      <Container className="pt-2 pb-2">
        <Navbar.Brand as={NavLink} to="/">
          <img
            src="https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/pink-and-blue-travel-agency-logo-design-template-uvghvha3fa66fc.webp"
            width="50"
            height="50"
            className="d-inline-block align-middle"
            alt="Logo TravelApp"
          />{" "}
          TravelApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/trips">
              Viaggi
            </Nav.Link>
            {user && (
              <Nav.Link as={NavLink} to="/bookings">
                Le mie prenotazioni
              </Nav.Link>
            )}
            {user?.roles?.includes("Admin") && (
              <Nav.Link as={NavLink} to="/admin/bookings">
                Gestione prenotazioni
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {!user ? (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Registrati
                </Nav.Link>
              </>
            ) : (
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
