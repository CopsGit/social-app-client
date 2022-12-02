import React from 'react';
import {Dialog} from "@mui/material";

const Story = ({open, setOpen}) => {




    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            fullWidth={true}
            open={open}
            onClose={handleClose}
            maxWidth={"sm"}
            aria-labelledby="responsive-dialog-title"
        >


        </Dialog>
    );
};

export default Story;
