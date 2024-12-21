import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";
import AuthService from "../../services/auth/auth_service";
import { useUserDispatch, loginUser } from "../../context/UserContext";
import logo from "../../images/logo.png";

function Login(props) {
  const classes = useStyles();
  const userDispatch = useUserDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [repeatPasswordValue, setRepeatPasswordValue] = useState("");
  const [hasRegistrationNumber, setHasRegistrationNumber] = useState("no");
  const [registrationType, setRegistrationType] = useState("");
  const [registrationTypes, setRegistrationTypes] = useState([]);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    AuthService.getRegistrationType()
      .then((res) => {
        if (res.status === 200) setRegistrationTypes(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const validateLoginFields = () => {
    if (!loginValue || !passwordValue) {
      setError("Enter username and password");
      return false;
    }
    if (passwordValue.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const validateNewUserFields = () => {
    setPasswordError("");
    setRepeatPasswordError("");
    setEmailError("");

    if (passwordValue !== repeatPasswordValue) {
      setRepeatPasswordError("Passwords do not match");
      return false;
    }
    if (passwordValue.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginValue)) {
      setEmailError("Enter a valid email");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (isLoading || !validateLoginFields()) return;

    const data = { username: loginValue, password: passwordValue };
    setIsLoading(true);

    AuthService.login(data)
      .then((res) => {
        //console.log(res.data);
        if (res.data.success) {

          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("fullname", loginValue);

          loginUser(
            userDispatch,
            loginValue,
            passwordValue,
            props.history,
            () => setIsLoading(false),
            setError
          );

        } else {
          setIsLoading(false);
          setLoginError(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const handleCreateAccount = () => {
    if (isLoading || !validateNewUserFields()) return;

    const authorityId = registrationTypes.find((type) => type.name === registrationType)?.id || null;
    const username = hasRegistrationNumber === "yes" ? registrationNumber : null;

    const data = { username, password: passwordValue, email: loginValue, authorityId };

    setIsLoading(true);
    AuthService.createToken(data)
      .then((res) => {
        setIsLoading(false);
        if (res.data.success) {
          alert("Validation link sent to your email. Please check your email.");
          setActiveTabId(0);
        } else {
          setError(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer} style={{ backgroundColor: "#cba135" }}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Integrity and Fairness</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" />
            <Tab label="New User" />
          </Tabs>
          {activeTabId === 0 && (
            <>
              <Fade in={!!loginError}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {loginError}
                </Typography>
              </Fade>
              <TextField
                placeholder="Registration Number"
                fullWidth
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
              />
              <TextField
                placeholder="Password"
                type="password"
                fullWidth
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={handleLogin}
                    disabled={!loginValue || !passwordValue}
                    variant="contained"
                    size="large"
                    style={{
                      fontWeight: "bold",
                      backgroundColor: loginValue && passwordValue ? "#cba135" : "#ccc",
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </>
          )}
          {activeTabId === 1 && (
            <>
              <Fade in={!!error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {error}
                </Typography>
              </Fade>
              <TextField
                placeholder="Email Address"
                fullWidth
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
                error={!!emailError}
                helperText={emailError}
              />
              <FormControl margin="normal">
                <FormLabel>Do you have a registration number?</FormLabel>
                <RadioGroup
                  row
                  value={hasRegistrationNumber}
                  onChange={(e) => setHasRegistrationNumber(e.target.value)}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              {hasRegistrationNumber === "yes" && (
                <TextField
                  placeholder="Registration Number"
                  fullWidth
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  margin="normal"
                />
              )}
              {hasRegistrationNumber === "no" && (
                <FormControl fullWidth margin="normal">
                  <Select
                    value={registrationType}
                    onChange={(e) => setRegistrationType(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Registration Type
                    </MenuItem>
                    {registrationTypes.map((type) => (
                      <MenuItem key={type.id} value={type.name}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <TextField
                placeholder="Password"
                type="password"
                fullWidth
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                error={!!passwordError}
                helperText={passwordError}
              />
              <TextField
                placeholder="Repeat Password"
                type="password"
                fullWidth
                value={repeatPasswordValue}
                onChange={(e) => setRepeatPasswordValue(e.target.value)}
                margin="normal"
                error={!!repeatPasswordError}
                helperText={repeatPasswordError}
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={handleCreateAccount}
                    disabled={
                      !loginValue ||
                      !passwordValue ||
                      !repeatPasswordValue ||
                      (hasRegistrationNumber === "yes" && !registrationNumber) ||
                      (hasRegistrationNumber === "no" && !registrationType)
                    }
                    variant="contained"
                    size="large"
                    style={{
                      fontWeight: "bold",
                      backgroundColor:
                        loginValue &&
                        passwordValue &&
                        repeatPasswordValue &&
                        ((hasRegistrationNumber === "yes" && registrationNumber) ||
                          (hasRegistrationNumber === "no" && registrationType))
                          ? "#cba135"
                          : "#ccc",
                    }}
                  >
                    Create your account
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
