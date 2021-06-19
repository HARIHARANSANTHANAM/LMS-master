import React,{useState,createContext,useReducer,useContext,useEffect} from "react";
import { BrowserRouter,Switch,Route } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import Home from './screen/Home';
import Signin from "./screen/Signin";
import Signup from "./screen/Signup";
import ForgetPassword from "./screen/ForgetPassword";
import ResetPassword from "./screen/ResetPassword";
import {useHistory} from 'react-router-dom';
import {reducer,initialState} from './reducers/userReducer';


export const UserContext=createContext();


const Routing=()=>{
  const [left, setleft] = useState(false)
  const  {state,dispatch}=useContext(UserContext);

  const DrawerWidth=230;
  const history=useHistory();

  const user=JSON.parse(localStorage.getItem("token"))
  useEffect(()=>{
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/');
    }
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
