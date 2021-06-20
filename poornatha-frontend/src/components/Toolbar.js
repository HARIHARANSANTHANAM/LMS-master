import React,{useContext} from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import logo from '../assets/poornatha_logo1.png';
import { UserContext } from "../App";
import {useHistory} from 'react-router-dom'
import ExitToApp from '@material-ui/icons/ExitToApp';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  brand:{
      display:"flex",
      alignItems:"center",
      cursor:"pointer"
  },
  appbar:{
     zIndex:theme.zIndex.drawer + 1,
      backgroundColor:"black",
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width:`calc("100%" - 230px)`,
      width:"100%",
      position:"sticky"
  },
  brand_img:{
    height:"40px",
    width:"30px"
  }
});

function ToolbarComponent(props){

const {state,dispatch}=useContext(UserContext);

  const [view,setState] = React.useState({
    achorEl: false,
    MobileMoreAnchorEl: false
  });

  const handleProfileMenuOpen = event => {
    setState({
      achorEl: event.currentTarget
    });
  };

  const handleMobileMenuClose = () => {
    setState({
      mobileMoreAnchorEl: null
    });
  };

  const handleMenuClose = () => {
    setState({
      achorEl: null,
      mobileMoreAnchorEl: null
    });
  };

  const handleMobileMenuOpen = event => {
    setState({
      mobileMoreAnchorEl: event.currentTarget
    });
  };

    const { classes } = props;
    const isMenuOpen = Boolean(view.anchorEl);
    const isMobileMenuOpen = Boolean(view.mobileMoreAnchorEl);
    const history=useHistory();

    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        anchorEl={view.anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={()=>{localStorage.clear(); dispatch({type:"CLEAR",payload:null})}} >Logout</MenuItem>
      </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={view.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem  onClick={()=>{localStorage.clear(); dispatch({type:"CLEAR",payload:null}); history.push('/Signin')}}>
        <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <ExitToApp/>
          </IconButton>
          Logout
          </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.grow}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={props.openDrawerHandler}
            >
              <MenuIcon />
            </IconButton> */}
            <div className={classes.brand} onClick={props.openDrawerHandler}>
              <img src={logo}  alt="" className={classes.brand_img}/>
              <Typography className={classes.title} variant="h6" noWrap>
                Poornatha 
              </Typography>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle/>
          </IconButton>
       
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={()=>{localStorage.clear(); dispatch({type:"CLEAR",payload:null}); history.push('/Signin')}}
                color="inherit"
              >
                <ExitToApp/>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    );
  }

export default withStyles(styles)(ToolbarComponent);
