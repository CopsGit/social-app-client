import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../context/authContext";
import api from "../../../helpers/axiosSetting";
import {Typography} from "@mui/material";
import {Skeleton} from "@mui/lab";

const OnlineFriends = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("accessToken");

    useEffect(()=>{
        setLoading(true)
        const fetchFriends = async () => {
            try{
                const res = await api.get("/follow", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });
                const data = await res.data.info;
                data?.following?.map(async friend => {
                    if(data?.followers?.includes(friend)){
                        const friendInfo = await api.get(`/user/getOne/${friend}`, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            }
                        })
                        setFriends(prev => [...prev, friendInfo.data.info])
                    }
                })
                setLoading(false)
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        }
        fetchFriends().then();
    },[])

    return (
        <>
            <span>Online Friends</span>
            {
                friends.map((value, index) => <div className="user">
                    <div className="userInfo" key={index}>
                        <img
                            src={value.avatar}
                            alt=""
                        />
                        <div className="online" />
                        <span>{value.username}</span>
                    </div>
                </div>)
            }
            {
                loading &&
                <Typography component="div" variant={"h3"}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </Typography>
            }
        </>
    );
};

export default OnlineFriends;
