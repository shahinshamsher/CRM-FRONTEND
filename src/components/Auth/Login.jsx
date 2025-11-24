import { useState, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import API from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token, res.data.user);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>CRM Helpdesk Login</h2>

        <Form onSubmit={submit}>
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

          <Button
            type="submit"
            className="w-100 mt-2"
            variant="light"
            style={{ fontWeight: "600" }}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

