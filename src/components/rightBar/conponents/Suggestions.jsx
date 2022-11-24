import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../context/authContext";
import {Alert, CircularProgress} from "@mui/material";
import api from "../../../helpers/axiosSetting";

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser, accessToken } = useContext(AuthContext);

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
            return window.location.reload()
        } catch (e) {
            console.log(e)
            setErrMessage(e.message)
        }
    }

    useEffect(()=>{
        setLoading(true)
        const fetchSuggestions = async () => {
            try{
                const res = await api.get('/follow/suggestion',{
                    headers: {Authorization: `Bearer ${accessToken}`}
                })
                console.log(res)
                setSuggestions(res.data.info)
            } catch (e) {
                console.log(e)
                setLoading(false)
            }
            setLoading(false)
        }
        fetchSuggestions().then()
    }, [])

    return (
        <>
            <span>Suggestions For You</span>
            {
                suggestions.map((suggestion, index) => {
                    return <div className="user" key={index}>
                        <div className="userInfo">
                            <img
                                src={suggestion.avatar}
                                alt=""
                            />
                            <span>{suggestion.username}</span>
                        </div>
                        <div className="buttons">
                            <button onClick={() => handleFollow(suggestion.id)}>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>
                })
            }
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
            {
                loading && <CircularProgress />
            }
        </>
    );
};

export default Suggestions;
