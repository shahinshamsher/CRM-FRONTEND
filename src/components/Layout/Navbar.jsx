import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import "../../styles/navbar.css";

export default function AppNavbar() {
  const { me, logout } = useContext(AuthContext);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  // Toggle Dark Mode
  const toggleDark = () => {
    setDark(!dark);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <Navbar expand="lg" className="mb-4 navbar-modern">
      <Container>
        {/* Brand Logo + Title */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <div className="brand-icon">💼</div>
          CRM Helpdesk
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="me-auto">
            {/* Home - visible to all */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            {/* USER & AGENT ONLY → Tickets */}
            {me && (me.role === "user" || me.role === "agent") && (
              <Nav.Link as={Link} to="/tickets">Tickets</Nav.Link>
            )}

            {/* ADMIN ONLY */}
            {me?.role === "admin" && (
              <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
            )}

            {/* AGENT ONLY */}
            {me?.role === "agent" && (
              <Nav.Link as={Link} to="/agent">Agent Dashboard</Nav.Link>
            )}
          </Nav>

          {/* Right Section */}
          <Nav>
            {/* Dark Mode Toggle */}
            <Button className="dark-toggle me-3" onClick={toggleDark}>
              {dark ? "☀ Light" : "🌙 Dark"}
            </Button>

            {/* If NOT LOGGED IN */}
            {!me ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : (
              <>
                {/* Profile Avatar */}
                <div className="profile-avatar">
                  {me.name.charAt(0).toUpperCase()}
                </div>

                {/* Logout */}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

