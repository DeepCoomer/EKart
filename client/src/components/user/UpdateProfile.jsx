import React, { useEffect, useState } from 'react'
import './updateprofile.css';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsUpdated, clearError, getUserAsync, updateUserAsync } from '../../app/features/userSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import { Face, MailOutline } from '@mui/icons-material';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { userdata, isUpdated, loading, errorMessage } = useSelector((state) => state.userReducer);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const navigate = useNavigate();

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateUserAsync(myForm));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (userdata) {
            setName(userdata.name);
            setEmail(userdata.email);
            setAvatarPreview(userdata.avatar.url);
        }
        // eslint-disable-next-line
    }, [userdata]);

    useEffect(() => {
        if (errorMessage) {
            alert.error(errorMessage);
            dispatch(clearError());
        }
        // eslint-disable-next-line
    }, [errorMessage])


    useEffect(() => {
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(getUserAsync());
            dispatch(changeIsUpdated());
            navigate("/account");
        }
        // eslint-disable-next-line
    }, [isUpdated])

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <MetaData title="Update Profile -Ekart" />
                        <div className="updateProfileContainer">
                            <div className="updateProfileBox">
                                <h2 className="updateProfileHeading">Update Profile</h2>
                                <form
                                    className="updateProfileForm"
                                    encType="multipart/form-data"
                                    onSubmit={updateProfileSubmit}
                                >
                                    <div className="updateProfileName">
                                        <Face />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            required
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="updateProfileEmail">
                                        <MailOutline />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div id="updateProfileImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={updateProfileDataChange}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Update"
                                        className="updateProfileBtn"
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

export default UpdateProfile