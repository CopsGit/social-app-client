import { useNavigate, Link } from "react-router-dom";
import '../style/register.scss'
import AddAvatar from '../assets/addAvatar.png'
import {useState} from "react";
import {
    Alert,
    Backdrop, Box,
    CircularProgress,
} from "@mui/material";
import api from "../helpers/axiosSetting";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate()

    const handleClose = () => {
        setLoading(false);
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()

        const username = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        let file = document.getElementById("file").files[0];
        if (file) {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = async (e) => {
                const blob = e.target.result
                try {
                    await api.post('/user/auth/register', {
                        email,
                        password,
                        username,
                        avatar: blob
                    })
                    setLoading(false)
                    navigate("/login")
                    window.location.reload()
                } catch (err) {
                    setErr(err)
                    setLoading(false)
                }
            }
        }

    }

    return (
        <div className="register">

            <div className="card">
                <div className="left">
                    <h1>17 Social</h1>
                    <p>
                        Here is the 17 social for educational purposes only.
                        Enjoy it!
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input required type="text" placeholder="Username" />
                        <input required type="email" placeholder="Email" />
                        <input required type="password" placeholder="Password" />
                        <input style={{ display: "none" }} type="file" id="file" accept="image/*" />
                        <label htmlFor="file">
                            <img src={AddAvatar} alt="" />
                            <span>Add an avatar (image only)</span>
                        </label>
                        <button disabled={loading} id={'submitRegister'}>
                            Register
                        </button>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <span>Have an account?</span>
                            <Link to="/login"
                                  style={{
                                      textDecoration: "none",
                                      color: '#c1beff',
                                  }}
                            >
                                Login
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
                err.length >0 && <Alert
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

export default Register;
