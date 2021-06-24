import React,{useContext} from "react";
import Drawer from "@material-ui/core/Drawer";
import {
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Avatar,
  Typography
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import useCheckMobileScreen from "../customHooks/useCheckMobileScreen";
import ListAltIcon from '@material-ui/icons/ListAlt';
import HomeIcon from '@material-ui/icons/Home';
import logo from "../assets/poornatha_logo1.png";
import { makeStyles,fade} from "@material-ui/core/styles";
import {NavLink} from 'react-router-dom';

import { UserContext } from "../App";

import { useHistory } from "react-router-dom";
import ExitToApp from '@material-ui/icons/ExitToApp';



function DrawerComponent(props) {

  const styles =  makeStyles(theme => ({
    list: {
      width: props.DrawerWidth,
      zIndex:-1,
      display:"flex",
      flexDirection:"column",
      height:"100vh"
    },
    fullList: {
      width: "auto"
    },
    paper: {
      overflowY: 'unset',
      zIndex:-1
    },
    activelink:{
      textDecoration:"none",
        borderRight:"4px solid black",
        backgroundColor: "rgba(0,0,0,.03)",
    },
    link:{
      textDecoration:"none",
      display:"flex",
      color:"black",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,.05)",
      },
    }
  }));
    
  const checkMobileView=useCheckMobileScreen();
    const  classes  = styles();

    const { state, dispatch } = useContext(UserContext);
    
  const history = useHistory();

    return (
      <Drawer open={checkMobileView?props.left:true} onClose={props.toggleDrawerHandler} 
      variant={checkMobileView?"temporary":"permanent"}   >
         <div
        className={classes.list}
        role="presentation"
        onClick={checkMobileView?props.toggleDrawerHandler:null}
        onKeyDown={props.toggleDrawerHandler}
      >
        <div style={{flexGrow:0}}>
          <List>
              <ListItem>

              <div>
          <img src={logo} alt="Poornatha" style={{ width: "30px" }} />
        </div>
        <Typography component="h1" variant="h6">
            Poornatha
          </Typography>
              </ListItem>
          </List>
          </div>
          <div style={{flexGrow:8}}>
          <List>
       
          <NavLink to="/Home" activeClassName={classes.activelink} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
              <HomeIcon/>
              </ListItemIcon>

              <Typography variant="p">Home </Typography>
              
            </ListItem>
            
            </NavLink>
            <NavLink to="/Application_Form" activeClassName={classes.activelink} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
              <ListAltIcon></ListAltIcon>
              </ListItemIcon>

              <Typography variant="p">Application Form </Typography>
            </ListItem>
            </NavLink>
            
          </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam",].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              
              <Typography variant="p">{text}</Typography>
            </ListItem>
          ))}
        </List>
        </div>
        <div style={{flexGrow:0,border:"1px solid rgba(0,0,0,0.05)",background:"rgba(0,0,0,.05)"}}>
          <List>
            <ListItem button  onClick={()=>{localStorage.clear(); dispatch({type:"CLEAR",payload:null}); history.push('/Signin')}}>
              <ListItemIcon>
              <ExitToApp/>
              </ListItemIcon>

              <Typography variant="p" color="white">Logout </Typography>
            </ListItem>
            
          </List>
      
          </div>
         
      </div>
      </Drawer>
    );
}

export default (DrawerComponent);
