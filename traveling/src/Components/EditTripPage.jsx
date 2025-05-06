import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Spinner,
  Alert,
  Image,
} from "react-bootstrap";

const EditTripPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tripData, setTripData] = useState({
    id: "",
    destination: "",
    description: "",
    price: "",
    image: null,
    imagePreview: null,
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(`https://localhost:7200/api/trip/${id}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Errore nel recupero del viaggio.");
        const data = await response.json();
        setTripData({
          id: data.id,
          destination: data.destination,
          description: data.description,
          price: data.price,
          image: null,
          imagePreview: data.imageUrl || null,
        });
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTripData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (tripData.description.length > 5000) {
      setErrorMsg("La descrizione non può superare i 5000 caratteri.");
      return;
    }

    const formData = new FormData();
    formData.append("Id", tripData.id);
    formData.append("Destination", tripData.destination);
    formData.append("Description", tripData.description);
    formData.append("Price", tripData.price.toString());
    if (tripData.image) {
      formData.append("Image", tripData.image);
    }

    try {
      const response = await fetch("https://localhost:7200/api/trip", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Errore durante l'aggiornamento.");
      }

      setSuccessMsg("Viaggio aggiornato con successo.");
      setTimeout(() => navigate(`/trips/${tripData.id}`), 1500);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Modifica Viaggio</h2>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="destination" className="mb-3">
          <Form.Label>Destinazione</Form.Label>
          <Form.Control
            type="text"
            name="destination"
            value={tripData.destination}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={4}
            value={tripData.description}
            onChange={handleChange}
            required
          />
          <Form.Text muted>
            {tripData.description.length}/5000 caratteri
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Prezzo (€)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="price"
            value={tripData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Immagine</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {tripData.imagePreview && (
            <Image
              src={tripData.imagePreview}
              alt="Anteprima"
              thumbnail
              className="mt-2"
              style={{ maxHeight: "200px" }}
            />
          )}
        </Form.Group>

        <Button type="submit" variant="primary">
          Salva modifiche
        </Button>
      </Form>
    </Container>
  );
};

export default EditTripPage;
