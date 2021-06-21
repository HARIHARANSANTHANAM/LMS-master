import React,{useState} from "react";
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
import { makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';



function DrawerComponent(props) {

  const styles =  makeStyles(theme => ({
    list: {
      width: props.DrawerWidth,
      zIndex:-1
    },
    fullList: {
      width: "auto"
    },
    paper: {
      overflowY: 'unset',
      zIndex:-1
    },
  }));
    
  const checkMobileView=useCheckMobileScreen();
    const  classes  = styles();


    return (
      <Drawer open={checkMobileView?props.left:true} onClose={props.toggleDrawerHandler} 
      variant={checkMobileView?"temporary":"permanent"}   >
         <div
        className={classes.list}
        role="presentation"
        onClick={checkMobileView?props.toggleDrawerHandler:null}
        onKeyDown={props.toggleDrawerHandler}
      >
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
          <List>
          <Link to="/" style={{color:"black",textDecoration:"none"}}>
            <ListItem>
              <ListItemIcon>
              <HomeIcon/>
              </ListItemIcon>

              <Typography variant="p">Home </Typography>
            </ListItem>
            </Link>
            <Link to="/Application_Form" style={{color:"black",textDecoration:"none"}}>
            <ListItem>
              <ListItemIcon>
              <ListAltIcon></ListAltIcon>
              </ListItemIcon>

              <Typography variant="p">Application Form </Typography>
            </ListItem>
            </Link>
            
          </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              
              <Typography variant="p">{text}</Typography>
            </ListItem>
          ))}
        </List>
      </div>
      </Drawer>
    );
}

export default (DrawerComponent);
