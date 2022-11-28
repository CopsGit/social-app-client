import Post from "../post/Post";
import "../../style/posts.scss";
import {useEffect, useState} from "react";
import api from "../../helpers/axiosSetting";
import {Skeleton} from "@mui/lab";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {saveReload} from "../../redux/slices/postSlice";

const Posts = ({userId}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const reload = useSelector(state => state.post.reload)
    const dispatch = useDispatch()
    //TEMPORARY
    console.log(reload)

    useEffect(()=>{
        setLoading(true);
        const fetchPosts = async () => {
            if(userId){
                try{
                    const res = await api.get(`/post/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    });
                    const data = await res.data.info;
                    const post = data.sort((p1, p2) => p1.status.createdAt < p2.status.createdAt ? 1 : -1);
                    console.log(post);
                    setPosts(data);
                    setLoading(false);
                    dispatch(saveReload(false))
                } catch (err) {
                    console.log(err);
                    setLoading(false);
                    dispatch(saveReload(false))
                }
            } else {
                try{
                    const res = await api.get("/post/all", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    });
                    const data = await res.data.info;
                    const post = data.sort((p1, p2) => p1.status.createdAt < p2.status.createdAt ? 1 : -1);
                    console.log(post);
                    setPosts(data);
                    setLoading(false);
                    dispatch(saveReload(false))
                } catch (err) {
                    console.log(err);
                    setLoading(false);
                    dispatch(saveReload(false))
                }
            }

        }
        fetchPosts().then();
    }, [reload])

    return <div className="posts">
        {posts.map((post, index)=>(
            <Post rawPost={post} key={index}/>
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
