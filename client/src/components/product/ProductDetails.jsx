import React, { useEffect, Fragment, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router-dom'
import './productDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getProductDetailsAsync } from '../../app/features/productSlice';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
// import ReactStars from 'react-rating-stars-component';
import MetaData from '../layout/MetaData';
import ReviewCard from './ReviewCard';
import { addToCart } from '../../app/features/cartSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import { newReview } from '../../app/api/products/products';

const ProductDetails = () => {
    const { loading, product, errormessage } = useSelector(state => state.productReducer);
    const { isAuthenticated } = useSelector(state => state.userReducer);
    // const { cartItems } = useSelector(state => state.cartReducer);
    const { id } = useParams();
    const dispatch = useDispatch();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
        // size: 'large'
        // edit: false,
        // color: "rgba(20,20,20,0.1)",
        // activeColor: "tomato",
        // size: window.innerWidth < 600 ? 20 : 25,
        // value: product.ratings,
        // isHalf: true
    };

    const [quantity, setQuantity] = useState(1);
    // const [open, setOpen] = useState(false);

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const alert = useAlert();
    const addToCartHandler = () => {
        if (!isAuthenticated) {
            alert.error("Please Login First!!")
        } else {
            const item = {
                product: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0].url,
                stock: product.stock,
                quantity: quantity
            }
            // console.log(product.images[0].url);
            dispatch(addToCart(item));
            alert.success("Added to cart successful");
        }
    }

    const submitReviewToggle = () => {
        if (!isAuthenticated) {
            alert.error("Please Login First!!")
        } else {
            open ? setOpen(false) : setOpen(true);   
        }
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        newReview(myForm);

        setOpen(false);
        setLoad(prev => !prev);
        alert.success("Review submitted successfully!");
        // dispatch(getProductDetailsAsync(id));
    };

    // useEffect(() => {
    //   localStorage.setItem("cartItems", cartItems);
    // }, [cartItems])


    useEffect(() => {
        dispatch(getProductDetailsAsync(id));
        // eslint-disable-next-line
    }, [id, load])

    useEffect(() => {
        if (errormessage) {
            alert.error(errormessage);
            dispatch(clearError());
        }
        // eslint-disable-next-line
    }, [errormessage])
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name} -- EKart`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity} >-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity} >+</button>
                                    </div>
                                    <button
                                        disabled={product.stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}

                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails