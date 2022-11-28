import "../style/profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../components/posts/Posts"
import Layout from "./Layout";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/authContext";
import api from "../helpers/axiosSetting";
import {Backdrop, CircularProgress} from "@mui/material";
import * as React from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {saveReload} from "../redux/slices/postSlice";

const Profile = () => {
    const [user, setUser] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const {userId} = useParams()
    const accessToken = localStorage.getItem("accessToken")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    useEffect(()=>{
        setLoading(true)
        dispatch(saveReload(true))
        const fetchUser = async () => {
            try {
                const res = await api.get(`/user/getOne/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                const data = await res.data.info;
                setUser(data);
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchUser().then();
    },[userId])

    return (
        <Layout>
            <div className="profile">
                <div className="images">
                    <img
                        src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""
                        className="cover"
                    />
                    <img
                        src={user?.avatar}
                        alt=""
                        className="profilePic"
                    />
                </div>
                <div className="profileContainer">
                    <div className="uInfo">
                        <div className="left">
                            <a href="http://facebook.com">
                                <FacebookTwoToneIcon fontSize="large" />
                            </a>
                            <a href="http://facebook.com">
                                <InstagramIcon fontSize="large" />
                            </a>
                            <a href="http://facebook.com">
                                <TwitterIcon fontSize="large" />
                            </a>
                            <a href="http://facebook.com">
                                <LinkedInIcon fontSize="large" />
                            </a>
                            <a href="http://facebook.com">
                                <PinterestIcon fontSize="large" />
                            </a>
                        </div>
                        <div className="center">
                            <span>{user?.username}</span>
                            <div className="info">
                                <div className="item">
                                    <PlaceIcon />
                                    <span>USA</span>
                                </div>
                                <div className="item">
                                    <LanguageIcon />
                                    <span>lama.dev</span>
                                </div>
                            </div>
                            {
                                currentUser?._id !== userId &&
                                <button>follow</button>
                            }
                        </div>
                        {
                            currentUser?._id !== userId &&
                            <div className="right">
                                <EmailOutlinedIcon/>
                                <MoreVertIcon/>
                            </div>
                        }
                    </div>
                    <Posts userId={userId} />
                </div>
                {
                    loading && <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
            </div>
        </Layout>

    );
};

export default Profile;
