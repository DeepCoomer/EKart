import React from 'react'
import './cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RemoveShoppingCart } from '@mui/icons-material';
import CartItemCard from './CartItemCard';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { removeItemsFromCart, updateQuantity } from '../../app/features/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cartReducer);
    const { isAuthenticated } = useSelector((state) => state.userReducer);
    const navigate = useNavigate();

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(updateQuantity({id: id, newQty: newQty}));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(updateQuantity({id: id, newQty: newQty}));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        if (isAuthenticated) {
            navigate("/shipping");
        } else {
            navigate('/login');
        }
    };
    return (
        <>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCart />

                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                    </div>

                    {cartItems &&
                        cartItems.map((item) => (
                            <div className="cartContainer" key={item.product}>
                                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                <div className="cartInput">
                                    <button
                                        onClick={() =>
                                            decreaseQuantity(item.product, item.quantity)
                                        }
                                    >
                                        -
                                    </button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button
                                        onClick={() =>
                                            increaseQuantity(
                                                item.product,
                                                item.quantity,
                                                item.stock
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="cartSubtotal">{`₹${item.price * item.quantity
                                    }`}</p>
                            </div>
                        ))}

                    <div className="cartGrossProfit">
                        <div></div>
                        <div className="cartGrossProfitBox">
                            <p>Gross Total</p>
                            <p>{`₹${cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price,
                                0
                            )}`}</p>
                        </div>
                        <div></div>
                        <div className="checkOutBtn">
                            <button onClick={checkoutHandler}>Check Out</button>
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default Cart