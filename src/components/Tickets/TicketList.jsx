import { useEffect, useState } from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
import API from "../../api/api";
import { Link } from "react-router-dom";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [q, setQ] = useState("");

  const loadTickets = async () => {
    const res = await API.get("/tickets", { params: q ? { q } : {} });
    setTickets(res.data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <Container>
      <h2 className="mb-3">All Tickets</h2>

      <div className="d-flex mb-3">
        <Form.Control
          placeholder="Search tickets..."
          className="me-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button onClick={loadTickets}>Search</Button>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t, i) => (
            <tr key={t._id}>
              <td>{i + 1}</td>
              <td>{t.title}</td>
              <td>{t.status}</td>
              <td>{t.priority}</td>
              <td>{t.assignedTo?.name || "-"}</td>
              <td>
                <Link to={`/tickets/${t._id}`}>
                  <Button size="sm">View</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Link to="/create-ticket">
        <Button className="mt-3">+ Create Ticket</Button>
      </Link>
    </Container>
  );
}

