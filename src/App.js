import { UserProvider } from './UserContext';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/Login';
import Logout from './pages/Logout';
import AppNavbar from './components/AppNavbar';
import Movies from './pages/Movies';
import AddMovie from './pages/AddMovies';
import MovieView from './pages/MovieView';

import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });
  const [loading, setLoading] = useState(true);

  const unsetUser = () => {
    localStorage.clear();
    setUser({
      id: null,
      isAdmin: null
    });
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`https://movie-catalog-system.onrender.com/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.hasOwnProperty('user')) {
            setUser({
              id: data.user._id,
              isAdmin: data.user.isAdmin
            });
          } else {
            setUser({
              id: null,
              isAdmin: null
            });
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh' }}>
        <p  className='mt-3'>Loading...</p>
    </div>
  );

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <main className="content">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/addMovie" element={<AddMovie />} />
            <Route path="/movies/:movieId" element={<MovieView />} />
          </Routes>
        </Container>
        </main>
      </Router>
    </UserProvider>
  );
}

export default App;
