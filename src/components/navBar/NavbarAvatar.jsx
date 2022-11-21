import React, {useContext, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {AuthContext} from "../../context/authContext";
import "../../style/navbar.scss";
import AddAvatar from "../../assets/addAvatar.png";
import {useNavigate} from "react-router-dom";
import api from "../../helpers/axiosSetting";

const NavbarAvatar = () => {
    const { currentUser} = useContext(AuthContext);
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem('accessToken');

    const handleOpen = () => {
        setOpen(true);
    }
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
                    console.log(blob)
                    const res = await api.post('/user/auth/update', {
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

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        navigate('/login')
    }

    const handleGet = (e) =>{

    }

    return (
        <>
                <img
                    src={currentUser?.avatar}
                    alt=""
                    onClick={handleOpen}
                    style={{
                        // border: '1px solid black',
                        // borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                />
                <span>{currentUser?.name}</span>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Settings"}
                </DialogTitle>
                        <form
                            onSubmit={handleSubmit}
                            style={{border: "1px solid black"}}
                        >
                            <input type="file"
                                   id="avatar" name="avatar"
                                   accept="image/png, image/jpeg"/>
                            <label htmlFor="file">
                                <img src={AddAvatar} alt="" />
                                <span>Add an avatar (image type only)</span>
                            </label>
                            <button disabled={loading} >
                                Update
                            </button>
                        </form>
                    {/*<p>{document.getElementById("file")}</p>*/}
                <Box justifyContent={"space-between"} display={"flex"}>
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
