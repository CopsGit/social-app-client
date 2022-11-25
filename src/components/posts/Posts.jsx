import Post from "../post/Post";
import "../../style/posts.scss";
import {useEffect, useState} from "react";
import api from "../../helpers/axiosSetting";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const accessToken = localStorage.getItem("accessToken");
    //TEMPORARY

    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const res = await api.get("/post/all", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });
                const data = await res.data.info;
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
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchPosts().then(r => console.log(r));
    }, [])

    return <div className="posts">
        {posts.map(post=>(
            <Post post={post} key={post.id}/>
        ))}
    </div>;
};

export default Posts;
