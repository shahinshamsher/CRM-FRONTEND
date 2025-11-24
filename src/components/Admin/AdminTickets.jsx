// src/components/Admin/AdminTickets.jsx
import React, { useEffect, useState } from "react";
import API from "../../api/api";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState({});
  const [loading, setLoading] = useState(false);
  const [agentsLoading, setAgentsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all / unassigned / open / resolved

  // Load tickets from backend with optional query & filter
  const loadTickets = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.q = search;
      // we let backend return all tickets for admin; filter client-side for quick UX
      const res = await API.get("/tickets", { params });
      let data = res.data || [];

      // client-side filtering options
      if (filter === "unassigned") {
        data = data.filter((t) => !t.assignedTo);
      } else if (filter === "open") {
        data = data.filter((t) => t.status === "open");
      } else if (filter === "resolved") {
        data = data.filter((t) => t.status === "resolved");
      }

      setTickets(data);
    } catch (err) {
      console.error("Load tickets error", err);
      toast.error(err?.response?.data?.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  // Load agents list
  const loadAgents = async () => {
    try {
      setAgentsLoading(true);
      const res = await API.get("/users/agents");
      setAgents(res.data || []);
    } catch (err) {
      console.error("Load agents error", err);
      toast.error(err?.response?.data?.message || "Failed to load agents");
    } finally {
      setAgentsLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
    loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Assign agent to a ticket
  const assignAgent = async (ticketId) => {
    const agentId = selectedAgent[ticketId];
    if (!agentId) {
      toast.warning("Please select an agent first");
      return;
    }

    try {
      await API.post(`/tickets/${ticketId}/assign`, { agentId });
      toast.success("Agent assigned successfully");
      // refresh tickets to reflect changes
      await loadTickets();
    } catch (err) {
      console.error("Assign error", err);
      toast.error(err?.response?.data?.message || "Failed to assign agent");
    }
  };

  // convenience to set selected agent for a ticket
  const handleSelectChange = (ticketId, value) => {
    setSelectedAgent((s) => ({ ...s, [ticketId]: value }));
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col xs={12} md={6}>
          <h3 className="mb-0">Admin — Manage Tickets</h3>
          <div className="text-muted">Assign agents, filter and search tickets</div>
        </Col>

        <Col xs={12} md={6}>
          <Row className="g-2">
            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Search tickets by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  variant="primary"
                  onClick={loadTickets}
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Search"}
                </Button>
              </InputGroup>
            </Col>

            <Col xs="auto">
              <Form.Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="unassigned">Unassigned</option>
                <option value="open">Open</option>
                <option value="resolved">Resolved</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Created By</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th style={{ minWidth: 280 }}>Assign Agent</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  No tickets found
                </td>
              </tr>
            )}

            {tickets.map((t, idx) => (
              <tr key={t._id}>
                <td>{idx + 1}</td>
                <td>{t.title}</td>
                <td>{t.createdBy?.name || "—"}</td>
                <td style={{ textTransform: "capitalize" }}>{t.priority}</td>
                <td style={{ textTransform: "capitalize" }}>{t.status}</td>
                <td>{t.assignedTo?.name || "Not assigned"}</td>

                <td>
                  <div className="d-flex align-items-center">
                    <Form.Select
                      value={selectedAgent[t._id] || ""}
                      onChange={(e) => handleSelectChange(t._id, e.target.value)}
                      disabled={agentsLoading}
                      style={{ width: 220 }}
                    >
                      <option value="">Select agent...</option>
                      {agents.map((a) => (
                        <option key={a._id} value={a._id}>
                          {a.name} — {a.email}
                        </option>
                      ))}
                    </Form.Select>

                    <Button
                      size="sm"
                      className="ms-2"
                      onClick={() => assignAgent(t._id)}
                    >
                      Assign
                    </Button>

                    {/* Quick unassign button */}
                    {t.assignedTo && (
                      <Button
                        size="sm"
                        variant="outline-danger"
                        className="ms-2"
                        onClick={async () => {
                          try {
                            await API.post(`/tickets/${t._id}/assign`, {
                              agentId: null,
                            });
                            toast.success("Agent unassigned");
                            loadTickets();
                          } catch (err) {
                            toast.error("Failed to unassign");
                          }
                        }}
                      >
                        Unassign
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
