import React, {useContext, useEffect, useState} from "react";
import "../../style/stories.scss"
import { AuthContext } from "../../context/authContext"
import api from "../../helpers/axiosSetting";
import {Button, Dialog, Typography} from "@mui/material";
import {Skeleton} from "@mui/lab";
import Story from "../story/Story";
import {useDispatch, useSelector} from "react-redux";
import {saveCurStoryIndex} from "../../redux/slices/postSlice";
import Box from "@mui/material/Box";
import AddImg from '../../assets/addAvatar.png'
import {Textarea} from "@mui/joy";

const Stories = () => {
    const {currentUser} = useContext(AuthContext)
    const [stories, setStories] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [create, setCreate] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const accessToken = localStorage.getItem("accessToken")
    const dispatch = useDispatch()
    const curStoryIndex = useSelector(state => state.post.curStoryIndex)

    useEffect(() => {
        setLoading(true)
        const fetchStories = async () => {
            try {
                const res = await api.get('/story/all', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }})
                let storiesRaw = []
                await Promise.all(res?.data?.info?.map(async (story) => {
                    const user = await api.get(`/user/getOne/${story?.userId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                    story = {...story, user: user?.data?.info}
                    storiesRaw.push(story)
                }))
                setStories(storiesRaw)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        fetchStories().then()
    }, []);

    const handleDialog = async (index) => {
        setDialog(!dialog)
        dispatch(saveCurStoryIndex(index))
    }

    const handleCreate = async () => {
        setLoading(true)
        let file = document.getElementById("file").files[0];
        if (file) {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = async (e) => {
                const blob = e.target.result
                try {
                    await api.post('/story/create', {
                        content: {
                            text: inputValue,
                            img: blob
                        },
                    }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                    setLoading(false)
                    setCreate(false)
                    setInputValue("");
                } catch (err) {
                    console.log(err)
                    setLoading(false)
                    setCreate(false)
                }
            }
        } else {
            try{
                await api.post("/post/create", {
                    content: {
                        text: inputValue,
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                setLoading(false);
                setInputValue("");
                setCreate(false)
            } catch (e) {
                console.log(e);
                setLoading(false);
                setCreate(false)

            }
        }
    }

    return (
        <div className="stories">
            <div className="story">
                <img src={currentUser?.avatar} alt="" />
                <span>{currentUser?.name}</span>
                <button onClick={e=>setCreate(true)}>+</button>
            </div>
            {stories?.slice(0, 5).map((story, index)=>(
                <div className="story" key={index} onClick={e=>handleDialog(index)}>
                    <img src={story?.content?.img} alt="" />
                    <span>{story?.content?.text}</span>
                </div>
            ))}
            {
                create && <Dialog open={create} onClose={e=>setCreate(false)}>
                    <Box sx={{padding:'1rem'}}>
                        <Typography variant="h6">Create Story</Typography>
                        <Box gap={1} sx={{
                            display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:'1rem'
                        }}>
                            <input style={{display: "none"}}
                                   type="file"
                                   id="avatar" name="avatar"
                                   accept="image/png, image/jpeg"/>
                            <label htmlFor="file"
                                   style={{
                                       display: "flex", alignItems: 'center',
                                       justifyContent: 'center', flexDirection: 'column',
                                   }}>
                                <img style={{cursor: 'pointer', borderRadius:'50%'}} height='50px' width='50px' src={AddImg} alt="" />
                                <span>Avatar</span>
                            </label>
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
                        <Button onClick={handleCreate} fullWidth>Create</Button>
                    </Box>
                </Dialog>
            }
            {
                loading &&
                    [...Array(5)].map((item, index) => (
                <Typography component="div" className="story">
                        <Skeleton sx={{height:'100%', width: '100%'}} key={index} />
                </Typography>
                    ))
            }
            {
                !loading && stories?.length > 0 && <Story open={dialog} setOpen={setDialog} story={stories[curStoryIndex]}/>
            }
        </div>
    )
}

export default Stories