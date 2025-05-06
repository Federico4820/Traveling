import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Spinner,
  Alert,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useAuth } from "./AuthContext";

const TripDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(`https://localhost:7200/api/trip/${id}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Viaggio non trovato");
        const data = await response.json();
        setTrip(data);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingMessage("");

    try {
      const bookingData = {
        tripId: trip.id,
        bookingDate: new Date().toISOString(),
        numberOfPeople: parseInt(numberOfPeople),
      };

      const response = await fetch("https://localhost:7200/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Errore durante la prenotazione.");
      }

      navigate("/booking-success");
    } catch (err) {
      setBookingMessage(`Errore: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Sei sicuro di voler cancellare questo viaggio?"))
      return;

    try {
      const response = await fetch(`https://localhost:7200/api/trip/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Errore durante l'eliminazione.");
      }

      navigate("/trips");
    } catch (err) {
      alert(`Errore: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (errorMsg) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{errorMsg}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Image
            src={
              trip.imageUrl ||
              "https://via.placeholder.com/600x300?text=Immagine+non+disponibile"
            }
            alt={trip.destination}
            fluid
            style={{
              objectFit: "cover",
              width: "100%",
              height: "250px",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          />
        </Col>
        <Col md={8}>
          <h2>{trip.destination}</h2>
          <p>
            <strong>Prezzo:</strong> €{trip.price.toFixed(2)}
          </p>

          {user && user.roles.includes("Admin") && (
            <div className="mb-3">
              <Button
                variant="warning"
                className="me-2"
                onClick={() => navigate(`/edit-trip/${trip.id}`)}
              >
                Modifica
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Cancella
              </Button>
            </div>
          )}

          {user ? (
            <Form onSubmit={handleBooking}>
              <Form.Group className="mb-3">
                <Form.Label>Numero di persone</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Prenota
              </Button>
            </Form>
          ) : (
            <Alert variant="warning" className="mt-3">
              Effettua il <strong>login</strong> per prenotare questo viaggio.
            </Alert>
          )}

          {bookingMessage && (
            <Alert
              className="mt-3"
              variant={
                bookingMessage.includes("successo") ? "success" : "danger"
              }
            >
              {bookingMessage}
            </Alert>
          )}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h4>Descrizione</h4>
          <Card className="description-card">
            <Card.Body>
              <Card.Text>{trip.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TripDetailsPage;
