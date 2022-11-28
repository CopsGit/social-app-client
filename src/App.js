import Login from "./pages/Login";
import Register from "./pages/Register";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./style/style.scss";
import {useContext, useEffect, useState} from "react";
import { AuthContext } from "./context/authContext";
import Dashboard from "./pages/Dashboard";
import {Backdrop, CircularProgress} from "@mui/material";
import Layout from "./pages/Layout";
import LoadingPage from "./pages/LoadingPage";

function App() {
    const {currentUser} = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(currentUser){
            setLoading(false);
        }
    },[currentUser])


    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login"/>;
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
                    <Home />
                </ProtectedRoute>
            ),
        },
        {
            path: "/profile/:userId",
            element: (
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            ),
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
            {!loading && <RouterProvider router={router} />}
            <LoadingPage loading={loading}/>
        </div>
    );
}

export default App;
