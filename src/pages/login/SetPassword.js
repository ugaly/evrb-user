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
import { useLocation } from 'react-router-dom';

function SetPassword(props) {
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
  const [token,setToken] = useState('')

  useEffect(() => {

    setTimeout(()=>{

      loadToken()

    },1000)


  },[]);

  const loadToken = () => {
   // Get the full query string from the window object
  const queryString = window.location.search;
  // Parse the query string using URLSearchParams
  const searchParams = new URLSearchParams(queryString);
  const token = searchParams.get('token');
  //const param2 = searchParams.get('param2');


    console.log('\n\nZacharia......\n\n'+token);

    setToken(token)

  }

  const handleLogin = () => {
    // setIsLoading(true);

    console.log(loginValue);
    console.log(passwordValue);

    if (!loginValue || !passwordValue) {
      return;
    }
     if (loginValue.length < 8) {
      setLoginError("Password must be at least 8 characters");
      return;
    }else{
      setLoginError("");
    }

    if(loginValue!==passwordValue){
      setLoginError("Password must match");
      return;
    }

    const data = {
      'password': passwordValue,
      'token':token
    };

    setIsLoading(true);
    AuthService.activate(data).then(res => {

      setIsLoading(false);
      console.log(res.data)

      if (res.data.success === true) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('fullname', res.data.fullname);
        window.location='/'
      }else{
        if(res.data.message){
          setLoginError(res.data.message);

          if(res.data.message === "Expired Token"){
            setIsLoading(true);
            setLoginError(res.data.message+'...refreshing');
            window.location='/'
          }
        }
      }

      // if (res.data.success === true) {
      //   sessionStorage.setItem('token', res.data.token);
      //   // sessionStorage.setItem('refId', res.data.refId);
      //   sessionStorage.setItem('fullname', res.data.fullname);
      //   // sessionStorage.setItem('category', res.data.category);
      //   // sessionStorage.setItem('regType', res.data.regType);
      //   // setIsLoading(false);


      //   loginUser(
      //     userDispatch,
      //     loginValue,
      //     passwordValue,
      //     props.history,
      //     setIsLoading,
      //     setError,
      //   );

        
      // } else if (res.data.success === false) {
      //   setIsLoading(false);
      //   setLoginError(res.data.message);
      // }
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
            <Tab label="Create New Password" classes={{ root: classes.tab }} />
            {/* <Tab label="New User" classes={{ root: classes.tab }} /> */}
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
                placeholder="New Password"
                type="password"
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
                placeholder="Repeat Password"
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
                    Submit
                  </Button>
                )}
                
              </div>
            </React.Fragment>
          )}
         
        </div>
       
      </div>
    </Grid>
  );
}

export default withRouter(SetPassword);
