import "../../style/share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/authContext";
import api from "../../helpers/axiosSetting";
import {Backdrop, CircularProgress, LinearProgress, Popper} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {saveReload} from "../../redux/slices/postSlice";

const Share = () => {
    const {currentUser, accessToken} = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(100);
    const [inputValue, setInputValue] = useState("");
    const [curFile, setCurFile] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = async (e) => {
                const blob = e.target.result
                setCurFile(blob)
            }

            let fileLabel = document.getElementById("fileLabel")
            console.log(fileLabel)
            setAnchorEl(fileLabel);
        } else {
            setCurFile(null)
        }
    }

    const canBeOpen = Boolean(curFile) && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    const handleShare = async (e) => {
        setLoading(true);
        setProgress(0)
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
                    setInputValue("");
                    setCurFile(null);
                    setProgress(100)
                } catch (e) {
                    console.log(e);
                    setLoading(false);
                    setProgress(100)
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
                    <input id='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder={`What's on your mind ${currentUser?.username}?`} />
                </div>
                <Box sx={{ width: '100%', marginBottom:1, color:'#808080' }}>
                    <LinearProgress
                        variant="determinate"
                        {...(progress === 100 && {color: 'inherit'})}
                        value={progress} />
                </Box>
                <div className="bottom">
                    <div className="left">
                        <input onChange={handleFileChange} type="file" id="file" style={{display:"none"}} />
                        <label htmlFor="file" id={'fileLabel'}>
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                                <Popper
                                    id={id}
                                    anchorEl={anchorEl}
                                    placement="bottom"
                                    open={Boolean(curFile)}
                                >
                                    <Box sx={{
                                        padding: 1,
                                        backgroundColor: 'background.paper',
                                        border: '1px solid #808080',
                                        borderRadius: 3,
                                    }}>
                                        <img height="100px" src={curFile} alt=""/>
                                    </Box>
                                </Popper>
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
                    <div className="right" onClick={e=>dispatch(saveReload(true))}>
                        <button onClick={e=>handleShare(e)}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
