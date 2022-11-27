import React from 'react';
import {Backdrop, CircularProgress} from "@mui/material";

const LoadingPage = ({loading}) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'black' }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingPage;
