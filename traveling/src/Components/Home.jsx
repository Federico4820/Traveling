import React from "react";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";
import { useAuth } from "./AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <Container className="mt-4 pt-0 home-container">
      {user && (
        <div className="text-center my-4">
          <h1 className="color-animated">Benvenuto, {user.firstName}!</h1>
        </div>
      )}

      <Carousel className="mb-5">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://scontent.ccdn.cloud/image/vivitravels-it/1e5984b8-c0a5-4ebe-b534-44d8d9aa67af/maxw-960.jpg"
            alt="Spiaggia tropicale"
          />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>Spiagge da Sogno</h3>
            <p className=" text-dark">Rilassati al sole in paradisi esotici.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://news.airbnb.com/wp-content/uploads/sites/4/2023/10/Airbnb_Winter-Travel-Trends_HERO.jpeg?fit=2049%2C1537"
            alt="Montagna innevata"
          />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>Inverni Epici</h3>
            <p className=" text-dark">Scia sulle vette più spettacolari.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://strapi-imaginary.weroad.it/resource/cover/22650/viaggio-di-gruppo-azzorre-canyoning-weroad.jpg"
            alt="Safari avventura"
          />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>Avventure Selvagge</h3>
            <p className=" text-dark">Esplora la natura incontaminata.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Row className="mb-5">
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h1>Benvenuti in Traveling Company</h1>
          <p>
            Siamo specializzati nell'offrire esperienze di viaggio
            indimenticabili verso le destinazioni più belle del mondo. Dalle
            spiagge caraibiche ai paesaggi innevati, il nostro obiettivo è
            rendere ogni viaggio unico e su misura per te.
          </p>
        </Col>
        <Col md={6}>
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Spiaggia tropicale"
            fluid
            rounded
          />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6}>
          <Image
            src="https://static2-viaggi.corriereobjects.it/wp-content/uploads/2016/12/AQUA-DOME_Anlage-Gesamt_Winter_CTS_563026342_CTS-CM1-1024x6811.jpg?v=1514465569"
            alt="Montagna innevata"
            fluid
            rounded
          />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2>Viaggi per ogni stagione</h2>
          <p>
            Che tu voglia sciare sulle Alpi, esplorare città europee o
            rilassarti in una villa estiva, i nostri pacchetti ti offrono una
            vasta gamma di soluzioni per ogni stagione dell'anno.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2>Offerte personalizzate</h2>
          <p>
            Con Traveling Company puoi scegliere tra viaggi di lusso, avventure
            estreme, crociere romantiche o vacanze in famiglia. Il nostro team
            di esperti lavora con te per costruire il viaggio perfetto secondo i
            tuoi desideri e il tuo budget.
          </p>
        </Col>
        <Col md={6}>
          <Image
            src="https://www.mollaretutto.com/wp-content/uploads/2016/04/romantic-cruising1-620x400.jpg"
            alt="Viaggio romantico"
            fluid
            rounded
          />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6}>
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
            alt="Safari avventura"
            fluid
            rounded
          />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2>Avventure in ogni angolo del mondo</h2>
          <p>
            Dalle foreste africane alle città asiatiche, ti portiamo ovunque tu
            voglia andare. Ogni destinazione è selezionata con cura per offrirti
            emozioni autentiche e sicure.
          </p>
        </Col>
      </Row>

      {!user && (
        <div
          className="text-center mt-5 p-3"
          style={{
            backgroundColor: "#fff3cd",
            color: "#856404",
            borderRadius: "5px",
          }}
        >
          <strong>Accedi o registrati</strong> per visualizzare e prenotare i
          tuoi viaggi!
        </div>
      )}
    </Container>
  );
};

export default Home;
