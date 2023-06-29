import React, { Fragment, useEffect } from 'react';
import './products.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategories, changePage, changePrice, clearError, getAllProductsAsync } from '../../app/features/productSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import ProductCart from '../home/ProductCart';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Slider, Typography } from '@mui/material';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
]

const Products = () => {
    const { loading, products, errormessage, productCount, resultPerPage, currentPage, price, category } = useSelector(state => state.productReducer);

    // const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const alert = useAlert();

    const { keyword } = useParams();

    // const [price, setPrice] = useState([0, 25000]);

    const setCurrentPageNo = (e) => {
        // setCurrentPage(e);
        // console.log(e);
        dispatch(changePage(e));
    }

    const priceHandler = (event, newPrice) => {
        // setPrice(newPrice);
        dispatch(changePrice(newPrice));
    };

    useEffect(() => {
        dispatch(getAllProductsAsync(keyword));
        // eslint-disable-next-line
    }, [currentPage, price, category])

    useEffect(() => {
        if (errormessage) {
            alert.error(errormessage);
            dispatch(clearError());
        }
        // eslint-disable-next-line
    }, [errormessage])
    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>
                        <MetaData title="PRODUCTS -- EKart" />
                        <h2 className="productsHeading">Products</h2>
                        <div className="products">
                            {products &&
                                products.map((product) => (
                                    <ProductCart key={product._id} product={product} />
                                ))}
                        </div>

                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="on"
                                aria-labelledby="range-slider"
                                min={0}
                                max={100000}
                            />

                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => dispatch(changeCategories(category))}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {resultPerPage < productCount && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}
                    </Fragment>
            }
        </Fragment>
    )
}

export default Products