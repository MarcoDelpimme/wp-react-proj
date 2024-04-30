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
    fetch(`${baseApiUrl}/posts?page=${currentPage}&_embed=1`)
      .then((res) => {
        setLastPage(parseInt(res.headers.get("X-WP-TotalPages")));
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, [currentPage]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Container>
        <div className="d-flex align-items-baseline justify-content-center">
          <h1 className="my-4 display-3 fw-bold text-center ">Benvenuto nel Blog</h1>
          <Link to="/AddPost" className="ms-5 ">
            <Button className="btn-success ">Aggiungi Post</Button>
          </Link>
        </div>

        <Row className="justify-content-center gap-3">
          {posts.map((post) => (
            <Card className="p-3 bg-white" key={post.id} style={{ width: "18rem" }}>
              {post._embedded["wp:featuredmedia"] &&
                post._embedded["wp:featuredmedia"][0].source_url &&
                post._embedded["wp:featuredmedia"][0].source_url.length > 0 && (
                  <Card.Img variant="top" src={post._embedded["wp:featuredmedia"][0].source_url} />
                )}
              <Card.Body>
                <Link id="aBlog" to={`/posts/${post.id}`}>
                  <Card.Title>{post.title.rendered}</Card.Title>
                  <Card.Text>
                    pubblicato il <br />
                    {post.modified}
                  </Card.Text>
                </Link>
              </Card.Body>
              <Link id="aBlog" to={`/posts/${post.id}`} className="ms-auto">
                <Button variant="primary">Leggi di più</Button>
              </Link>
            </Card>
          ))}
        </Row>
        <div className="pagination d-flex justify-content-center my-5">
          <Button className="mx-1" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button className="mx-1" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === lastPage}>
            Next
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Blog;
