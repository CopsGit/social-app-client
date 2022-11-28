import React, {useEffect, useState} from 'react';
import api from "../../../helpers/axiosSetting";
import {Typography} from "@mui/material";
import {Skeleton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {saveReload} from "../../../redux/slices/postSlice";
import {Link} from "react-router-dom";

const Activities = () => {
    const accessToken = localStorage.getItem("accessToken");
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const reload = useSelector(state => state.post.reload)
    const dispatch = useDispatch()

    useEffect(()=>{
        setLoading(true);
        const fetchActivities = async () => {
            try {
                const res = await api.get("/activity", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                const data = await res.data.info;
                setActivities(data.slice(0, 5));
                setLoading(false);
                dispatch(saveReload(false))
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchActivities().then();
    },[reload])

    const timeDifference = (createdAt) => {
        const now = new Date();
        const postDate = new Date(createdAt);
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

    return (
        <div>
            <span>Latest Activities</span>
            {activities.map(activity=>(
                <div key={activity._id} className="user">
                    <div className="userInfo">
                        <Link style={{textDecoration: 'none'}} to={`/profile/${activity.userId}`}>
                        <img
                            height={40}
                            width={40}
                            style={{ borderRadius: "50%" }}
                            src={activity.user.avatar}
                            alt=""
                        />
                        </Link>
                        <p>
                            <span>{activity.user.username}</span> {activity.activities}
                        </p>
                    </div>
                    <span>{timeDifference(activity.createdAt)}</span>
                </div>
            ))}
            {
                loading &&
                <Typography component="div" variant={"h3"} sx={{lineHeight:'66.66px'}}>
                    {[1,2,3,4,5].map((item, index) => (
                        <Skeleton key={index} />
                    ))}
                </Typography>
            }
        </div>
    );
};

export default Activities;
