import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar'
import Products from './components/products'
import Home from './components/home'
import Posts from './components/posts';
import ProductDetails from './components/productDetails';

const App = () => {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/posts/:year?/:month?" element={<Posts />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
