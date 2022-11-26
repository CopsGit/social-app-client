import Post from "../post/Post";
import "../../style/posts.scss";
import {useEffect, useState} from "react";
import api from "../../helpers/axiosSetting";
import {Skeleton} from "@mui/lab";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    //TEMPORARY

    useEffect(()=>{
        const fetchPosts = async () => {
            setLoading(true);
            try{
                const res = await api.get("/post/all", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });
                const data = await res.data.info.reverse();
                await Promise.all(data?.map(async (post)=>{
                    const fetchUser = async () => {
                        try {
                            const res = await api.get(`/user/getOne/${post.userId}`, {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                }
                            });
                            const data = await res.data.info;
                            const rawPost = {
                                id: post?._id,
                                userId: post.userId,
                                name: data.username,
                                profilePic: data.avatar,
                                img: post?.content?.img,
                                desc: post?.content?.text,
                                likes: post?.interaction?.likes,
                                comments: post?.interaction?.comments,
                                createdAt: post?.status?.createdAt,
                            }
                            setPosts((prev)=>[...prev, rawPost]);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    await fetchUser();
                }))
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchPosts().then();
    }, [])

    return <div className="posts">
        {posts.map(post=>(
            <Post post={post} key={post.id}/>
        ))}
        {
            loading &&
            [1,2,3,4,5,6].map((item, index) => (
            <Box key={index}>
                <Typography component="div" variant={"h1"}>
                    <Skeleton />
                </Typography>
            </Box>
            ))
        }
    </div>;
};

export default Posts;
