import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import logo from "../assets/poornatha_logo1.png";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles ,fade } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import http from "../httpService/http";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
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
    width: "100px",
    height: "100px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    }
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_no, setPhoneNumber] = useState(0);
  const [email, setEmail] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [new_password, setNewPassword] = useState("");
  const [password, setRetypePassword] = useState("");
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [boxChecked, setBoxChecked] = useState(false);

  const [emailError, setEmailError] = useState({
    error: false,
    helperText: "",
  });

  const [fnameError, setFnameError] = useState({
    error: false,
    helperText: "",
  });

  const [phoneError, setPhoneError] = useState({
    error: false,
    helperText: "",
  });

  const [passError, setPassError] = useState({
    error: false,
    helperText: "",
  });

  const [confirmPassError, setConfirmPassError] = useState({
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
      setSubmitDisabled(true);
      console.log(emailError.helperText);
    } else {
      setEmailError({ helperText: "", error: false });
      setSubmitDisabled(false);
    }
  };

  const validateFname = (e) => {
    if (e.target.value.trim().length < 3) {
      setFnameError({ helperText: "Enter atleast 2 letters.", error: true });
      setSubmitDisabled(true);
    } else {
      setFnameError({ helperText: "", error: false });
      setSubmitDisabled(false);
    }
  };

  const validatePhone = (e) => {
    if (e.target.value.trim().length !== 10) {
      setPhoneError({ helperText: "Enter a valid Phone number!", error: true });
      setSubmitDisabled(true);
    } else {
      setPhoneError({ helperText: "", error: false });
      setSubmitDisabled(false);
    }
  };

  const validatePass = (e) => {
    const az = new RegExp("^(?=.*[a-z])");
    const AZ = new RegExp("^(?=.*[A-Z])");
    const num = new RegExp("(?=.*[0-9])");
    const min = new RegExp("(?=.{8,})");

    var text =
      "Must Contain atleast 1 lowercase alphabet \n  Must Contain atleast 1 uppercase alphaber\nMust contain atleast 1 number\n Must be of atleast 8 character length.";

    if (!min.test(e.target.value)) {
      setPassError({
        helperText: "Must be of atleast 8 character length.",
        error: true,
      });
      setSubmitDisabled(true);
    } else if (!az.test(e.target.value)) {
      setPassError({
        helperText: "Must Contain atleast 1 lowercase alphabet.",
        error: true,
      });
      setSubmitDisabled(true);
    } else if (!AZ.test(e.target.value)) {
      setPassError({
        helperText: "Must Contain atleast 1 uppercase alphabet.",
        error: true,
      });
      setSubmitDisabled(true);
    } else if (!num.test(e.target.value)) {
      setPassError({
        helperText: "Must contain atleast 1 number.",
        error: true,
      });
      setSubmitDisabled(true);
    } else {
      setPassError({
        helperText: "",
        error: false,
      });
      setSubmitDisabled(false);
    }
  };

  const confirmPass = (e) => {
    if (new_password !== e.target.value) {
      setConfirmPassError({
        error: true,
        helperText: "Password Doesn't Match!",
      });
      setSubmitDisabled(true);
    } else {
      setConfirmPassError({
        error: false,
        helperText: "",
      });
      setSubmitDisabled(false);
    }
  };

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    validateEmail(e);
    setEmail(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    validatePhone(e);
    console.log(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    validateFname(e);
    console.log(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    console.log(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    validatePass(e);
    console.log(e.target.value);
  };
  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
    confirmPass(e);
    console.log(e.target.value);
  };
  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      first_name,
      last_name,
      password,
      email,
      phone_no,
    };
    http
      .post("/auth/Signup", user)
      .then((res) => {
        console.log(res);
        let { error, success } = res;
        if (error) {
          setLoading(false);
          toast.error("User already exists..");
        }
        if (success) {
          http
            .post("/auth/User_Validate", { email: user.email })
            .then((res) => {
              console.log(res);
              if (res.statusText === "OK") {
                console.log("Redirected Successfully");
              } else {
                setLoading(false);
                console.log("Redirection failed.. try again!");
              }
            });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
    {isLoading ? <LinearProgress color="primary" /> : <></>}
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
            Sign up
          </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                onChange={handleFirstNameChange}
                label="First Name"
                autoFocus
                error={fnameError.error}
                helperText={fnameError.helperText}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={handleLastNameChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleEmailChange}
                autoComplete="email"
                error={emailError.error}
                helperText={emailError.helperText}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                type="number"
                onChange={handlePhoneNumberChange}
                autoComplete="phone"
                error={phoneError.error}
                helperText={phoneError.helperText}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="set_password"
                label="Enter New Password"
                type="password"
                onChange={handleNewPasswordChange}
                id="set_password"
                autoComplete
                error={passError.error}
                helperText={passError.helperText}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="current_password"
                label="Retype New Password"
                type="password"
                id="current_password"
                onChange={handleRetypePasswordChange}
                autoComplete="current-password"
                error={confirmPassError.error}
                helperText={confirmPassError.helperText}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    onClick={() => {
                      setBoxChecked(!boxChecked);
                    }}
                    checked={boxChecked}
                  />
                }
                label="Accept the terms and conditions of Poornatha Partnering Entrepreneurs"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleUserFormSubmit}
            disabled={submitDisabled}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/Signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}
