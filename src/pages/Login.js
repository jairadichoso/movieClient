import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate, Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    function authenticate(e) {
        e.preventDefault();
        fetch('https://movie-catalog-system.onrender.com/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Login response data:", data);

            if (data.access) {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to FlickStack!"
                });
                navigate('/');
            } else {
                Swal.fire({
                    title: "Login Failed",
                    icon: "error",
                    text: "Invalid credentials."
                });
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            Swal.fire({
                title: "Login Failed",
                icon: "error",
                text: "An error occurred during login. Please try again."
            });
        });

        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        fetch('https://movie-catalog-system.onrender.com/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("User details response data:", data);

            if (data.user) {
                setUser({
                    id: data.user._id,
                    isAdmin: data.user.isAdmin
                });
            } else {
                console.error("Failed to retrieve user details");
            }
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
        });
    };

    useEffect(() => {
        setIsActive(email !== "" && password !== "");
    }, [email, password]);

    useEffect(() => {
        console.log("Updated user state:", user);
    }, [user]);

    return (
        !user.id ?
        <Container>
            <Col xs={12} sm={8} md={6} lg={4} xl={3} className="mx-auto my-5">
                <h1 className="form-title text-center mb-4">Login</h1>
                <Form onSubmit={(e) => authenticate(e)}>
                    <Form.Group controlId="userEmail" className="mb-3">
                        <Form.Floating>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Form.Label>Email</Form.Label>
                        </Form.Floating>
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-3">
                        <Form.Floating>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Form.Label>Password</Form.Label>
                        </Form.Floating>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" disabled={!isActive}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Col>
        </Container>
        :
        <Navigate to={'/'} />
    );
}
