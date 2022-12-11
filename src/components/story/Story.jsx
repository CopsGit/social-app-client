import React, {useEffect, useState} from 'react';
import {Button, Dialog, Grid, Typography} from "@mui/material";
import "../../style/style.scss"
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useDispatch, useSelector} from "react-redux";
import {saveCurStoryIndex} from "../../redux/slices/postSlice";
import {LinearProgress} from "@mui/joy";

const Story = ({open, setOpen, story}) => {
    const [progress, setProgress] = useState(0);
    const curStoryIndex = useSelector(state => state.post.curStoryIndex)
    const dispatch = useDispatch()

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (open) {
            const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
            }, 100);
            return () => {
                clearInterval(timer);
            };
        } else {
            setProgress(0)
        }

    }, [open]);

    useEffect(() => {
        if (progress === 100 && curStoryIndex < 4) {
            setProgress(0)
            dispatch(saveCurStoryIndex(curStoryIndex + 1))
        }
    }, [progress])

    const handleLeft = () => {
        if (curStoryIndex > 0) {
            dispatch(saveCurStoryIndex(curStoryIndex - 1))
        }
    }

    const handleRight = () => {
        if (curStoryIndex < 4) {
            dispatch(saveCurStoryIndex(curStoryIndex + 1))
        }
    }

    return (
        <Dialog
            fullWidth={true}
            open={open}
            onClose={handleClose}
            maxWidth={"xs"}
            aria-labelledby="responsive-dialog-title"
        >

            <Grid container sx={{
                padding: "15px",
                height: "100vh",
                width: "100%",
                background: `url(${story?.post?.content?.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
                display: "flex",
                alignContent: "space-between",
                justifyContent: "center",
                flexDirection: "row",
            }}>
                <Grid item sx={{
                    // height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent:'space-between'
                }}>
                    <Grid item sx={{
                        display:'flex', height: "100%", flexDirection:'row', padding:'5px',
                        alignItems:'flex-start', justifyContent:'flex-start',backgroundColor:'rgba(128,128,128,0.5)',
                        borderRadius: "5rem 5rem 5rem 5rem"
                    }}>
                        <img style={{
                            borderRadius:'50%', height:'40px', width:'40px', objectFit:'cover'
                        }} src={story?.user?.avatar} alt=""/>
                        <Typography sx={{
                            padding:'0 1rem',  height:'100%',
                            display:'flex', alignItems:'center', borderRadius:'10px'
                        }} color={'#ffffff'} variant={'h5'}>{story?.user?.username}</Typography>
                    </Grid>
                    <Grid item sx={{
                        height:'100%', display:'flex', flexDirection:'column',
                        alignItems:'center', justifyContent:'center'
                    }}>
                        <IconButton sx={{
                            color: "#ffffff", backgroundColor: "rgba(128,128,128,0.5)",
                        }} variant='contained' onClick={handleClose}><CloseIcon/></IconButton>
                    </Grid>
                </Grid>
                <Grid item sx={{
                    padding:'1.5rem',
                    display:'flex',
                    backgroundColor:'rgba(128,128,128,0.5)',
                    width:'100%',
                    borderRadius:'4px',
                }}>
                    <Typography sx={{opacity:'1', whiteSpace: 'pre-line', display:'grid'}} fontWeight={"bolder"} color={"white"} variant={'h5'}>
                        {story?.post?.content?.text}
                    </Typography>
                </Grid>

                <Button sx={{
                    position: "absolute",
                    top: "50%",
                    left: "10%",
                    color: "#ffffff",
                    backgroundColor: "rgba(128,128,128,0.5)",
                    transform: "translate(-50%, -50%)",
                    height: "50px",
                }} onClick={handleLeft}>
                    <ChevronLeftIcon/>
                </Button>
                <Button sx={{
                    position: "absolute",
                    top: "50%",
                    right: "10%",
                    color: "#ffffff",
                    backgroundColor: "rgba(128,128,128,0.5)",
                    transform: "translate(50%, -50%)",
                    height: "50px",
                }} onClick={handleRight}>
                    <ChevronRightIcon/>
                </Button>
            </Grid>
            <LinearProgress
                size="lg"
                determinate
                value={progress}
                sx={{height: "10px"}}
            />

        </Dialog>
    );
};

export default Story;
