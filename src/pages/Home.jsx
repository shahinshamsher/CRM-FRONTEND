import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Container>
        {/* HERO SECTION */}
        <div className="home-hero">
          <h1 className="home-title">Welcome to CRM Helpdesk</h1>
          <p className="home-subtitle">
            A modern ticketing system designed to manage issues, assign agents,
            and keep your customers happy.
          </p>

          <Button
            className="home-btn"
            variant="light"
            onClick={() => navigate("/tickets")}
          >
            Get Started →
          </Button>
        </div>

        {/* FEATURES SECTION */}
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🎫</div>
            <h4>Manage Tickets Easily</h4>
            <p>
              Create, track and resolve support tickets with a clean dashboard.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h4>Agent Assignment</h4>
            <p>
              Admins can assign agents to handle issues efficiently.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h4>Admin Dashboard</h4>
            <p>
              View statistics, performance, and overall ticket health.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h4>Status Notifications</h4>
            <p>
              Users get updates when their ticket status changes.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
