import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import API from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create CRM Helpdesk Account</h2>

        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 mt-2"
            variant="light"
            style={{ fontWeight: "600" }}
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

