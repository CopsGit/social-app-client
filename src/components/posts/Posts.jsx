import Post from "../post/Post";
import "../../style/posts.scss";
import {useEffect, useState} from "react";
import api from "../../helpers/axiosSetting";
import {Skeleton} from "@mui/lab";
import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {saveReloadPost} from "../../redux/slices/postSlice";
import { io } from "socket.io-client";

const Posts = ({userId}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [curPage, setCurPage] = useState(1);
    const [userCurPage, setUserCurPage] = useState(1);
    const accessToken = localStorage.getItem("accessToken");
    const reloadPost = useSelector(state => state.post.reloadPost)
    const dispatch = useDispatch()

    useEffect(() => {
        const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);

        socket.on('new_post', post => {
            setPosts([post, ...posts]);
            console.log(post)
        });

        return () => {
            socket.disconnect();
        }
    }, [posts]);

    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            if (userId) {
                try {
                    const res = await api.get(`/post/${userId}/${userCurPage}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    });
                    const data = await res.data.info;
                    console.log(data);
                    setPosts(data);
                    setLoading(false);
                    dispatch(saveReloadPost(false))
                } catch (err) {
                    console.log(err);
                    setLoading(false);
                    dispatch(saveReloadPost(false))
                }
            } else {
                try {
                    const res = await api.get(`/post/all/${curPage}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    });
                    const data = await res.data.info;
                    setPosts(data);
                    setLoading(false);
                    dispatch(saveReloadPost(false))
                } catch (err) {
                    console.log(err);
                    setLoading(false);
                    dispatch(saveReloadPost(false))
                }
            }

        }
        fetchPosts().then();
    }, [])

    const handleLoadMore = async () => {
        setLoading(true);
        try {
            if (userId) {
                const res = await api.get(`/post/${userId}/${userCurPage + 1}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                const data = await res.data.info;
                setPosts([...posts, ...data]);
                setCurPage(curPage + 1);
                setLoading(false);
            } else {
                const res = await api.get(`/post/all/${curPage + 1}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                const data = await res.data.info;
                setPosts([...posts, ...data]);
                setCurPage(curPage + 1);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    return <div className="posts">
        {posts?.map((post, index) => (
            <Post rawPost={post} key={index}/>
        ))}
        {
            posts.length > 9 && !loading &&
            <Button
                onClick={handleLoadMore}
                variant="contained"
                color="primary"
                disabled={loading}
            >
                Load More
            </Button>
        }
        {
            posts?.length === 0 && !loading &&
            <Post rawPost={null}/>
        }
        {
            loading &&
            [...Array(6)].map((item, index) => (
                <Box key={index}>
                    <Typography component="div" variant={"h1"}>
                        <Skeleton/>
                    </Typography>
                </Box>
            ))
        }
    </div>;
};

export default Posts;
