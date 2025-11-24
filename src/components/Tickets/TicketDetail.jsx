import { useEffect, useState, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState("");
  const { me } = useContext(AuthContext);

  const load = async () => {
    const res = await API.get(`/tickets/${id}`);
    setTicket(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addComment = async () => {
    await API.post(`/tickets/${id}/comment`, { text: comment });
    toast.success("Comment added");
    setComment("");
    load();
  };

  const changeStatus = async (status) => {
    await API.post(`/tickets/${id}/status`, { status });
    toast.success("Status updated");
    load();
  };

  const withdraw = async () => {
    await API.post(`/tickets/${id}/withdraw`);
    toast.success("Ticket withdrawn");
    load();
  };

  if (!ticket) return <Container>Loading...</Container>;

  return (
    <Container>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <p>
        Status: <strong>{ticket.status}</strong>  
        <br />
        Assigned: {ticket.assignedTo?.name || "Not assigned"}
      </p>

      <hr />

      <h4>Add Comment</h4>
      <Form.Control
        as="textarea"
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button className="mt-2" onClick={addComment}>
        Add
      </Button>

      <hr />

      {me.role !== "user" && (
        <>
          <Button
            className="me-2"
            onClick={() => changeStatus("in_progress")}
          >
            Mark In Progress
          </Button>
          <Button className="me-2" onClick={() => changeStatus("resolved")}>
            Mark Resolved
          </Button>
        </>
      )}

      {me.id === ticket.createdBy._id && ticket.status !== "withdrawn" && (
        <Button variant="danger" onClick={withdraw}>
          Withdraw Ticket
        </Button>
      )}

      <hr />

      <h4>Comments</h4>
      {ticket.comments.map((c) => (
        <div key={c._id} className="border p-2 mb-2 rounded">
          <small>{new Date(c.createdAt).toLocaleString()}</small>
          <p>{c.text}</p>
        </div>
      ))}
    </Container>
  );
}
