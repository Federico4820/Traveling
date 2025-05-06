import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const PagError = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Row>
        <Col>
          <Alert variant="warning" className="text-center">
            <h4>Pagina non trovata</h4>
            <p>
              La pagina che stai cercando potrebbe essere stata rimossa,
              cambiata oppure non è disponibile al momento. <br />
              Ti invitiamo a tornare alla <Link to="/">Home</Link> per
              continuare la navigazione.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default PagError;
