import "../../style/share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/authContext";
import api from "../../helpers/axiosSetting";
import {Button, LinearProgress, Popper} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import {saveReloadPost} from "../../redux/slices/postSlice";
import {Textarea} from "@mui/joy";

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
                const diff = Math.random() * 5;
                return Math.min(oldProgress + diff, 100);
            });
        }, 200);

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
        const text = inputValue;
        let file = document.getElementById("file").files[0];
        if (file) {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = async (e) => {
                const blob = e.target.result
                try{
                    await api.post("/post/create", {
                        content: {
                            text,
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
                } catch (e) {
                    console.log(e);
                    setLoading(false);
                }
            }
        } else {
            try{
                await api.post("/post/create", {
                    content: {
                        text,
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                setLoading(false);
                setInputValue("");
                setCurFile(null);
            } catch (e) {
                console.log(e);
                setLoading(false);
                setProgress(100)
            }
        }
    }

    // const handleClose = () => {
    //     setLoading(false);
    // }

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img
                        src={currentUser?.avatar}
                        alt=""
                    />
                    <Box
                        sx={{
                            py: 2,
                            display: 'grid',
                            // gap: 2,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            width: '100%',
                        }}
                    >
                        <Textarea
                            label="Plain"
                            placeholder={`What's on your mind ${currentUser?.username}?`}
                            variant="plain"
                            id='text'
                            maxRows={9}
                            value={inputValue}
                            className='input'
                            onChange={(e) => {setInputValue(e.target.value)
                                console.log(typeof(e.target.value))
                            }}
                        />
                    </Box>
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
                    <div className="right" onClick={e=>dispatch(saveReloadPost(true))}>
                        <Button disabled={loading} onClick={e=>handleShare(e)}>Share</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
