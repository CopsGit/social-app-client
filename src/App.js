import Login from "./pages/Login";
import Register from "./pages/Register";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate,
} from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./style/style.scss";
import {useContext} from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import Dashboard from "./pages/Dashboard";

function App() {
    const {currentUser} = useContext(AuthContext);
    const { darkMode } = useContext(DarkModeContext);

    const Layout = () => {
        return (
            <div className={`theme-${darkMode ? "dark" : "light"}`}>
                <Navbar />
                <div style={{ display: "flex" }}>
                    <LeftBar />
                    <div style={{ flex: 6 }}>
                        <Outlet />
                    </div>
                    <RightBar />
                </div>
            </div>
        );
    };

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    const ProtectedDashRoute = ({ children }) => {
        if (!currentUser || currentUser?.isStaff === false) {
            return <Navigate to="/login" />;
        }
        if (currentUser && currentUser?.isStaff === false) {
            return <Navigate to="/" />;
        }
        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/profile/:id",
                    element: <Profile />,
                },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/dashboard",
            element: (
                <ProtectedDashRoute>
                    <Dashboard />
                </ProtectedDashRoute>
            ),
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
