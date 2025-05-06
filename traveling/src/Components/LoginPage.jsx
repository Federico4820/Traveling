import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch("https://localhost:7200/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Errore durante il login.");
      }

      // Recupera i dati utente dopo login
      const userRes = await fetch("https://localhost:7200/api/account/me", {
        credentials: "include",
      });

      if (!userRes.ok) throw new Error("Errore nel recupero dei dati utente.");

      const userData = await userRes.json();
      setUser(userData);
      navigate("/");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "57vh" }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "30px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-center mb-4">Accedi</h2>

        {errorMsg && (
          <Alert variant="danger" className="text-center">
            {errorMsg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="nome@example.com"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Inserisci la password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Accedi
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;
