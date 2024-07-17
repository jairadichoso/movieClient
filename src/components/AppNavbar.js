import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import UserContext from '../UserContext';
import { Link, NavLink } from 'react-router-dom';
import './AppNavbar.css';

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" className="navbar">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">FlickStack</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>      
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} exact="true" to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/movies" >Movies</Nav.Link>
                        {!user.id ? (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/addMovie">Add Movie</Nav.Link>
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
