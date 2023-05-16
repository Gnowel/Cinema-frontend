import React, {useState} from 'react';
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import { Container, Typography, Hidden, IconButton, List, ListItem , ButtonBase, Box} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import Menu from '@mui/material/Menu';
import {Register} from "../Register/Register"; 
import {LogIn} from "../LogIn/LogIn"; 

const navigationLinksCommon = [
    {key: "1", name: "Главная",       href: "/"},
    {key: "2", name: "Фильмы",        href: "/movies"},
    {key: "3", name: "Расписание",    href: "/raspisanie"},
];

const navigationLinksAuthorized = [
    {key: "1", name: "Главная",       href: "/"},
    {key: "2", name: "Фильмы",        href: "/movies"},
    {key: "3", name: "Расписание",    href: "/raspisanie"},
    {key: "4", name: "Выйти",         href: "/logout"},
]

const link = {
    marginRight: 5,
    color: "#A1A1A1",
    '&:hover':{
        color: "white"
    },
    fontSize: 12,
    fontWeight: 700,
    textTransform: "none",
};

const name = {
    marginRight: 5,
    color: "#A1A1A1",
    fontSize: 12,
    fontWeight: 700,
    textTransform: "none",
};

const typography = {
    fontSize: 23,
    marginRight: 5,
    fontWeight: 700,
}

const menu = {
    "& .MuiPaper-root" : {
        backgroundColor : "#141414"
    }
}

const button = {
    marginRight: 5,
    color: "#A1A1A1",
    pading: 0,
    '&:hover':{
        color: "white",
        backgroundColor: 'transparent',
    },
    textTransform: "none",
    fontSize: 12,
    fontWeight: 700,
    backgroundColor: 'transparent',
}

export const Header = ({user, setUser}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const open = Boolean(anchorEl);

    console.log(user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    };

    
    const handleClickCloseLogin = () => {
        console.log(user.email);
        setOpenLogin(false);
    };

    const handleClickOpenRegister = () => {
        setOpenRegister(true);
    };

    const handleClickCloseRegister = () => {
        setOpenRegister(false);
    };
      
    return(
        <AppBar position ="sticky" sx={{backgroundColor: "#141414"}}>
            <Container maxWidth="md">
                {user.isAuthenticated ? (
                    <Toolbar disableGutters>
                        <Typography sx={typography}>Кинотеатр</Typography>
                        <Hidden smDown>
                        {navigationLinksAuthorized.map(item => (
                            <Link sx={link} underline='none' variant="button" key={item.key} href={item.href}>
                                {item.name}
                            </Link>
                        ))}
                        </Hidden>
                        <Typography sx={name}>{user.userName}</Typography>
                        <Hidden smUp>
                            <IconButton
                                id="positioned-demo-button"
                                variant="outlined"
                                color="neutral"
                                onClick={handleClick}>
                                <MenuIcon sx={{color: "white"}} />
                            </IconButton>
                            <Menu 
                                id="positioned-demo-menu"
                                open={open}
                                anchorEl={anchorEl}
                                sx={menu}
                                onClick={handleClose}>
                                <List>
                                    {navigationLinksAuthorized.map(item => (
                                        <ListItem key={item.key} sx={{backgroundColor: "#141414"}}>
                                            <Link sx={link} underline='none' variant="button" key={item.key} href={item.href}>
                                                {item.name}
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </Menu>
                        </Hidden>
                    </Toolbar>
                ) : (
                    <Toolbar disableGutters>
                        <Typography sx={typography}>Кинотеатр</Typography>
                        <Hidden smDown>
                            {navigationLinksCommon.map(item => (
                                <Link sx={link} underline='none' variant="button" key={item.key} href={item.href}>
                                    {item.name}
                                </Link>
                            ))}
                            <ButtonBase onClick={handleClickOpenLogin} disableRipple>
                                <Box sx={button}>Войти</Box>
                            </ButtonBase>
                            <ButtonBase onClick={handleClickOpenRegister} disableRipple>
                                <Box sx={button}>Регистрация</Box>
                            </ButtonBase>
                        </Hidden>
                        <Typography sx={name}>Гость</Typography>
                        <Hidden smUp>
                            <IconButton
                                id="positioned-demo-button"
                                variant="outlined"
                                color="neutral"
                                onClick={handleClick}>
                                <MenuIcon sx={{color: "white"}} />
                            </IconButton>
                            <Menu 
                                id="positioned-demo-menu"
                                open={open}
                                anchorEl={anchorEl}
                                sx={menu}
                                onClick={handleClose}>
                                <List>
                                    {navigationLinksCommon.map(item => (
                                        <ListItem key={item.key} sx={{backgroundColor: "#141414"}}>
                                            <Link sx={link} underline='none' variant="button" key={item.key} href={item.href}>
                                                {item.name}
                                            </Link>
                                        </ListItem>
                                    ))}
                                    <ListItem>
                                        <ButtonBase onClick={handleClickOpenLogin} disableRipple>
                                            <Box sx={button}>Войти</Box>
                                        </ButtonBase>
                                    </ListItem>
                                    <ListItem>
                                        <ButtonBase onClick={handleClickOpenRegister} disableRipple>
                                            <Box sx={button}>Регистрация</Box>
                                        </ButtonBase>
                                    </ListItem>
                                </List>
                            </Menu>
                        </Hidden>
                    </Toolbar>
                )}
            </Container>
            <LogIn open={openLogin} user={user} setUser={setUser} onClose={handleClickCloseLogin}/>
            <Register open={openRegister} user={user} setUser={setUser} onClose={handleClickCloseRegister}/>
        </AppBar>

    );
}