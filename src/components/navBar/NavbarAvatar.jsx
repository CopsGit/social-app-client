import React, {useContext, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle, Grid,
    useTheme
} from "@mui/material";
import {AuthContext} from "../../context/authContext";
import "../../style/navbar.scss";
import {useNavigate} from "react-router-dom";
import api from "../../helpers/axiosSetting";
import {TextField} from "@mui/joy";

const NavbarAvatar = ({open, setOpen}) => {
    const { currentUser} = useContext(AuthContext);
    const navigate = useNavigate()
    // const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [err, setErr] = useState("");
    const accessToken = localStorage.getItem('accessToken');

    // const handleOpen = () => {
    //     setOpen(true);
    // }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()

        let file = document.getElementById("file").files[0];
        if (file) {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = async (e) => {
                const blob = e.target.result
                try {
                    await api.post('/user/auth/update', {
                        avatar: blob
                    }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                    setLoading(false)
                    window.location.reload()
                } catch (error) {
                    console.log(error.message)
                    setLoading(false)
                }
            }
        }
    }

    const handleLogout = async () => {
        localStorage.removeItem('accessToken')
        navigate('/login')
    }

    const handleName = async () => {
        setLoading(true);
        const name = document.getElementById('name').value
        if (name) {
            try {
                await api.post('/user/auth/update', {
                    username: name
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setLoading(false)
                window.location.reload()
            } catch (error) {
                console.log(error.message)
                setLoading(false)
            }
        }
    }

    const handleEmail = async () => {
        setLoading(true);
        const email = document.getElementById('email').value
        if (email) {
            try {
                await api.post('/user/auth/update', {
                    email: email
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setLoading(false)
                window.location.reload()
            } catch (error) {
                console.log(error.message)
                setLoading(false)
            }
        }
    }

    const handlePass = async () => {
        setLoading(true);
        const password = document.getElementById('passwordNew').value
        if (password) {
            try {
                await api.post('/user/auth/update', {
                    password: password
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setLoading(false)
                window.location.reload()
            } catch (error) {
                console.log(error.message)
                setLoading(false)
            }
        }
    }

    const handleConfirm = async () => {
        setLoading(true)
        const password = document.getElementById('passwordOrg').value
        try{
            const res = await api.post('/user/auth/checkPassword', {
                password: password
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.info === 'OK') {
                setConfirmed(true)
            } else {
                setErr('Wrong password')
            }
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setLoading(false)
            setErr('Wrong password')
        }
    }

    return (
        <>
            <Dialog
                fullWidth={true}
                open={open}
                // onClose={handleClose}
                maxWidth={"sm"}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Settings"}
                </DialogTitle>
                <Grid container padding={3} spacing={2}>
                    <form
                        onSubmit={handleSubmit}
                        style={{padding: "15px"}}
                    >
                        <input style={{display: "none"}}
                               type="file"
                               id="avatar" name="avatar"
                               accept="image/png, image/jpeg"/>
                        <label htmlFor="file"
                               style={{
                                   display: "flex", alignItems: 'center',
                                   justifyContent: 'center', flexDirection: 'column',
                               }}>
                            <img style={{cursor: 'pointer', borderRadius:'50%'}} height='50px' width='50px' src={currentUser.avatar} alt="" />
                            <span>Avatar</span>
                        </label>
                        <Button style={{
                            width: '100%',
                            margin: 'auto'
                        }} disabled={loading} >
                            Update
                        </Button>
                    </form>
                    <Grid item width={"80%"} className={'editInfo'}>
                        <TextField
                            sx={{"& .JoyInput-root":{border: 'none', paddingInline:'12px 0'}}}
                            id={"name"}
                            placeholder="Type in here…"
                            defaultValue={currentUser?.username}
                            startDecorator={<span>Username: </span>}
                            endDecorator={<Button onClick={handleName}>Update</Button>}
                        />
                        <TextField
                            sx={{"& .JoyInput-root":{border: 'none', paddingInline:'12px 0'}}}
                            id={"email"}
                            placeholder="Type in here…"
                            defaultValue={currentUser?.email}
                            startDecorator={<span>Email Address: </span>}
                            endDecorator={<Button onClick={handleEmail}>Update</Button>}
                        />
                        {!confirmed && <TextField
                            sx={{"& .JoyInput-root":{border: 'none', paddingInline:'12px 0'}}}
                            id={"passwordOrg"}
                            placeholder="Confirm your old password"
                            startDecorator={<span>Password: </span>}
                            endDecorator={<Button onClick={handleConfirm}>Confirm</Button>}
                        />}
                        {confirmed && <TextField
                            sx={{"& .JoyInput-root":{border: 'none', paddingInline:'12px 0'}}}
                            id={"passwordNew"}
                            placeholder="Enter your new password"
                            startDecorator={<span>Password: </span>}
                            endDecorator={<Button onClick={handlePass}>Update</Button>}
                        />}
                    </Grid>
                </Grid>

                <Box justifyContent={"space-between"} display={"flex"} >
                    <Button onClick={handleLogout}>
                        logout
                    </Button>
                    {
                        currentUser?.isStaff === true && <Button onClick={()=>{
                            navigate("/dashboard")
                        }}>
                            Admin Dashboard
                        </Button>
                    }
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </Box>

            </Dialog>
        </>
    );
};

export default NavbarAvatar;
