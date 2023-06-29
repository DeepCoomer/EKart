import { Backdrop, Badge, SpeedDial, SpeedDialAction } from '@mui/material'
import React, { useState } from 'react'
import './header.css';
import { Dashboard, ExitToApp, ListAlt, Person, ShoppingCart, ShoppingCartRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../app/features/userSlice';
import { useCookies } from 'react-cookie';

const UserOptions = ({ user }) => {

    const { cartItems } = useSelector(state => state.cartReducer);

    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const options = [
        { icon: <ListAlt />, name: "Orders", func: orders },
        { icon: <Person />, name: "Profile", func: account },
        {
            icon: (
                <ShoppingCart
                    style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
                />
            ),
            name: `Cart(${cartItems.length})`,
            func: cart,
        },
        { icon: <ExitToApp />, name: "Logout", func: logoutUser },
    ];

    function dashboard() {
        navigate("/admin/dashboard");
    }

    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function cart() {
        navigate("/cart");
    }
    function logoutUser() {
        dispatch(logout());
        removeCookie('token')
        localStorage.removeItem('ekarttoken');
        alert.success("Logout Successfully");
    }

    if (user.role === "admin") {
        options.unshift({
            icon: <Dashboard />,
            name: "Dashboard",
            func: dashboard,
        });
    }
    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <div>
                <ShoppingCartRounded fontSize='large' className='cart' onClick={() => navigate('/cart')} />
                <Badge badgeContent={cartItems.length} color="error" style={{ position: 'fixed', right: '8vmax', top: '6vmax', zIndex: '11' }} />
                <SpeedDial
                    ariaLabel='SpeedDial tooltip example'
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    direction='down'
                    className='speedDial'
                    style={{ zIndex: '14' }}
                    icon={
                        <img
                            className='speedDialIcon'
                            src={user ? user.avatar.url : './Profile.png'}
                            alt='Profile'
                        />
                    }
                >
                    {options.map((item) => (
                        <SpeedDialAction
                            key={item.name}
                            icon={item.icon}
                            tooltipTitle={item.name}
                            onClick={item.func}
                            tooltipOpen={window.innerWidth <= 600 ? true : false}
                        />
                    ))}
                </SpeedDial>
            </div>
        </>
    )
}

export default UserOptions