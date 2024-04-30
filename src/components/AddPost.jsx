import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const baseApiUrl = "http://localhost/wp-first/wp-json/wp/v2";

const AddPostDetails = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setErrorMessage("Il titolo e il contenuto sono obbligatori.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      let featuredMediaId = null;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await fetch(`${baseApiUrl}/media`, {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa("marco:C3pp gTq7 YeMP U75l hN9x ZkhD"),
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Impossibile caricare l'immagine in evidenza");
        }

        const imageData = await response.json();
        featuredMediaId = imageData.id;
      }

      let finalContent = content;
      if (imageUrl) {
        finalContent += `<img id="imgPost" src="${imageUrl}" alt=""/>`;
      }

      const newPost = {
        title: title,
        content: finalContent,
        status: "publish",
        featured_media: featuredMediaId,
      };

      const postResponse = await fetch(`${baseApiUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("marco:C3pp gTq7 YeMP U75l hN9x ZkhD"),
        },
        body: JSON.stringify(newPost),
      });

      if (!postResponse.ok) {
        throw new Error("Impossibile aggiungere il nuovo post");
      }

      const postData = await postResponse.json();

      console.log("Nuovo post aggiunto con successo. ID:", postData.id);
      setTitle("");
      setContent("");
      setImageFile(null);
      setImageUrl("");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Errore durante l'aggiunta del nuovo post:", error);
      setErrorMessage("Si è verificato un errore durante l'aggiunta del nuovo post");
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <Container>
      <h1>Aggiungi un nuovo post</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Titolo</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Testo</Form.Label>
          <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Carica un'immagine di copertina (opzionale)</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        <Form.Group controlId="formImageUrl">
          <Form.Label>Inserisci un'immagine al contenuto tramite url (opzionale)</Form.Label>
          <Form.Control type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Inviando..." : "Aggiungi Post"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddPostDetails;
