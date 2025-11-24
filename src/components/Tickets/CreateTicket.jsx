import { useState } from "react";
import API from "../../api/api";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const navigate = useNavigate();

  const submitTicket = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tickets", {
        title,
        description,
        priority,
      });

      toast.success("Ticket created successfully");
      navigate("/tickets");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create ticket");
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-3">Raise a New Ticket</h3>

      <Form onSubmit={submitTicket}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="Enter ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Describe your issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Priority</Form.Label>
          <Form.Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="mt-3">
          Submit Ticket
        </Button>
      </Form>
    </Container>
  );
}

