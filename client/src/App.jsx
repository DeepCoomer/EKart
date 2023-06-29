import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/layout/Header/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WebFont from 'webfontloader';
import Footer from './components/layout/Footer/Footer';
import Home from './components/home/Home';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
import Search from './components/product/Search';
import LoginSignUp from './components/user/LoginSignUp';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync } from './app/features/userSlice';
import UserOptions from './components/layout/Header/UserOptions';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import MyOrders from './components/order/MyOrders';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import NewProduct from './components/admin/NewProduct';

function App() {
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/v1/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    });

    dispatch(getUserAsync());

    getStripeApiKey();

    // eslint-disable-next-line
  }, [])

  const { isAuthenticated, userdata } = useSelector(state => state.userReducer);

  function RequireAuth({ children }) {
    if (isAuthenticated === false) {
      return <Navigate to={'/login'} />
    }
    return children;
  }

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={userdata} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/account' element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path='/me/update' element={<RequireAuth><UpdateProfile /></RequireAuth>} />
        <Route path='/password/update' element={<RequireAuth><UpdatePassword /></RequireAuth>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<RequireAuth><Shipping /></RequireAuth>} />
        <Route path='/order/confirm' element={<RequireAuth><ConfirmOrder /></RequireAuth>} />
        {stripeApiKey && <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><RequireAuth><Payment /></RequireAuth></Elements>} />}
        <Route path='/success' element={<RequireAuth><OrderSuccess /></RequireAuth>} />
        <Route path='/orders' element={<RequireAuth><MyOrders /></RequireAuth>} />
        <Route path='/order/:id' element={<RequireAuth><OrderDetails /></RequireAuth>} />
        <Route path='/admin/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path='/admin/product' element={<RequireAuth><NewProduct/></RequireAuth>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
