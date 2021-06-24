import React,{useState,createContext,useReducer,useContext,useEffect} from "react";
import { BrowserRouter,Switch,Route } from "react-router-dom";
import Home from './screen/Home';
import Signin from "./screen/Signin";
import Signup from "./screen/Signup";
import ForgetPassword from "./screen/ForgetPassword";
import ResetPassword from "./screen/ResetPassword";
import {useHistory} from 'react-router-dom';
import {reducer,initialState} from './reducers/userReducer';
import axios from 'axios';
import ApplicationForm from "./screen/ApplicationForm";
import jwt_decode from 'jwt-decode';

export const UserContext=createContext();


const Routing=()=>{
  const [left, setleft] = useState(false)
  const  {state,dispatch}=useContext(UserContext);

  const DrawerWidth=230;
  const history=useHistory();

  // const refreshtokens=(user)=>{
  //   console.log("called refresh")
  //   try{
  //   const result=jwt_decode(user);
  //   console.log(result);
    
  //   }
  //   catch(e)
  //   {
  //     console.log(e.message)
  //   }
  //   axios.interceptors.request.use(async (config)=>{
  //       const result=jwt_decode(user);
  //       var dateNow = new Date();
  //       if(result.exp < dateNow.getTime())
  //       {
  //         axios.post('/auth/RefreshToken',user)
  //         .then(res=> res.json())
  //         .then(res=>{
  //           localStorage.setItem("token", JSON.stringify(res.data.token));
  //           dispatch({type:"USER",payload:user})
  //           localStorage.setItem("refresh-token",JSON.stringify(res.data.refreshToken));
  //         })
  //       }
  //       console.log(result);
  //   })
  // }
  const user=JSON.parse(localStorage.getItem("token"))
  useEffect(()=>{
    if(user){
      dispatch({type:"USER",payload:user})
    }
   // refreshtokens(user);
  },[state])

  const toggleDrawer = () => {
    setleft(false);
  };

  const openDrawer = () => {
      setleft(!left)
  };

  return(
    <Switch>
      
    <Route path="/Signin" >
      <Signin/>
    </Route>
    <Route path="/Signup">
      <Signup/>
    </Route>
    <Route path="/ForgetPassword">
      <ForgetPassword/>
    </Route>
    <Route path="/ResetPassword/:_id" component={ResetPassword}>
    </Route>
    <Route path="/Application_Form">
            <ApplicationForm left={left} toggleDrawer={toggleDrawer} openDrawer={openDrawer} DrawerWidth={DrawerWidth}/>  
    </Route>         
    <Route exact path="/Home">
      <Home left={left} toggleDrawer={toggleDrawer} openDrawer={openDrawer} DrawerWidth={DrawerWidth}/>   
    </Route>
    <Route exact path="/">
      <Home left={left} toggleDrawer={toggleDrawer} openDrawer={openDrawer} DrawerWidth={DrawerWidth}/>   
    </Route>
    
  </Switch>
  )
}


function App() {
  const[state,dispatch]=useReducer(reducer,initialState);

 

    return (
      <>
      <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
      <Routing />
      </BrowserRouter>
      </UserContext.Provider>
      </>
    );
  
}
export default App;
