import React, {useState} from 'react';
import {Button, Dialog, Typography} from "@mui/material";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

const ShareCopyLink = ({open, setOpen, link}) => {
    const [copied, setCopied] = useState(false);

    return (
        <Dialog
            open
            onClose={() => setOpen(false)}
            maxWidth={"sm"}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
            }}>
                <section className="section">
                    <CopyToClipboard onCopy={()=>setCopied(true)} text={link}>
                        <IconButton>
                            <ContentCopyIcon/>
                        </IconButton>
                    </CopyToClipboard>
                </section>
                <Typography>Copy Link</Typography>
            </Box>
            {
                copied ?
                    <Typography sx={{
                        color: 'green', width: '100%',
                        display: 'flex', justifyContent: 'center'
                    }}>
                        Copied!
                    </Typography> : null
            }
        </Dialog>
    );
};

export default ShareCopyLink;
