import {useContext, useEffect, useState} from "react";
import "../../style/comments.scss";
import { AuthContext } from "../../context/authContext";
import {Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import api from "../../helpers/axiosSetting";
import Box from "@mui/material/Box";
import {Skeleton} from "@mui/lab";
import {Textarea} from "@mui/joy";
import * as React from "react";
import {saveReload, saveReloadComment} from "../../redux/slices/postSlice";

const Comments = ({post, setCommentsAmount, commentsAmount}) => {
    const { currentUser } = useContext(AuthContext);
    const reloadComment = useSelector(state => state.post.reloadComment)
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem("accessToken");
    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const timeDifference = (comment) => {
        const now = new Date();
        const postDate = new Date(comment.createdAt);
        const diff = now - postDate;
        const diffInSec = diff / 1000;
        const diffInMin = diffInSec / 60;
        const diffInHour = diffInMin / 60;
        let timeDiff = 0;
        if (diffInSec < 60) {
            timeDiff = Math.floor(diffInSec);
            return timeDiff + " seconds ago";
        } else if (diffInMin < 60) {
            timeDiff = Math.floor(diffInMin);
            return timeDiff + " minutes ago";
        } else if (diffInHour < 24) {
            timeDiff = Math.floor(diffInHour);
            return timeDiff + " hours ago";
        } else {
            timeDiff = Math.floor(diffInHour / 24);
            return timeDiff + " days ago";
        }
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const res = await api.get(`/post/comment/${post.id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                const rawData = await res.data.info;
                const data = rawData.sort((p1, p2) => p1.createdAt < p2.createdAt ? 1 : -1);
                setComments(data);

                setLoading(false)
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        }
        fetchData().then()
    }, [reloadComment]);

    const handleSend = async () => {
        setLoading(true)
        try{
            await api.post(`/post/comment/${post.id}`, {
                text: inputValue,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setInputValue("")
            setLoading(false)
            setCommentsAmount(commentsAmount + 1)
            dispatch(saveReloadComment(true))
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    console.log(comments);
    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser?.avatar} alt="" />
                <Box
                    sx={{
                        display: 'grid',
                        // gap: 2,
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        width: '100%',
                    }}
                >
                    <Textarea
                        label="Plain"
                        placeholder={`What's your comment ${currentUser?.username}?`}
                        variant="outlined"
                        color="neutral"
                        id='text'
                        maxRows={9}
                        value={inputValue}
                        className='input'
                        onChange={(e) => {setInputValue(e.target.value)
                            console.log(typeof(e.target.value))
                        }}
                    />
                </Box>
                <Button onClick={handleSend}>Send</Button>
            </div>
            {comments?.map((comment, index) => (
                <div className="comment" key={index}>
                    <img src={comment.user.avatar} alt="" />
                    <div className="info">
                        <span>{comment.user.username}</span>
                        <p style={{whiteSpace: 'pre-line', lineHeight: '1.5rem'}}>{comment.text}</p>
                    </div>
                    <span className="date">{timeDifference(comment)}</span>
                </div>
            ))}
            {
                loading &&
                [1, 2].map((item, index) => (
                    <Box key={index}>
                        <Typography component="div" variant={"h1"}>
                            <Skeleton/>
                        </Typography>
                    </Box>
                ))
            }
        </div>
    );
};

export default Comments;
