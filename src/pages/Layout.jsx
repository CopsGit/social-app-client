import React, {useContext} from 'react';
import Navbar from "../components/navBar/Navbar";
import LeftBar from "../components/leftBar/LeftBar";
import {Outlet} from "react-router-dom";
import RightBar from "../components/rightBar/RightBar";
import {DarkModeContext} from "../context/darkModeContext";

const Layout = ({children}) => {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Navbar />
            <div style={{ display: "flex" }}>
                <LeftBar />
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
