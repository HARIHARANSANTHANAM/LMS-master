import React,{useEffect} from 'react'
import ToolbarComponent from "../components/Toolbar";
import DrawerComponent from "../components/Drawer";
import {useHistory} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import {Grid,Typography} from '@material-ui/core';


function Home(props) {

  const useStyles = makeStyles((theme) => ({
    content: {
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
        <div style={{marginTop:"5%"}}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} style={{height:"50vh"}}>
             <img src="https://poornatha.com/assets/images/about_1.jpeg" width="100%" height="100%" style={{objectFit:"cover"}}alt=""/>
          </Grid> 
            
          <Grid item  xs={12} sm={12} md={6}>
             <img src="https://poornatha.com/assets/images/about_6.jpeg" alt="" width="100%"/>
            </Grid> 
            <Grid item  xs={12} sm={12} md={6} >
             <img src="https://poornatha.com/assets/images/about_3.jpg" alt="" width="100%" height="100%" />
            </Grid> 
        </Grid>
        <p>
            <h1>Our Vision</h1>
            <h3>
                Growing up, we witnessed both the struggles and growth of SME
                (Small and Medium Enterprises) entrepreneurs alike. We
                understood that the challenges of small and medium entrepreneurs
                are unique and requires a more nuanced approach which is
                different from what generally works for larger corporations. Our
                own aspiration to take up entrepreneurship coupled with burning
                desire to support SME entrepreneurs gave birth to Poornatha!
              
            </h3>
            <h1>Our Motivation</h1>
            <h3>
                Poornatha aims to make world class knowledge in
                entrepreneurship, lea Poornatha is a capacity building
                organizations, in the pursuit of propelling nation's growth by
                empowering Individuals and Institutions. We partner with
                entrepreneurs to enable them gain confidence in decision making,
                and create and maintain a culture of trust. We aim at creating
                an overarching ecosystem by offering diagnostic tools, coaching,
                and a support system to enable MSME business leaders to identify
                areas of growth and increase the confidence to make effective
                business decisions.
            </h3>
          </p>
         
         
         </div>
        </main>
        </div>
    )
}

export default Home
