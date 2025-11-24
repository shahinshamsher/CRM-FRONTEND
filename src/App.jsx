import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Tickets from "./components/Tickets/Tickets";
import CreateTicket from "./components/Tickets/CreateTicket";
import AdminTickets from "./components/Admin/AdminTickets";
import AgentDashboard from "./components/Dashboard/AgentDashboard";
import PrivateRoute from "./components/Layout/PrivateRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER & AGENT SEE ONLY THEIR TICKETS */}
        <Route
          path="/tickets"
          element={
            <PrivateRoute roles={["user", "agent"]}>
              <Tickets />
            </PrivateRoute>
          }
        />

        {/* USER CAN CREATE TICKET */}
        <Route
          path="/tickets/create"
          element={
            <PrivateRoute roles={["user"]}>
              <CreateTicket />
            </PrivateRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminTickets />
            </PrivateRoute>
          }
        />

        {/* AGENT DASHBOARD */}
        <Route
          path="/agent"
          element={
            <PrivateRoute roles={["agent"]}>
              <AgentDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
