import { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import API from "../../api/api";
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const load = async () => {
    const res = await API.get("/users/stats");
    setStats(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  if (!stats) return <Container>Loading...</Container>;

  const pieData = [
    { name: "Open", value: stats.open },
    { name: "Resolved", value: stats.resolved },
  ];

  const barData = stats.perAgent?.map((a) => ({
    name: a._id.substring(0, 6),
    value: a.count,
  }));

  return (
    <Container>
      <h2 className="mb-3">CRM Helpdesk - Admin Dashboard</h2>

      <Row>
        <Col>
          <Card className="p-3">
            <h5>Total Tickets</h5>
            <h2>{stats.total}</h2>
          </Card>
        </Col>
        <Col>
          <Card className="p-3">
            <h5>Open</h5>
            <h2>{stats.open}</h2>
          </Card>
        </Col>
        <Col>
          <Card className="p-3">
            <h5>Resolved</h5>
            <h2>{stats.resolved}</h2>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="p-3">
            <h6>Status Overview</h6>
            <PieChart width={300} height={250}>
              <Pie dataKey="value" data={pieData} fill="#8884d8" label />
              <Tooltip />
            </PieChart>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3">
            <h6>Tickets per Agent</h6>
            <BarChart width={350} height={250} data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
