import React, { useState } from "react";
import {
  Grid,
  Button,
  Box,
  makeStyles,
  Paper,
  FilledInput,
} from "@material-ui/core";
import logo from "../../images/logo.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  loginBox: {
    transform: "translate(-50%, -50%)",
    position: "absolute",
    top: "40%",
    left: "50%",
    width: "500px",
    borderBottom: `5px solid ${theme.palette.secondary.main}`,
  },
  inputWrapper: {
    "& > *": {
      marginBottom: theme.spacing(3),
    },
  },
  btn: {
    fontWeight: 700,
    fontSize: "16px",
    height: "45px",
  },
}));

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  //   const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    history.push("/dashboard");
  };
  return (
    <Grid
      style={{ height: "100vh", width: "100vw" }}
      container
      justify="center"
    >
      <Grid item xs={4}>
        <Box className={classes.loginBox} p={4} component={Paper}>
          <Box mb={5} textAlign="center">
            <img src={logo} />
          </Box>
          <Box className={classes.inputWrapper}>
            <FilledInput fullWidth disableUnderline placeholder="Username" />
            <FilledInput
              type="password"
              fullWidth
              disableUnderline
              placeholder="Password"
            />
            <Button
              onClick={handleLogin}
              fullWidth
              variant="contained"
              color="secondary"
              disableElevation
              className={classes.btn}
            >
              Login
            </Button>

            {/* <Box mt={4} textAlign="center">
              <Button>Do not have an account?</Button>
            </Box> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Auth;
