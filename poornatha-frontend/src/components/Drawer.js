import React,{useState} from "react";
import Drawer from "@material-ui/core/Drawer";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import useCheckMobileScreen from "../customHooks/useCheckMobileScreen";

import { makeStyles} from "@material-ui/core/styles";



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
      variant={checkMobileView?"temporary":"permanent"}  BackdropProps={{ invisible: true }} >
         <div
        className={classes.list}
        role="presentation"
        onClick={checkMobileView?props.toggleDrawerHandler:null}
        onKeyDown={props.toggleDrawerHandler}
      >
          <List>
              <ListItem button>
              <ListItemIcon>
              <Avatar src={`https://lh3.googleusercontent.com/ogw/ADea4I6abWYeWhWZrdC_L-pjQA9_5qjSbrvJ7zUpphpjRg=s32-c-mo`}></Avatar>
              </ListItemIcon>
              <ListItemText>  hari21032001</ListItemText>
              </ListItem>
          </List>
         <Divider/> 
        <List>
          {["Inbox", "Starred", "Send email", "Drafts","People"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
      </Drawer>
    );
}

export default (DrawerComponent);
