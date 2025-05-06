import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const MyFooter = () => {
  return (
    <footer className="footer">
      <Container className=" pt-3 pb-3">
        <Row className="text-center">
          <Col md={4}>
            <h5>Follow Us</h5>
            <div className="social-links">
              <a href="javascript:void(0)">Facebook</a>
              <a href="javascript:void(0)">Instagram</a>
              <a href="javascript:void(0)">Twitter</a>
            </div>
          </Col>

          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Phone: +123 456 7890</p>
            <p>Email: contact@travelagency.com</p>
          </Col>

          <Col md={4}>
            <h5>Language</h5>
            <Form.Select
              aria-label="Language selection"
              className="language-select"
            >
              <option>Italiano</option>
              <option>English</option>
              <option>Español</option>
              <option>Deutsch</option>
            </Form.Select>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <p className="copyright">
              © 2025 Traveling Agency. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
