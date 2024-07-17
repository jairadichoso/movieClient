import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import MovieCard from './MovieCard';

export default function UserView({ movieData }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const movieArr = movieData.map(movie => {
            return (
                <MovieCard movieProp={movie} key={movie._id} />
            );
        });

        setMovies(movieArr);
    }, [movieData]);

    return (
        <Row>
            {movies}
        </Row>
    );
}
