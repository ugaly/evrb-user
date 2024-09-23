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
import classnames from "classnames";
import AuthService from "../../services/auth/auth_service";

// styles
import useStyles from "./styles";

// logo
import logo from "../../images/logo.png";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  const classes = useStyles();

  // global
  const userDispatch = useUserDispatch();

  // local
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
  const [passwordLoginError, setPasswordLoginError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    AuthService.getRegistrationType().then((res) => {
      if (res.status === 200) {
        setRegistrationTypes(res.data);
      }
    }).catch((e) => {
      console.log(e);
    });
  }, []);

  const handleCreateAccount = () => {
    setPasswordError("");
    setRepeatPasswordError("");

    if (passwordValue !== repeatPasswordValue) {
      setRepeatPasswordError("Passwords do not match");
      return;
    } else if (passwordValue.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginValue)) {
      setEmailError("Enter valid email");
      return;
    }

    const authorityId = registrationTypes.find(type => type.name === registrationType)?.id || null;
    const username = hasRegistrationNumber === "yes" ? registrationNumber : null;

    const data = {
      'username': username,
      'password': passwordValue,
      'email': loginValue,
      'authorityId': authorityId
    };
    console.log(data);

    AuthService.createToken(data).then(res => {
      console.log(res);
      if (res.status === 200) {
        sessionStorage.setItem('token', res.data.token);
        alert("Validation link sent to your email, please check your email.");
        setActiveTabId(0);
      }
    }).catch(e => {
      console.log(e);
    });
  };

  const handleLogin = () => {
    // setIsLoading(true);
    if (!loginValue || !passwordValue) {
      return;
    } else if (passwordLoginError.length < 8) {
      setPasswordLoginError("Password must be at least 8 characters");
      return;
    }

    const data = {
      'username': loginValue,
      'password': passwordValue
    };

    AuthService.login(data).then(res => {
      if (res.data.success === true) {
        sessionStorage.setItem('token', res.data.token);
        // sessionStorage.setItem('refId', res.data.refId);
        sessionStorage.setItem('fullname', res.data.fullname);
        // sessionStorage.setItem('category', res.data.category);
        // sessionStorage.setItem('regType', res.data.regType);
        // setIsLoading(false);


        loginUser(
          userDispatch,
          loginValue,
          passwordValue,
          props.history,
          setIsLoading,
          setError,
        );

        
      } else if (res.data.success === false) {
        setIsLoading(false);
        setLoginError(res.data.message);
      }
    }).catch(e => {
      console.log(e);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer} style={{ backgroundColor: '#cba135' }}>
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
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Fade in={loginError}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {loginError}
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Registration Number"
                type="text"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                onKeyPress={handleKeyPress}
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    color="primary"
                    style={{
                      fontWeight: 'bold',
                      ...(passwordValue.length === 0 ? { opacity: 0.5 } : { backgroundColor: '#cba135' })
                    }}
                    disabled={loginValue.length === 0 || passwordValue.length === 0}
                    onClick={handleLogin}
                    variant="contained"
                    size="large"
                    error={Boolean(passwordLoginError)}
                    helperText={passwordLoginError}
                  >
                    Login
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {error}
                </Typography>
              </Fade>
              <TextField
                id="email"
                margin="normal"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                placeholder="Email Address"
                type="email"
                fullWidth
                error={Boolean(emailError)}
                helperText={emailError}
              />
              <FormControl margin="normal" component="fieldset" className={classes.formControl}>
                <FormLabel margin="normal" component="legend">Do you have a registration number?</FormLabel>
                <RadioGroup
                  aria-label="has-registration-number"
                  name="hasRegistrationNumber"
                  value={hasRegistrationNumber}
                  onChange={(e) => setHasRegistrationNumber(e.target.value)}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              {hasRegistrationNumber === "yes" && (
                <TextField
                  id="registration-number"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={registrationNumber}
                  onChange={e => setRegistrationNumber(e.target.value)}
                  margin="normal"
                  placeholder="Registration Number"
                  type="text"
                  fullWidth
                />
              )}
              {hasRegistrationNumber === "no" && (
                <FormControl margin="normal" className={classes.formControl} fullWidth>
                  <Select
                    value={registrationType}
                    onChange={(e) => setRegistrationType(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select registration type' }}
                  >
                    <MenuItem value="" disabled>Select Registration Type</MenuItem>
                    {registrationTypes.map(type => (
                      <MenuItem key={type.id} value={type.name}>{type.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
              <TextField
                id="repeat-password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={repeatPasswordValue}
                onChange={e => setRepeatPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Repeat Password"
                type="password"
                fullWidth
                error={Boolean(repeatPasswordError)}
                helperText={repeatPasswordError}
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={handleCreateAccount}
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      repeatPasswordValue.length === 0 ||
                      (hasRegistrationNumber === "yes" && registrationNumber.length === 0) ||
                      (hasRegistrationNumber === "no" && registrationType.length === 0)
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    // style={{ fontWeight: 'bold', backgroundColor: '#cba135' }}
                    style={{

                      fontWeight: 'bold',
                      ...(loginValue.length === 0 ||
                        passwordValue.length === 0 ||
                        // registrationNumber.length === 0 ||
                        repeatPasswordValue.length === 0

                        ? { opacity: 0.5 }
                        : { backgroundColor: '#cba135', })

                    }}
                  >
                    Create your account
                  </Button>


                )}
              </div>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2021-2024 Geology. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
