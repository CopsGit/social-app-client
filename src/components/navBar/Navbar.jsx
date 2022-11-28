import "../../style/navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {Link, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import NavbarAvatar from "./NavbarAvatar";
import {useDispatch, useSelector} from "react-redux";
import {saveShowLeftBar} from "../../redux/slices/postSlice";

const Navbar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const navigate = useNavigate()
    const showLeftBar = useSelector(state => state.post.showLeftBar)
    const dispatch = useDispatch()

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
                <GridViewOutlinedIcon sx={{cursor:'pointer'}} onClick={e=>dispatch(saveShowLeftBar(!showLeftBar))}/>
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="right">
                <div className="user">
                    <NavbarAvatar/>
                </div>
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
            </div>
        </div>
    );
};

export default Navbar;
