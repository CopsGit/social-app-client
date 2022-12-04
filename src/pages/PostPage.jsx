import React, {useEffect, useState} from 'react';
import Layout from "./Layout";
import Post from "../components/post/Post";
import api from "../helpers/axiosSetting";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {Skeleton} from "@mui/lab";

const PostPage = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("accessToken");

    const postId = useParams();

    useEffect(() => {
        setLoading(true);
        const fetchPost = async () => {
            try{
                const res = await api.get(`/post/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });
                const data = await res.data.info;
                setPost(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchPost().then();
    }, []);

    return (
        <Layout>
            <Post rawPost={post}/>
            {
                loading &&
                [...Array(3)].map((item, index) => (
                    <Box key={index}>
                        <Typography component="div" variant={"h1"}>
                            <Skeleton/>
                        </Typography>
                    </Box>
                ))
            }
        </Layout>
    );
};

export default PostPage;
