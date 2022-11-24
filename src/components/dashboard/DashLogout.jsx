import React from 'react';
import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

const DashLogout = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        return navigate('/')
    }
    return (
        <Grid container>
            <Grid sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                left: '50%',
                top: '50%',
                flexDirection: 'column',
            }}>
                <Button variant="contained" sx={{
                    backgroundColor: "#c1beff"
                }}
                onClick={handleBack}
                >Back To Main Page</Button>
                <Button variant="contained" sx={{
                    width: '100%',
                    margin: '1rem 0',
                    backgroundColor: "#c1beff"
                }}
                // onClick={() => signOut(auth)}
                >Log Out</Button>
            </Grid>

        </Grid>
    );
};

export default DashLogout;
