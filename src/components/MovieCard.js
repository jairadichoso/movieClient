import { useContext } from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import "./MovieCard.css";

export default function MovieCard({ movieProp }) {
  const { _id, title, director, year, genre } = movieProp;
  const { user } = useContext(UserContext);

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="my-2">
      {user.id ? (
        <Link to={`/movies/${_id}`} className="movieLink">
          <Card className="movieCard">
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{director}</Card.Subtitle>
              <Card.Text>
                Year: {year} <br/>
                Genre: {genre}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ) : (
        <Card className="movieCard">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{director}</Card.Subtitle>
            <Card.Text>{year}</Card.Text>
            <Card.Text>
              Year: {year} <br/>
              Genre: {genre}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
}
