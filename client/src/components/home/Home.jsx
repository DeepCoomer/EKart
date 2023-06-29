import React, { useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import './home.css';
import ProductCart from './ProductCart';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getAllProductsAsync } from '../../app/features/productSlice';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

// const product = {
//   name: "Blue Tshirt",
//   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//   price: "3000",
//   _id: "Deep"
// }

const Home = () => {
  const { loading, products, errormessage } = useSelector((state) => state.productReducer);
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const alert = useAlert();

  useEffect(() => {
    dispatch(getAllProductsAsync());
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (errormessage) {
      alert.error(errormessage);
      dispatch(clearError());
    }
    // eslint-disable-next-line
  }, [errormessage])

  return (
    <>
      {
        loading ? <Loader /> :
          (
            <><MetaData title={"Ekart"} /><div className="banner">
              <p>Welcome to Ekart</p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>

              <a href="#container">
                <button>
                  Scroll <CgMouse />
                </button> &nbsp;
                {!isAuthenticated ? <button><Link to='/login' style={{ textDecoration: "none", color: "black" }}>Login</Link></button> : <></>}
              </a>
            </div>
              <h2 className="homeHeading">Featured Products</h2><div className="container" id="container">
                {products && products.map((p) => {
                  return (
                    <ProductCart product={p} key={p._id} />
                  );
                })}
              </div></>
          )
      }
    </>
  )
}

export default Home