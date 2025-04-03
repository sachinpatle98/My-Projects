import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./dashboard.css";
import { useIdleTimer } from "react-idle-timer";
import Footer from "../Footer/Footer";
import showAlert from "../utils/showAlert";
import Header from "../Header/Header";


const Dashboard = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");


  const onIdle = () => {
    showAlert("error", "Session expired!", "Redirecting to Home...");
    localStorage.removeItem("token");
    navigate("/project/1/auth/login");
  };

  // Initialize Idle Timer with 3 minutes timeout (180000ms)
  useIdleTimer({
    timeout: 180000,
    onIdle,
    debounce: 500,
  });


  useEffect(() => {
    if (!userToken) {
      navigate("/project/1/auth/login");
    }
  }, [userToken, navigate]);

  return (
    <Container fluid className="dashboard-container">
      {/* Header Section */}
      <Header />

      {/* Dashboard Content */}
      <Row className="mt-4">
        <Col md={4}>
          <Card className="shadow dashboard-card">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-4">120</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow dashboard-card">
            <Card.Body>
              <Card.Title>New Orders</Card.Title>
              <Card.Text className="display-4">45</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow dashboard-card">
            <Card.Body>
              <Card.Title>Revenue</Card.Title>
              <Card.Text className="display-4">$5,200</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Logout Button */}
      <Row className="mt-4 text-center">
        <Footer />
      </Row>
    </Container>
  );
};

export default Dashboard;
