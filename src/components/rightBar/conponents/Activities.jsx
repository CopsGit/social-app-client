import React, {useEffect, useState} from 'react';
import api from "../../../helpers/axiosSetting";

const Activities = () => {
    const accessToken = localStorage.getItem("accessToken");
    const [activities, setActivities] = useState([]);

    useEffect(()=>{
        const fetchActivities = async () => {
            try {
                const res = await api.get("/activity", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                const data = await res.data.info.reverse();
                setActivities(data.slice(0, 5));
            } catch (err) {
                console.log(err);
            }
        }
        fetchActivities().then();
    },[])

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
                        <img
                            height={40}
                            width={40}
                            style={{ borderRadius: "50%" }}
                            src={activity.avatar}
                            alt=""
                        />
                        <p>
                            <span>{activity.username}</span> {activity.activities}
                        </p>
                    </div>
                    <span>{timeDifference(activity.createdAt)}</span>
                </div>
            ))}
        </div>
    );
};

export default Activities;
