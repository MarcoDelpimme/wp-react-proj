import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const baseApiUrl = "http://localhost/wp-first/wp-json/wp/v2";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${baseApiUrl}/posts?page=${currentPage}`)
      .then((res) => {
        setLastPage(parseInt(res.headers.get("X-WP-TotalPages")));
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, [currentPage]);

  return (
    <>
      <Container>
        <h1>Benvenuto nel Blog</h1>
        <Row className="justify-content-center gap-3">
          {posts.map((post) => (
            <Card className="p-3 bg-white" key={post.id} style={{ width: "18rem" }}>
              {post.yoast_head_json.og_image[0] && (
                <Card.Img variant="top" src={post.yoast_head_json.og_image[0].url} />
              )}
              <Card.Body>
                <Link to={`/posts/${post.id}`}>
                  <Card.Title>{post.title.rendered}</Card.Title>
                </Link>
                <Link to={`/posts/${post.id}`}>
                  <Button variant="primary">Leggi di più</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Blog;
