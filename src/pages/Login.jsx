import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../style/login.scss";
import {Alert, Backdrop, Box, CircularProgress} from "@mui/material";
import api from "../helpers/axiosSetting";

const Login = () => {
    const navigate = useNavigate()
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setLoading(false);
    }

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        try{
            const res = await api.post('/user/auth/login',{
                email,
                password
            })
            await localStorage.setItem('accessToken', res.data.accessToken)
            setLoading(false)
            navigate("/")
            window.location.reload()
        } catch (err) {
            setErr(err)
            setLoading(false)
        }
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>17 Social</h1>
                    <p>
                        Here is the 17 social for educational purposes only.
                        Enjoy it!
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <input required type="text" placeholder="Email Address" />
                        <input required type="password" placeholder="Password" />
                        <button>Login</button>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <span>Have no account?</span>
                            <Link to="/register"
                                  style={{
                                      textDecoration: "none",
                                      color: '#c1beff'
                                  }}
                            >
                                Register
                            </Link>
                        </Box>
                    </form>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {
                err?.length > 0 &&
                <Alert
                    severity="error"
                    onClose={() => setErr('')}
                    sx={{
                        position: 'fixed',
                        bottom: '5%',
                        right: '5%',
                    }}
                >{err}</Alert>
            }
        </div>
    );
};

export default Login;
