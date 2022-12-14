import "../../style/navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import NavbarAvatar from "./NavbarAvatar";
import {useDispatch, useSelector} from "react-redux";
import {saveShowLeftBar} from "../../redux/slices/postSlice";
import {AuthContext} from "../../context/authContext";
import {TextField} from "@mui/joy";

const Navbar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const navigate = useNavigate()
    const showLeftBar = useSelector(state => state.post.showLeftBar)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const { currentUser} = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>17Social</span>
                </Link>
                <HomeOutlinedIcon sx={{cursor:'pointer'}} onClick={e=>navigate('/')}/>
                {darkMode ? (
                    <WbSunnyOutlinedIcon sx={{cursor:'pointer'}} onClick={toggle} />
                ) : (
                    <DarkModeOutlinedIcon sx={{cursor:'pointer'}} onClick={toggle} />
                )}
                <GridViewOutlinedIcon className='gridView' sx={{cursor:'pointer'}} onClick={e=>dispatch(saveShowLeftBar(!showLeftBar))}/>
                <div className="avatarView">
                    <img
                        src={currentUser?.avatar}
                        alt=""
                        onClick={e=>setOpen(true)}
                        style={{
                            cursor: 'pointer'
                        }}
                    />
                    <span>{currentUser?.name}</span>
                    <NavbarAvatar open={open} setOpen={setOpen} />
                </div>
                    <TextField
                        type="text"
                        className="search"
                        placeholder="Search Post or User..."
                        startDecorator={<SearchOutlinedIcon />}
                        onKeyDown={e=>navigate(`/post/${e.target.value}`)}
                    />
            </div>
            <div className="right">
                <div className="user">
                    <img
                        src={currentUser?.avatar}
                        alt=""
                        onClick={e=>setOpen(true)}
                        style={{
                            cursor: 'pointer'
                        }}
                    />
                    <span>{currentUser?.name}</span>
                    <NavbarAvatar open={open} setOpen={setOpen} />
                </div>
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
            </div>
        </div>
    );
};

export default Navbar;
