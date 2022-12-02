import React, {useContext, useEffect, useState} from "react";
import "../../style/stories.scss"
import { AuthContext } from "../../context/authContext"
import api from "../../helpers/axiosSetting";
import {Typography} from "@mui/material";
import {Skeleton} from "@mui/lab";
import Story from "../story/Story";

const Stories = () => {
    const {currentUser} = useContext(AuthContext)
    const [stories, setStories] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState(false);
    const accessToken = localStorage.getItem("accessToken")

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

    return (
        <div className="stories">
            <div className="story">
                <img src={currentUser?.avatar} alt="" />
                <span>{currentUser?.name}</span>
                <button>+</button>
            </div>
            {stories?.map((story, index)=>(
                <div className="story" key={index}>
                    <img src={story?.content?.img} alt="" />
                    <span>{story?.content?.text}</span>
                </div>
            ))}
            {
                loading &&
                    [...Array(5)].map((item, index) => (
                <Typography component="div" className="story">
                        <Skeleton sx={{height:'100%', width: '100%'}} key={index} />
                </Typography>
                    ))
            }
            <Story open={dialog} setOpen={setDialog} />
        </div>
    )
}

export default Stories