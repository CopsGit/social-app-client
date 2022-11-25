import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useCallback, useState} from "react";
import DashMain from "./main/DashMain";
import DashActivities from "./DashActivities";
import DashUsers from "./DashUsers";
import DashPosts from "./DashPosts";
import DashSettings from "./DashSettings";
import DashProfile from "./DashProfile";
import DashLogout from "./DashLogout";
import '../../style/dashboard.scss'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const DashLeftBar = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [curPage, setCurPage] = useState("Main");
    const listItemIcons = [
        <HomeOutlinedIcon/>,
        <InsertChartOutlinedIcon/>,
        <PeopleAltOutlinedIcon/>,
        <NoteOutlinedIcon/>,
        <SettingsOutlinedIcon/>,
        <AccountBoxOutlinedIcon/>,
        <LogoutOutlinedIcon/>,
    ]

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const renderContents = useCallback(
        () => {
            switch (curPage) {
                case 'Main':
                    return <DashMain/>
                case 'Activities':
                    return <DashActivities/>
                case 'Users':
                    return <DashUsers/>
                case 'Posts':
                    return <DashPosts/>
                case 'Settings':
                    return <DashSettings/>
                case 'Profile':
                    return <DashProfile/>
                case 'Log Out':
                    return <DashLogout/>
                default:
                    return null
            }
        }
    ,[curPage])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open} sx={{backgroundColor: "#c1beff"}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                        edge="start"
                        // sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {curPage}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Typography margin={"auto"}>
                        17 Social
                    </Typography>
                    {/*<IconButton onClick={handleDrawerClose}>*/}
                    {/*    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}*/}
                    {/*</IconButton>*/}
                </DrawerHeader>
                <Divider />
                <List
                    sx={{
                        paddingTop: 0
                    }}
                >
                    {['Main', 'Activities', 'Users', 'Posts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={()=>setCurPage(text)}
                                sx={text === curPage &&{
                                    backgroundColor:'#c1beff',
                                    color:'#ffffff',
                                    ':hover': {
                                        backgroundColor:'#c1beff',
                                        color:'#ffffff',
                                    }
                                }}
                            >
                                <Box sx={{minWidth:'56px'}}>
                                    {listItemIcons[index]}
                                </Box>
                                <Typography>
                                    {text}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <List sx={{position:'absolute', bottom:0, width:'100%'}}>
                    <Divider />
                    {['Settings', 'Profile', 'Log Out'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={()=>setCurPage(text)}
                                sx={text === curPage &&{
                                    backgroundColor:'#c1beff',
                                    color:'#ffffff',
                                    ':hover': {
                                        backgroundColor:'#c1beff',
                                        color:'#ffffff',
                                    }
                                }}
                            >
                                <ListItemIcon>
                                    {listItemIcons[index+4]}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
                {renderContents()}

            </Main>
        </Box>
    );
};

export default DashLeftBar;
