import "../../style/share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import {useContext, useState} from "react";
import { AuthContext } from "../../context/authContext";
import api from "../../helpers/axiosSetting";
import {Backdrop, CircularProgress} from "@mui/material";
import * as React from "react";

const Share = () => {
    const {currentUser, accessToken} = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleShare = async (e) => {
        setLoading(true);
        const text = document.getElementById("text").value;
        console.log(text);
        let file = document.getElementById("file").files[0];
        console.log(file);
        if (file) {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = async (e) => {
                const blob = e.target.result
                try{
                    const res = await api.post("/post/create", {
                        content: {
                            text,
                            avatar: currentUser.avatar,
                            img: blob,
                        }
                    }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    })
                    setLoading(false);
                    window.location.reload();
                } catch (e) {
                    console.log(e);
                    setLoading(false);
                }
            }
        } else {
            try{
                const res = await api.post("/post/create", {
                    content: {
                        text,
                        avatar: currentUser.avatar,
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                setLoading(false);
                window.location.reload();
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        }
    }

    const handleClose = () => {
        setLoading(false);
    }

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img
                        src={currentUser?.avatar}
                        alt=""
                    />
                    <input id='text' type="text" placeholder={`What's on your mind ${currentUser?.username}?`} />
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input type="file" id="file" style={{display:"none"}} />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={e=>handleShare(e)}>Share</button>
                    </div>
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
    );
};

export default Share;
