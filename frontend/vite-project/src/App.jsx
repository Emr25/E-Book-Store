import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


import Login from './components/Login ';
import Header from './components/Header ';
import Register from './components/Register ';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/AuthSlice';
import ProductList from './components/ProductList ';
import "./App.css"
import ProductDetails from './components/ProductDetails ';
import SepetCard from './components/SepetCard ';

const App = () => {

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />

        <Route path="/login" element={user ? <ProductList /> : <Login />} />
        <Route path="/register" element={user ? <ProductList /> : <Register />} />

        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/card" element={user ? <SepetCard /> : <Login />} />
      </Routes>
    </Router>

  )
}

export default App