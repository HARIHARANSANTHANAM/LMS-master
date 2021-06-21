import React,{useEffect} from 'react'
import ToolbarComponent from "../components/Toolbar";
import DrawerComponent from "../components/Drawer";
import {useHistory,Route,Switch,BrowserRouter} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';



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
        <div style={{marginTop:"5%"}}>
          <img src="https://poornatha.com/assets/images/about_9.jpg" alt="" width="50%" style={{objectFit:"cover",height:"60vh"}}/>
          <img src="https://poornatha.com/assets/images/about_1.jpeg" alt="" width="50%" style={{objectFit:"cover",height:"60vh"}}/>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non est bibendum, mollis velit et, varius nulla. Nam quis ultrices eros. Nullam posuere mi at orci fermentum suscipit. Praesent sollicitudin neque arcu, nec pulvinar massa posuere sed. Sed placerat purus in mauris scelerisque eleifend. Integer volutpat egestas justo. Integer ut viverra lectus. Donec eleifend massa vel elit imperdiet rhoncus. Nullam malesuada, lectus non aliquam suscipit, massa mi rhoncus mi, quis vestibulum arcu nibh scelerisque massa. Curabitur gravida augue sed dolor iaculis, et pretium dui rhoncus. Donec iaculis magna non tellus egestas ornare. Fusce vestibulum iaculis sodales. Nunc sed risus fermentum, ultrices ipsum vel, molestie dolor. Sed non nulla ut lectus consequat elementum. In venenatis est imperdiet auctor finibus. Aenean non porttitor ipsum.

Aliquam vehicula nisl nulla, sit amet venenatis tellus commodo at. Sed pulvinar sodales ligula, eu scelerisque urna vulputate sed. Vivamus eget augue id nulla luctus vehicula. Aenean id maximus orci. Mauris nunc massa, ultrices vel elit in, dapibus facilisis sem. Cras nec nisl blandit, dictum nulla viverra, eleifend tortor. Proin in laoreet ipsum.

Sed maximus fermentum erat quis faucibus. Nam quis laoreet quam. Cras vulputate enim viverra libero scelerisque, in rutrum purus feugiat. Nam vel aliquam nunc, eu pharetra justo. Sed iaculis nisi a euismod dignissim. Nullam hendrerit justo eget bibendum facilisis. Fusce condimentum commodo nisl, volutpat tempus dolor volutpat sit amet. Morbi ut lobortis dui, a fringilla tellus. Aliquam non rhoncus libero, vitae consequat dui.

Nulla facilisi. Aenean placerat libero sed pharetra rutrum. Nullam molestie scelerisque massa nec tristique. Maecenas facilisis cursus porttitor. In ut tellus auctor, sagittis ligula nec, venenatis mi. Etiam nunc erat, ullamcorper vitae leo ac, vulputate feugiat quam. Donec placerat varius orci et aliquam. Curabitur ornare ex magna, nec bibendum diam sodales at. Morbi ac tortor eros. Aenean sit amet tortor quis sem pulvinar vehicula. Nullam iaculis felis vel orci dignissim, et sodales libero varius. Nam ac purus aliquet, ornare lorem nec, sagittis enim. Quisque rutrum imperdiet neque, nec convallis magna tempus nec.

In interdum rutrum sapien, id rhoncus nibh sagittis eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id ullamcorper nulla, vel scelerisque enim. Maecenas massa dolor, sodales eget turpis non, sodales cursus dui. Integer vehicula ipsum vel tempus accumsan. Curabitur euismod sodales risus vel finibus. Vivamus dolor dolor, suscipit ac felis a, mollis tincidunt nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis luctus nibh, sed tempor justo tristique et. Curabitur sagittis, felis in convallis placerat, leo libero cursus est, non fermentum lacus urna nec justo. Donec at gravida nibh. Donec non lectus nulla. Duis malesuada lectus sit amet metus vehicula, et imperdiet neque vehicula.
        </div>
        </main>
        </div>
    )
}

export default Home
