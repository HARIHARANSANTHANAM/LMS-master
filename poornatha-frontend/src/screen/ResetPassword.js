import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";
import { makeStyles ,fade} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import http from "../httpService/http";
import { useHistory } from "react-router-dom";
import logo from "../assets/poornatha_logo1.png";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
    },
  },
}));

export default function ResetPassword(props) {
  const classes = useStyles();
  const [new_password, setNewPassword] = useState("");
  const [password, setRetypePassword] = useState("");
  console.log(props.match.params._id);
  const [isLoading, setLoading] = useState(false);
  const history=useHistory();

  const [passError, setPassError] = useState({
    error: false,
    helperText: "",
  });

  const [confirmPassError, setConfirmPassError] = useState({
    error: false,
    helperText: "",
  });

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
    } else if (!az.test(e.target.value)) {
      setPassError({
        helperText: "Must Contain atleast 1 lowercase alphabet.",
        error: true,
      });
    } else if (!AZ.test(e.target.value)) {
      setPassError({
        helperText: "Must Contain atleast 1 uppercase alphabet.",
        error: true,
      });
    } else if (!num.test(e.target.value)) {
      setPassError({
        helperText: "Must contain atleast 1 number.",
        error: true,
      });
    } else {
      setPassError({
        helperText: "",
        error: false,
      });
    }
  };

  const confirmPass = (e) => {
    if (new_password != e.target.value) {
      setConfirmPassError({
        error: true,
        helperText: "Password Doesn't Match!",
      });
    } else {
      setConfirmPassError({
        error: false,
        helperText: "",
      });
    }
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
    console.log(new_password);
    setLoading(true);
    const user = {
      password,
    };
    http
      .patch(`/auth/ResetPassword/${props.match.params._id}`, user)
      .then((res) => {
        toast.success("Reset Successful!!");
        console.log(res);
        setLoading(false);
        history.push('/Signin');
      })
      .catch((err) => {console.log(err);
        setLoading(false);});
  };
  return (
    <>
      <ToastContainer> </ToastContainer>
      <Container component="main" maxWidth="xs">
        {isLoading ? <LinearProgress color="primary" /> : <></>}

        <CssBaseline />
        <div className={classes.paper}>
          
          <div>
          <img src={logo} alt="Poornatha" style={{ width: "50px" }} />
        </div>
       
        <Typography component="h1" variant="h5">
            Poornatha
          </Typography>
          <Typography component="h5" variant="body2">
          Reset Password
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
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
                  autoComplete="set-password"
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleUserFormSubmit}
              disabled={!new_password || !password || confirmPassError.error || passError.error}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/Signin" variant="body2">
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
