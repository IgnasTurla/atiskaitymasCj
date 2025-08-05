import { Navbar as MyNavbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.scss";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <MyNavbar bg="light" expand="lg" className="main-navbar shadow-sm">
      <Container>
        <MyNavbar.Brand as={Link} to="/">Mano Parduotuvė</MyNavbar.Brand>
        <MyNavbar.Toggle aria-controls="basic-navbar-nav" />
        <MyNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/shop">Parduotuvė</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              🛒 Krepšelis ({totalItems})
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link disabled>👋 Labas, {user.name}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Atsijungti</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Prisijungti</Nav.Link>
                <Nav.Link as={Link} to="/register">Registruotis</Nav.Link>
              </>
            )}
          </Nav>
        </MyNavbar.Collapse>
      </Container>
    </MyNavbar>
  );
}
