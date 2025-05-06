import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Spinner,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreateTripPage = () => {
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Controllo lunghezza descrizione
    if (description.length > 5000) {
      setErrorMsg("La descrizione non può superare i 5000 caratteri.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("Destination", destination);
    formData.append("Description", description);
    formData.append("Price", price.replace(",", "."));
    if (image) formData.append("Image", image);

    try {
      const response = await fetch("https://localhost:7200/api/trip", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Errore nella creazione del viaggio.");
      }

      setSuccessMsg("Viaggio creato con successo!");
      setTimeout(() => navigate("/trips"), 1500);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{ maxWidth: "600px", marginTop: "80px", marginBottom: "80px" }}
    >
      <h2 className="mb-4 text-center">Crea Nuovo Viaggio</h2>

      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Form onSubmit={handleCreate}>
        <Form.Group className="mb-3">
          <Form.Label>Destinazione</Form.Label>
          <Form.Control
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Form.Text muted>{description.length}/5000 caratteri</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Prezzo (€)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Immagine (opzionale)</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

        {imagePreview && (
          <div className="mb-4 text-center">
            <Image
              src={imagePreview}
              alt="Anteprima immagine"
              thumbnail
              style={{ maxHeight: "200px" }}
            />
          </div>
        )}

        <Button variant="success" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Crea Viaggio"}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTripPage;
