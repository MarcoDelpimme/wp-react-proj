import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="mt-5 py-3 bg-dark text-light text-center">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Informazioni</h5>
            <p>Questo è il footer del sito. Puoi inserire qui le informazioni aggiuntive che desideri condividere.</p>
          </Col>
          <Col md={6}>
            <h5>Contatti</h5>
            <ul className="list-unstyled">
              <li>Indirizzo: Via delle Idee, 123</li>
              <li>Telefono: 0123-456789</li>
              <li>Email: info@example.com</li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 Nome del Tuo Sito. Tutti i diritti riservati.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
