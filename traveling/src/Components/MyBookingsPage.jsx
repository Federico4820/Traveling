import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await fetch("https://localhost:7200/api/booking/user", {
        credentials: "include",
      });
      if (!response.ok)
        throw new Error("Errore durante il caricamento delle prenotazioni");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Sei sicuro di voler cancellare questa prenotazione?"))
      return;

    try {
      const response = await fetch(
        `https://localhost:7200/api/booking/${bookingId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok)
        throw new Error("Errore durante l'eliminazione della prenotazione");

      setBookings(bookings.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Le Mie Prenotazioni</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-center">Non hai ancora effettuato prenotazioni.</p>
      ) : (
        <Row>
          {bookings.map((booking) => (
            <Col key={booking.id} md={12} className="mb-4">
              <Card className="booking-card">
                <Row className="mb-2">
                  <Col>
                    <h4 className="trip-destination">
                      {booking.tripDestination}
                    </h4>
                  </Col>
                </Row>
                <Row className="mb-1 text-center mb-5">
                  <Col md={4}>
                    <div className="booking-info-box">
                      <strong>Nome:</strong> {booking.userFullName}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="booking-info-box">
                      <strong>Data prenotazione:</strong>{" "}
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="booking-info-box">
                      <strong>Numero di persone:</strong>{" "}
                      {booking.numberOfPeople}
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3 text-center">
                  <Col md={6}>
                    <div className="booking-info-box">
                      <strong>Prezzo per persona:</strong> €
                      {booking.tripPrice.toFixed(2)}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="booking-info-box">
                      <strong>Prezzo totale:</strong> €
                      {booking.totalPrice.toFixed(2)}
                    </div>
                  </Col>
                </Row>
                <Row className="mb-1">
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Cancella
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyBookingsPage;
