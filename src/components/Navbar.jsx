import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const MyNavBar = () => {
  return (
    <Nav
      className="bg-white p-1 d-flex justify-content-end fs-4"
      activeKey="/home"
      // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Container className="bg-white p-4 d-flex justify-content-end fs-4">
        <img className="me-auto" src="logo192.png" alt="" width={50} />

        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Blog" href="/blog">
            Blog
          </Nav.Link>
        </Nav.Item>
      </Container>
    </Nav>
  );
};

export default MyNavBar;
