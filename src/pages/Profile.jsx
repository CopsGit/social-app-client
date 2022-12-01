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
import {Backdrop, Button, CircularProgress, Dialog} from "@mui/material";
import * as React from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {saveReloadPost} from "../redux/slices/postSlice";
import {TextField} from "@mui/joy";
import Address from "../components/address/Address";
import IconButton from "@mui/material/IconButton";
import NavbarAvatar from "../components/navBar/NavbarAvatar";

const Profile = () => {
    const [user, setUser] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const {userId} = useParams()
    const accessToken = localStorage.getItem("accessToken")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const [addressDialog, setAddressDialog] = useState(false);
    const [profileDialog, setProfileDialog] = useState(false);


    const cover = user?.cover ? user.cover : "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

    useEffect(()=>{
        setLoading(true)
        dispatch(saveReloadPost(true))
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

    const file = document.getElementById("cover");
    if (file) {
        file.onchange = async () => {
            setLoading(true)
            console.log(file.files[0])
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file.files[0]);
            fileReader.onload = async (e) => {
                try {
                    await api.post('/user/auth/update', {
                        cover: e.target.result
                    }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                    window.location.reload()
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }

    const handleWebsite = async (website) => {
        setLoading(true)
        try{
            await api.post('/user/auth/update', {
                website
            },{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout>
            <div className="profile">
                <div className="images">
                    {currentUser.cover === user?.cover &&
                        <>
                            <input type="file" id='cover' style={{display: 'none'}}
                                   accept="image/png, image/jpeg"/>
                            <label htmlFor="cover">
                                <img
                                    src={cover}
                                    alt=""
                                    className="cover"
                                />
                            </label>}
                        </>
                    }
                    {currentUser.cover !== user?.cover &&
                        <img
                            src={cover}
                            alt=""
                            className="coverOther"
                        />
                    }
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
                                <Button disabled={currentUser?._id !== userId} className="item" onClick={e=>setAddressDialog(true)}>
                                    <PlaceIcon />
                                    <span>{currentUser.location}</span>
                                </Button>
                                <Dialog open={addressDialog} onClose={e=>setAddressDialog(false)}>
                                    <Address curAddress={currentUser.address} type={'user'}/>
                                </Dialog>
                                <TextField
                                    sx={{
                                        "& .JoyInput-root":{border: 'none'},
                                        // width: '50%',
                                    }}
                                    disabled={currentUser?._id !== userId}
                                    className="item"
                                    startDecorator={<LanguageIcon />}
                                    placeholder={user?.website ? user?.website : "Website"}
                                    onKeyDown={e=>{
                                        if(e.key === 'Enter'){
                                            handleWebsite(e.target.value)
                                        }
                                    }}
                                />
                            </div>
                            {
                                currentUser?._id !== userId &&
                                <button>Follow</button>
                            }
                            {
                                currentUser?._id === userId &&
                                <button onClick={e=>setProfileDialog(true)}>Edit profile</button>
                            }
                            <NavbarAvatar open={profileDialog} setOpen={setProfileDialog} />
                        </div>
                        {
                            currentUser?._id !== userId &&
                            <div className="right">
                                <IconButton >
                                    <EmailOutlinedIcon />
                                </IconButton >
                                <IconButton >
                                    <MoreVertIcon />
                                </IconButton >
                            </div>
                        }
                        {
                            currentUser?._id === userId &&
                            <div className="right">
                                <IconButton >
                                    <MoreVertIcon />
                                </IconButton >
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
