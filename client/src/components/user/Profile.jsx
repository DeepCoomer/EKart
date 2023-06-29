import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import './profile.css';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
    const { userdata, loading, isAuthenticated } = useSelector(state => state.userReducer);

    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(changeIsUpdated());
    // }, [])

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);
    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <MetaData title={`${userdata.name}'s Profile`} />
                        <div className="profileContainer">
                            <div>
                                <h1>My Profile</h1>
                                <img src={userdata.avatar.url} alt={userdata.name} />
                                <Link to="/me/update">Edit Profile</Link>
                            </div>
                            <div>
                                <div>
                                    <h4>Full Name</h4>
                                    <p>{userdata.name}</p>
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <p>{userdata.email}</p>
                                </div>
                                <div>
                                    <h4>Joined On</h4>
                                    <p>{String(userdata.createdAt).substr(0, 10)}</p>
                                </div>

                                <div>
                                    <Link to="/orders">My Orders</Link>
                                    <Link to="/password/update">Change Password</Link>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Profile