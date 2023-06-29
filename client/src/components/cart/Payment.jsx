import React, { useRef } from 'react'
import './payment.css'
import MetaData from '../layout/MetaData'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { CreditCard, Event, VpnKey } from '@mui/icons-material'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { createOrderAsync } from '../../app/features/orderSlice'
import { useEffect } from 'react'
// import { updateProductStock } from '../../app/api/products/products'
import { removeAllItemsFromCart } from '../../app/features/cartSlice'

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector(state => state.cartReducer);
    const { userdata } = useSelector((state) => state.userReducer);
    const { errorMessage } = useSelector(state => state.orderReducer);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'token': localStorage.getItem('ekarttoken')
                },
            };
            const { data } = await axios.post(
                "https://ekart-sever.onrender.com/api/v1/payment/process",
                paymentData,
                config);

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: userdata.name,
                        email: userdata.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrderAsync(order));

                    // cartItems.map(async (item) => {
                    //     let { data } = await axios.get(`http://localhost:8000/api/v1/product/${item.product}`);
                    //     let productStock = data.product.stock;
                    //     await updateProductStock(item.product, productStock - item.stock);
                    // })

                    dispatch(removeAllItemsFromCart());

                    navigate("/success");
                } else {
                    alert.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (errorMessage) {
            alert.error(errorMessage);
        }
        // eslint-disable-next-line
    }, [errorMessage]);
    return (
        <>
            <MetaData title={'Payment'} />
            <CheckOutSteps activeStep={2} />
            <div className="paymentContainer" onClick={submitHandler}>
                <form className="paymentForm">
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCard />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <Event />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <VpnKey />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </>
    )
}

export default Payment