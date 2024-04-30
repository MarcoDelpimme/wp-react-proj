import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const baseApiUrl = "http://localhost/wp-first/wp-json/wp/v2";

const Home = () => {
  const [postImages, setPostImages] = useState([]);
  const [dummyArticles, setDummyArticles] = useState([]);

  useEffect(() => {
    fetch(`${baseApiUrl}/posts`)
      .then((res) => res.json())
      .then(async (data) => {
        const images = await Promise.all(
          data.map(async (post) => {
            if (post.featured_media) {
              const response = await fetch(`${baseApiUrl}/media/${post.featured_media}`);
              const imageData = await response.json();
              return imageData.source_url;
            }
            return null;
          })
        );
        setPostImages(images.filter((image) => image));
      });

    const dummyArticlesArray = [];
    for (let i = 1; i <= 8; i++) {
      dummyArticlesArray.push({ id: i, title: `Articolo ${i}`, content: `Contenuto dell'articolo ${i}` });
    }
    setDummyArticles(dummyArticlesArray);
  }, []);

  return (
    <div>
      <h1 className="text-center display-5 fw-bold my-5">Benvenuto sulla mia Homepage!</h1>
      <Container>
        <Carousel>
          {postImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${index}`}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h3>Post {index + 1}</h3>
                <p>Descrizione del post {index + 1}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <div className="container mt-5">
        <Row>
          <Col md={6}>
            <h2>LOREM IPSUM OKAY LETZGO</h2>
            {dummyArticles.slice(0, 4).map((article) => (
              <Card key={article.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.content}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col md={6}>
            <h2>LOREM IPSUM OKAY LETZGO</h2>
            {dummyArticles.slice(4, 8).map((article) => (
              <Card key={article.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.content}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
        <div>
          <Link id="aBlog" to="/blog" className="ms-auto">
            <p>
              Per saperne di piu visita il nostro <Button variant="primary">Blog</Button>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
