import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("https://localhost:7200/api/trip", {
          credentials: "include",
        });
        if (!response.ok)
          throw new Error("Errore durante il caricamento dei viaggi");
        const data = await response.json();
        setTrips(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const filteredTrips = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">I Nostri Viaggi</h2>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Cerca per destinazione..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      {user?.roles?.includes("Admin") && (
        <div className="mb-4 text-end">
          <Button variant="success" onClick={() => navigate("/create-trip")}>
            ➕ Crea nuovo viaggio
          </Button>
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : filteredTrips.length === 0 ? (
        <p className="text-center text-danger fw-bold">
          Nessun viaggio trovato.
        </p>
      ) : (
        <Row>
          {filteredTrips.map((trip) => (
            <Col key={trip.id} md={4} className="mb-4">
              <Link
                to={`/trips/${trip.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card className="h-100 card-hover fade-in-card">
                  <Card.Img
                    variant="top"
                    src={
                      trip.imageUrl ||
                      "https://via.placeholder.com/400x200?text=Immagine+non+disponibile"
                    }
                    alt={trip.destination}
                    className="card-img-top-rounded rounded-bottom-0"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title>{trip.destination}</Card.Title>
                    <Card.Text>
                      <strong>Prezzo:</strong> €{trip.price.toFixed(2)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default TripsPage;
