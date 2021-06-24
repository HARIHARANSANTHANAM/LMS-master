
import React,{useEffect} from 'react'
import ToolbarComponent from "../components/Toolbar";
import DrawerComponent from "../components/Drawer";
import {useHistory} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function ApplicationForm(props) {
    
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: props.DrawerWidth,
      [theme.breakpoints.up('md')]: {
        marginLeft: props.DrawerWidth
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


  const classes = useStyles();

    const user=JSON.parse(localStorage.getItem("token"));
    const history=useHistory();
    useEffect(()=>{
      if(!user){
        history.push('/Signin');
      }
    },[])
    return (
        <div>
              <ToolbarComponent openDrawerHandler={props.openDrawer} DrawerWidth={props.DrawerWidth} />
        <DrawerComponent
          left={props.left}
          toggleDrawerHandler={props.toggleDrawer}
          DrawerWidth={props.DrawerWidth}
        />
         <main className={clsx(classes.content)}> 
        <div style={{marginTop:"5%"}}>
      
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf_0bMmOThn9AWUotU73oQlh5q93ysViVKcLKWzjKMBRrJfxA/viewform?embedded=true" scrolling="no" width="100%" height="6500" frameborder="0" marginheight="0" marginwidth="0">
        <Backdrop className={classes.backdrop} open={true} >
        <CircularProgress color="inherit" />
      </Backdrop>
        </iframe>
         </div>
        </main>
        </div>
    )
}

export default ApplicationForm
