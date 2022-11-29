import React, {useContext} from 'react';
import Navbar from "../components/navBar/Navbar";
import LeftBar from "../components/leftBar/LeftBar";
import RightBar from "../components/rightBar/RightBar";
import {DarkModeContext} from "../context/darkModeContext";
import {useSelector} from "react-redux";

const Layout = ({children}) => {
    const { darkMode } = useContext(DarkModeContext);
    const showLeftBar = useSelector(state => state.post.showLeftBar)

    return (
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Navbar />
            <div style={{ display: "flex" }}>
                {showLeftBar && <LeftBar />}
                <div style={{ flex: 6 }}>
                    {/*<Outlet />*/}
                    {children}
                </div>
                <RightBar />
            </div>

        </div>
    );
};

export default Layout;
