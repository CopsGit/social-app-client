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

const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post?.likes?.length);
    const accessToken = localStorage.getItem("accessToken");
    const {currentUser} = useContext(AuthContext);

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
        const fetchData = async () => {
            try{
                const res = await api.get(`/post/get/${post.id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                const data = await res.data.info;
                data.interaction.likes.forEach(like => {
                    if (like === currentUser._id) {
                        setLiked(true);
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
        fetchData().then(r => console.log(r));
    }, []);


    const handleLike = async () => {
        try{
            const res = await api.post(`/post/like/${post.id}`, {}, {
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
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link
                                to={`/profile/${post.userId}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">
                                {timeDifference()}
                            </span>
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.img} alt="" />
                </div>
                <div className="info" onClick={handleLike}>
                    <div className="item">
                        {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                        {likes} {post?.likes?.length > 1 ? "Likes" : "Like"}
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        {post?.comments?.length} {post?.comments?.length > 1 ? "Comments" : "Comment"}
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments post={post}/>}
            </div>
        </div>
    );
};

export default Post;
