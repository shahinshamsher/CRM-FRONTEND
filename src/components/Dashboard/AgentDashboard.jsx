import { useEffect, useState } from "react";
import API from "../../api/api";
import { Container, Table, Button } from "react-bootstrap";

export default function AgentDashboard() {
  const [tickets, setTickets] = useState([]);

  const load = async () => {
    const res = await API.get("/tickets");
    setTickets(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.post(`/tickets/${id}/status`, { status });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container>
      <h2>Assigned Tickets</h2>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {tickets.map(t => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.status}</td>
              <td>{t.priority}</td>
              <td>
                <Button 
                  size="sm" 
                  onClick={() => updateStatus(t._id, "in_progress")}
                >
                  In Progress
                </Button>{" "}
                <Button 
                  size="sm" 
                  onClick={() => updateStatus(t._id, "resolved")}
                  variant="success"
                >
                  Resolved
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
