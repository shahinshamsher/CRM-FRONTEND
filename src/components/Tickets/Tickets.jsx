import { useEffect, useState, useContext } from "react";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Tickets() {
  const { me } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  const navigate = useNavigate(); // ✅ YOU MISSED THIS

  const load = async () => {
    const res = await API.get("/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container>
      <h2 className="mb-3">My Tickets</h2>

      {/* USER can raise ticket */}
      {me?.role === "user" && (
        <Button
          className="mb-3"
          onClick={() => navigate("/tickets/create")}
        >
          Raise Ticket
        </Button>
      )}

      <Table bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Assigned To</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.status}</td>
              <td>{t.assignedTo?.name || "Not Assigned"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
