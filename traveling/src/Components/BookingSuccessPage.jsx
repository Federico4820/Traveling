import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CheckCircleFill } from "react-bootstrap-icons";

const BookingSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card
        className="p-4 text-center shadow"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <CheckCircleFill
          color="green"
          size={70}
          className="mb-3 align-self-center"
        />
        <h2 className="mb-3">Prenotazione completata!</h2>
        <p className="text-muted">
          Grazie per aver prenotato con noi. Hai appena fatto il primo passo
          verso un'esperienza indimenticabile.
        </p>
        <p className="fst-italic">
          Prepara le valigie... l'avventura ti aspetta! ✈️
        </p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Torna alla Home
        </Button>
      </Card>
    </Container>
  );
};

export default BookingSuccessPage;
