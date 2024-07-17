import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Container, Col, FloatingLabel } from 'react-bootstrap';
import Swal from "sweetalert2";

export default function AddMovie() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (title !== '' && director !== '') {
      setIsActive(true)
    }
    else {
      setIsActive(false)
    }
  }, [title, director, year, genre, description])

  const addMovie = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');

    try {
      const response = await fetch('https://movie-catalog-system.onrender.com/movies/addMovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          director,
          year,
          description,
          genre
        })
      });
      const data = await response.json();
      if(data.error === 'Movie already exists'){
        Swal.fire({
          title: 'Movie already exists',
          icon: 'error',
          text: 'This movie already exists'
        });
      }
      else if(data !== null) {
        Swal.fire({
          title: 'Movie successfully added',
          icon: 'success'
        })
        navigate('/movies')
      }
    }
    catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error in saving the product',
        icon: 'error',
        text: 'Error in saving the product'
      });
    }
  }

  return (
    <>
        <h1 className="text-center">Add Movie</h1>
        {
            !user.id ?
                <Navigate to='/login' />
                :
                <Container>
                    <Col xs={12} sm={10} md={8} lg={6} xl={5} className="mx-auto">
                        <Form onSubmit={e => addMovie(e)}>
                            <FloatingLabel controlId="floatingName" label="Title" className="my-3">
                                <Form.Control type="text" placeholder="Title" required value={title} onChange={e => { setTitle(e.target.value) }} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingDescription" label="Director" className="my-3">
                                <Form.Control type="text" placeholder="Director" required value={director} onChange={e => { setDirector(e.target.value) }} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingYear" label="Year" className="my-3">
                                <Form.Control type="text" placeholder="Year" required value={year} onChange={e => { setYear(e.target.value) }} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingGenre" label="Genre" className="my-3">
                                <Form.Control type="text" placeholder="Genre" required value={genre} onChange={e => { setGenre(e.target.value) }} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingDescription" label="Description" className="my-3">
                                <Form.Control type="text" placeholder="Description" required value={description} onChange={e => { setDescription(e.target.value) }} />
                            </FloatingLabel>

                            <div className="d-flex justify-content-end">
                                <Button variant="primary" type="submit" id="submitBtn" className='my-2'>Submit</Button>
                            </div>
                        </Form>
                    </Col>
                </Container>
        }
    </>
)
}
