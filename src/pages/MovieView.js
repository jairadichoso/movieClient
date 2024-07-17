import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Row, Col, Card, Container, Form, Button } from "react-bootstrap";
import UserContext from "../UserContext";
import CommentCard from "../components/CommentCard";
import Swal from "sweetalert2";

export default function MovieView() {
    const { user } = useContext(UserContext);
    const { movieId } = useParams();

    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [headerText, setHeaderText] = useState('Loading Comments');

    useEffect(() => {
        fetch(`https://movie-catalog-system.onrender.com/movies/getMovie/${movieId}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
                setDirector(data.director);
                setYear(data.year);
                setGenre(data.genre);
                setDescription(data.description);
                setComments(data.comments.reverse());
            });

        if (comments.length > 0) {
            setHeaderText('Reviews');
        } else {
            setHeaderText('No Reviews Yet');
        }
    }, [movieId, comments]);

    const postComment = async (movieId) => {
        try {
            const response = await fetch(`https://movie-catalog-system.onrender.com/movies/addComment/${movieId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    comment: newComment
                })
            });
            const data = await response.json();
            if (data.error === 'Movie not found') {
                Swal.fire({
                    title: 'Movie not found',
                    icon: 'error',
                    text: 'The movie you are trying to delete could not be found'
                });
            } else if (data.message === 'comment added successfully') {
                Swal.fire({
                    title: 'Comment Successfully posted',
                    icon: 'success'
                });
                setNewComment('');
            } else {
                Swal.fire({
                    title: 'Error in posting comment',
                    icon: 'error'
                });
            }
        } catch (err) {
            console.log('Error in deleting movie: ', err);
            Swal.fire({
                title: 'Something went wrong',
                icon: 'error',
                text: 'Please try again'
            });
        }
    };

    return (
        !user.id ? (
            <Navigate to={'/login'} />
        ) : (
            user.isAdmin ? (
                <Navigate to={'/movies'} />
            ) : (
                <>
                    <Container className="mt-5">
                        <Row>
                            <Col xs={12} sm={10} md={8} lg={{ span: 6, offset: 3 }}>
                                <Card>
                                    <Card.Body className="text-center">
                                        <Card.Title className="mb-3"><h2>{title}</h2></Card.Title>
                                        <Card.Text>Directed by: {director}</Card.Text>
                                        <Card.Text>Year: {year}</Card.Text>
                                        <Card.Text>Genre: {genre}</Card.Text>
                                        <Card.Text>Description: {description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="mt-3">
                        <Row>
                            <Col xs={12} sm={10} md={8} lg={{ span: 6, offset: 3 }}  className="text-center mt-3">
                                <Form>
                                    <Form.Group controlId="userEmail">
                                        <Form.Label><h3>Post Review</h3></Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Enter your review"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="primary" size="sm" className="mt-3" onClick={() => postComment(movieId)}>
                                        Post
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="mt-3">
                        <Row>
                            <Col xs={12} sm={10} md={8} lg={{ span: 6, offset: 3 }}>
                                <h3 className="text-center my-3">{headerText}</h3>
                                {comments.map(comment => (
                                    <CommentCard commentProp={comment} key={comment._id} />
                                ))}
                            </Col>
                        </Row>
                    </Container>
                </>
            )
        )
    );
}
