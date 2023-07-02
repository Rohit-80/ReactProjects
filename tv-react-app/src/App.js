import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/common/navBar';
import Customers from './components/customers';
import MovieForm from './components/movieForm'
import Login from './components/common/login';
import Movies from './components/movies';
import Register from './components/common/register';
import NotFound from './components/notfound';
import jwtDecode from 'jwt-decode';
import Logout from './components/common/logout';
import Protected from './components/common/projectedRoute';
import './App.css';

const App = () => {
      
      const [state, setState] = useState();

      useEffect(() => {
            try {
                  const jwt = localStorage.getItem('token');
                  const user = jwtDecode(jwt);
                  setState(user)
                  console.log(user)
            } catch (e) {}
      }, [])

      return (<div>
            <BrowserRouter>
                  <NavBar user={state} />
                  <Routes>
                        <Route path="/" element={<Movies user={state} />} />
                        <Route path="/profile" element={<Customers />} />
                        <Route path="/rental" element={<Rentals />} />
                        <Route path="/movies/:id" element={<Protected 
                        isSignedIn={state}><MovieForm /></Protected>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/notfound" element={<NotFound />} />
                  </Routes>

            </BrowserRouter>
      </div>);


}
export default App;