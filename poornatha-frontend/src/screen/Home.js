import React,{useEffect} from 'react'

import ToolbarComponent from "../components/Toolbar";
import DrawerComponent from "../components/Drawer";
import {useHistory} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';





function Home(props) {

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
    }
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
        <div >
          hai Iam Home
        </div>
        </main>
        </div>
    )
}

export default Home
