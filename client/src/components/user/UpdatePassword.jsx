import React, { useEffect, useState } from 'react'
import './updatepassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { changeIsUpdated, clearError, updatePasswordAsync } from '../../app/features/userSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import { Lock, LockOpen, VpnKey } from '@mui/icons-material';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { errorMessage, isUpdated, loading } = useSelector((state) => state.userReducer);

    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePasswordAsync(myForm));
    };

    useEffect(() => {
        if (errorMessage) {
            alert.error(errorMessage);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert.success("Password Updated Successfully");
            dispatch(changeIsUpdated());
            navigate("/account");
        }
    }, [dispatch, errorMessage, alert, navigate, isUpdated]);
    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <MetaData title="Change Password -Ekart" />
                        <div className="updatePasswordContainer">
                            <div className="updatePasswordBox">
                                <h2 className="updatePasswordHeading">Update Profile</h2>
                                <form
                                    className="updatePasswordForm"
                                    onSubmit={updatePasswordSubmit}
                                >
                                    <div className="loginPassword">
                                        <VpnKey />
                                        <input
                                            type="password"
                                            placeholder="Old Password"
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="loginPassword">
                                        <LockOpen />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginPassword">
                                        <Lock />
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Change"
                                        className="updatePasswordBtn"
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default UpdatePassword