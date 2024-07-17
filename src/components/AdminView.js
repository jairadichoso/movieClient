import { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import UpdateMovie from './UpdateMovie';
import DeleteMovie from './DeleteMovie';

export default function AdminView({movieData, fetchData}) {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        const moviesArr = movieData.map(movie => {
            return(
                <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.director}</td>
                    <td>{movie.year}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.description}</td>
                    <td><UpdateMovie movie={movie._id} fetchData={fetchData}/></td>
                    <td><DeleteMovie movie={movie._id} movieTitle={movie.title}/></td>
                </tr>
            )

        })
        setMovies(moviesArr)
    }, [movieData, fetchData])

    return(
        <Container className="mt-4">
            <Table striped bordered hover responsive variant="light">
                <thead>
                    <tr className="text-center">
                        <th>Title</th>
                        <th>Director</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Description</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies}
                </tbody>
            </Table>    
        </Container>
    )
}