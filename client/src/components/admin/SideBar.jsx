import React from 'react'
import { Link } from 'react-router-dom';
// import logo from './favicon.ico'
import { Add, Dashboard, ExpandMore, ImportExport, ListAlt, People, PostAdd, RateReview } from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/lab';
import './sidebar.css';

const SideBar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                {/* <img src={logo} alt="Ekart" /> */}
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <Dashboard /> Dashboard
                </p>
            </Link>
            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ImportExport />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={<Add />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                    <ListAlt />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <People /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <RateReview />
                    Reviews
                </p>
            </Link>
        </div>
    )
}

export default SideBar