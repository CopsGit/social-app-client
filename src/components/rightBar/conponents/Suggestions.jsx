import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../context/authContext";
import {Alert, CircularProgress, Typography} from "@mui/material";
import api from "../../../helpers/axiosSetting";
import {Skeleton} from "@mui/lab";
import {Link} from "react-router-dom";

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [reload, setReload] = useState(false);
    const accessToken = localStorage.getItem("accessToken");

    const handleFollow = async (id) => {
        // setLoading(true);
        try {
            const res = await api.post('/follow', {
                userId: id
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log(res);
            setSuccessMessage(true)
            setReload(true);
            // return window.location.reload()
        } catch (e) {
            console.log(e)
            setErrMessage(e.message)
            setReload(true);
        }
    }

    useEffect(()=>{
        setLoading(true)
        const fetchSuggestions = async () => {
            try{
                const res = await api.get('/follow/suggestion',{
                    headers: {Authorization: `Bearer ${accessToken}`}
                })
                setSuggestions(res.data.info)
                setReload(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setReload(false)
            }
            setLoading(false)
        }
        fetchSuggestions().then()
    }, [reload])

    return (
        <>
            <span>Suggestions For You</span>
            {
                !loading && suggestions.slice(0, showMore ? 6 : 3).map((suggestion, index) => {
                    return <div className="user" key={index}>
                        <Link style={{textDecoration: 'none'}} to={`/profile/${suggestion.id}`}>
                        <div className="userInfo">
                            <img
                                src={suggestion.avatar}
                                alt=""
                            />
                            <span>{suggestion.username}</span>
                        </div>
                        </Link>
                        <div className="buttons">
                            <button onClick={() => handleFollow(suggestion.id)}>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>
                })
            }
            {
                loading &&
                <Typography component="div" variant={"h3"} sx={{lineHeight:'66.66px'}}>
                    {[1,2,3,4,5,6].slice(0, showMore ? 6 : 3).map((item, index) => (
                        <Skeleton key={index} />
                        ))}
                </Typography>
            }
            <Typography
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={() => setShowMore(!showMore)}
            >
                {showMore ? "Show Less" : "Show More"}
            </Typography>
            {
                errMessage.length > 0 &&
                <Alert
                    severity="error"
                    onClose={() => setErrMessage('')}
                    sx={{
                        position: 'fixed',
                        top: '5%',
                        left: '50%',
                        zIndex: '1101'
                    }}
                >{errMessage}</Alert>
            }
            {
                successMessage &&
                <Alert
                    severity="success"
                    onClose={() => setSuccessMessage(false)}
                    sx={{
                        position: 'fixed',
                        top: '2%',
                        left: '50%',
                        zIndex: '1101',
                        minWidth: '300px',
                        "& .MuiAlert-message": {
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }
                    }}
                >
                    Done!
                </Alert>
            }

        </>
    );
};

export default Suggestions;
