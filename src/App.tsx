import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './components/MainLayout';

import Home from './components/Home';

import About from './components/About';
import Shop from './components/Shop';
import Contact from './components/Contact';
import Sale from './components/Sale';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Checkout from './components/Checkout';
import Product from './components/Product';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
