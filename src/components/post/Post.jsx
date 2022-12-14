import "../../style/post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import {useContext, useEffect, useState} from "react";
import api from "../../helpers/axiosSetting";
import {AuthContext} from "../../context/authContext";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import ShareCopyLink from "../shareCopyLink/ShareCopyLink";
import {useSelector} from "react-redux";

const Post = ({ rawPost }) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(rawPost?.post?.interaction?.likes?.length);
    const [commentsAmount, setCommentsAmount] = useState(rawPost?.post?.interaction?.comments?.length);
    const [shareOpen, setShareOpen] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const {currentUser} = useContext(AuthContext);
    const refreshPost = useSelector(state => state.post.reloadPost);

    const post = {
        id: rawPost?.post?._id,
        userId: rawPost?.post?.userId,
        name: rawPost?.user?.username,
        profilePic: rawPost?.user?.avatar,
        img: rawPost?.post?.content?.img,
        desc: rawPost?.post?.content?.text,
        likes: rawPost?.post?.interaction?.likes,
        comments: rawPost?.post?.interaction?.comments,
        createdAt: rawPost?.post?.status?.createdAt,
    }

    const timeDifference = () => {
        const now = new Date();
        const postDate = new Date(post.createdAt);
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
                if (post?.likes?.includes(currentUser._id)) {
                    setLiked(true);
                }
    }, [refreshPost]);


    const handleLike = async () => {
        try{
            await api.post(`/post/like/${post.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setLikes(prev=>prev+1);
            setLiked(!liked);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="post">
            {rawPost && <div style={{padding: '20px'}} className='container'>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className='user'>
                    <div style={{display: 'flex', gap: '20px'}} className='userinfo'>
                        <Link
                            to={`/profile/${post.userId}`}
                            style={{textDecoration: "none", color: "inherit"}}
                        >
                            <img style={{height: '40px', width: '40px', borderRadius: "50%", objectFit: "cover"}}
                                 src={post.profilePic} alt=""/>
                        </Link>
                        <div style={{display: "flex", flexDirection: "column",}} className='details'
                        >
                            <Link
                                to={`/profile/${post.userId}`}
                                style={{textDecoration: "none", color: "inherit"}}
                            >
                                <span className='name' style={{fontWeight: "500",}}>{post.name}</span>
                            </Link>
                            <span className='date' style={{fontSize: '12px'}}>
                                {timeDifference()}
                            </span>
                        </div>
                    </div>
                    <MoreHorizIcon/>
                </div>
                <div className="content" style={{margin: '20px 0'}}>
                    <p style={{whiteSpace: 'pre-line', lineHeight: '1.5rem'}}>{post.desc}</p>
                    {post?.img && <img style={{
                        width: "100%",
                        maxHeight: "500px",
                        objectFit: "cover",
                        marginTop: "20px",
                    }} src={post.img} alt=""/>}
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}} className="info">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                        className="item"
                        onClick={handleLike}
                    >
                        {liked ? <FavoriteOutlinedIcon/> : <FavoriteBorderOutlinedIcon/>}
                        {likes} {likes > 1 ? "Likes" : "Like"}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                        className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon/>
                        {commentsAmount} {commentsAmount > 1 ? "Comments" : "Comment"}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                        onClick={()=>setShareOpen(!shareOpen)}
                        className="item">
                        <ShareOutlinedIcon/>
                        Share
                    </div>
                </div>
                {commentOpen && <Comments post={post} commentsAmount={commentsAmount} {...{setCommentsAmount}}/>}
                {shareOpen && <ShareCopyLink open={shareOpen} setOpen={setShareOpen} link={`http://localhost:3000/post/${post.id}`}/>}
            </div>}
            {
                !rawPost && <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding:'90px'}}>
                    <Typography variant="h5" component="div" gutterBottom>
                        No Post Yet
                    </Typography>
                </Box>
            }
        </div>
    );
};

export default Post;
