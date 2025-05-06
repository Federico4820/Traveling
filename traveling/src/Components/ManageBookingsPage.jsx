import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "./AuthContext";

const ManageBookingsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes("Admin");

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await fetch("https://localhost:7200/api/booking", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Errore nel caricamento");
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert("Solo gli admin possono cancellare prenotazioni.");
      return;
    }

    if (!window.confirm("Vuoi cancellare questa prenotazione?")) return;

    try {
      const response = await fetch(`https://localhost:7200/api/booking/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Errore nella cancellazione");
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchBookings();
    } else {
      setLoading(false); // Stop spinner if not admin
    }
  }, [isAdmin]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Gestione Prenotazioni</h2>

      {!isAdmin ? (
        <Alert variant="danger" className="text-center fw-bold">
          ⚠️ Accesso negato: questa pagina è riservata esclusivamente agli
          amministratori. Torna subito indietro.
        </Alert>
      ) : loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-center">Nessuna prenotazione trovata.</p>
      ) : (
        <div className="folder-container">
          {bookings.map((booking) => (
            <div key={booking.id} className="folder-item">
              <div className="folder-label">{booking.tripDestination}</div>
              <div className="folder-info">
                <Row className="text-center mb-2">
                  <Col md={2}>
                    <strong>Utente:</strong> {booking.userFullName}
                  </Col>
                  <Col md={2}>
                    <strong>Data:</strong>{" "}
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </Col>
                  <Col md={2}>
                    <strong>Persone:</strong> {booking.numberOfPeople}
                  </Col>
                  <Col md={2}>
                    <strong>Prezzo unitario:</strong> €
                    {booking.tripPrice.toFixed(2)}
                  </Col>
                  <Col md={2}>
                    <strong>Totale:</strong> €{booking.totalPrice.toFixed(2)}
                  </Col>
                </Row>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Cancella come Admin
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default ManageBookingsPage;
