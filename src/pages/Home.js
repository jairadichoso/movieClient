import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {

	return (
		<>
        <Row>
            <Col className="text-center">
                <h1>Welcome to FlickStack</h1>
                <p>Discover movies and share your reviews!</p>
                <Link className="btn btn-primary" to={'/movies'}>Movies</Link>
            </Col>
        </Row>
		</>
	)
}