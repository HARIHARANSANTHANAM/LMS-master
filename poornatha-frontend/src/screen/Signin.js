import React, { useState, useContext, useEffect } from "react";
// eslint-disable-next-line
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, fade } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import http from "../httpService/http";
import logo from "../assets/poornatha_logo1.png";
import { UserContext } from "../App";

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LinearProgress from "@material-ui/core/LinearProgress";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.poornatha.com/">
        Poornatha Partnering Entrepreneurs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [indicator, setIndicator] = useState("");
  const [showpassword, setshowpassword] = useState(false)

  const [emailError, setEmailError] = useState({
    error: false,
    helperText: "",
  });

  const validateEmail = (e) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(e.target.value)) {
      setEmailError({
        helperText: "Enter a valid Email Address!",
        error: true,
      });
      console.log(emailError);
    } else {
      setEmailError({
        helperText: "",
        error: false,
      });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e);
    console.log(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const handleCapslockIdentifier = (event) => {
    if (event.getModifierState("CapsLock")) {
      console.log("Capslock is called");
      setIndicator("CapsLock is On");
    } else {
      setIndicator("");
    }
  };

  const user = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push("/");
    }
  }, [state]);

  const handleLoginUserSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
      rememberMe,
    };
    setLoading(true);

    http
      .post("/auth/Signin", user)
      .then((res) => {
        setLoading(false);
        if (res.data.token) {
          console.log(res.data.token);
          console.log(res);
          localStorage.setItem("token", JSON.stringify(res.data.token));
          dispatch({ type: "USER", payload: res.data.token });
          toast.success("SignedIn Successfully");
          history.push("/");
        } else {
          console.log(res);
          setLoading(false);
          toast.error("Invalid Username or Password");
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  return (
    <div>
      {isLoading ? <LinearProgress color="primary" /> : <></>}
      <ToastContainer></ToastContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div>
            <img src={logo} alt="Poornatha" style={{ width: "50px" }} />
          </div>
          <Typography component="h1" variant="h5">
            Poornatha
          </Typography>
          <Typography component="h5" variant="body2">
            Sign in
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleEmailChange}
              autoComplete="email"
              autoFocus
              error={emailError.error}
              helperText={emailError.helperText}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showpassword?"text":"password"}
              onKeyDown={handleCapslockIdentifier}
              onChange={handlePasswordChange}
              error={indicator}
              helperText={indicator}
              autoComplete="current-password"
            />
             <FormControlLabel
              control={<Checkbox value="showpassword" color="primary" />}
              onChange={() => {
                setshowpassword(!showpassword);
              }}
              label="Show Password"
            /><br></br><br></br>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={(e) => handleLoginUserSubmit(e)}
              disabled={!email || !password || emailError.error}
            >
              Sign In
            </Button>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              onChange={() => {
                setRememberMe(!rememberMe);
              }}
              label="Remember me"
            />
            <Grid container>
              <Grid item xs>
                <Link href="/ForgetPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
