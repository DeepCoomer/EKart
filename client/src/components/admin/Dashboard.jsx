import React from 'react'
import MetaData from '../layout/MetaData'
import SideBar from './SideBar'
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <MetaData title="Dashboard - Admin Panel" />
            <SideBar />
        </div>
    )
}

export default Dashboard