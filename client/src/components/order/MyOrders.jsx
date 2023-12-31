import { Launch } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import React from 'react';
import './myorders.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { clearErrors, getMyOrdersAsync } from '../../app/features/orderSlice';
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData';
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../layout/loader/Loader';

const MyOrders = () => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, errorMessage, orders } = useSelector((state) => state.orderReducer);
    const { userdata } = useSelector((state) => state.userReducer);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                // console.log()
                // return params
                return params.formattedValue === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                // console.log(params);
                return (
                    <Link to={`/order/${params.id}`}>
                        <Launch />
                    </Link>
                );
            },
        },
    ];
    const rows = [];
    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        dispatch(getMyOrdersAsync());
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (errorMessage) {
            alert.error(errorMessage);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, errorMessage]);
    return (
        <>
            <MetaData title={`${userdata.name} - Orders`} />

            {loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="myOrdersTable"
                        autoHeight
                    />

                    <Typography id="myOrdersHeading">{userdata.name}'s Orders</Typography>
                </div>
            )}
        </>
    )
}

export default MyOrders