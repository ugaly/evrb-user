

import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from './images/logo.png'; // Replace './resources/img/logo.png' with your actual logo file path
import Nembo from './images/nembo.png'; // Replace './resources/img/nembo.png' with your actual nembo file path

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#edeef0',
    fontFamily: 'Roboto',
    fontSize: 14,
  },
  searchRow: {
    background: '#cba135',
    color: '#fff',
    padding: 4,
    float: 'left',
    width: '100%',
  },
  links: {
    float: 'right',
    marginRight: 60,
  },
  nemboRow: {
    textAlign: 'center',
    padding: 8,
  },
  logo: {
    height: 70,
  },
  rowLink: {
    backgroundColor: '#cba135',
    paddingLeft: 48,
    float: 'left',
    width: '100%',
  },
  rowLinkItem: {
    padding: 8,
    color: '#fff',
    fontWeight: 700,
    fontSize: 20,
    float: 'left',
  },
  body: {
    float: 'left',
    backgroundColor: '#fff',
    padding: '0 40px',
    width: '100%',
    minHeight: '70vh',
  },
  button: {
    padding: '6px 16px',
    margin: 1,
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#cba135',
    color: '#fff',
    fontWeight: 'bold',
  },
}));

function Landing() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container maxWidth="md">
        <div className={classes.searchRow}>
          {/* <div className={classes.links}>
            <span>FAQ's</span>
            <span>English</span>
            <span>Swahili</span>
          </div> */}


          <div style={{ display: { xs: 'none', md: 'flex' } }} className={classes.lins}>
            <Button component={Link} to="/" color="inherit" sx={{ mr: 2 }}>
              Home
            </Button>
            {/* Add more links as needed */}
            <Button component={Link} to="/faqs" color="inherit" sx={{ mr: 2 }}>
              FAQs
            </Button>
            <Button component={Link} to="/contact" color="inherit">
              Contact
            </Button>
          </div>
        </div>
        <div className={classes.nemboRow}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <img src={Nembo} alt="Nembo" className={classes.logo} />
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ color: '#cba135', fontSize: 16 }}>
                The United Republic of Tanzania
              </Typography>
              <Typography variant="h1" style={{ color: '#026e28', fontWeight: 'bold', fontSize: 32, textShadow: '4px 4px 1px #ccc' }}>
                VALUERS REGISTRATION BOARD
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <img src={Logo} alt="Logo" className={classes.logo} />
            </Grid>
          </Grid>
        </div>
        <div className={classes.rowLink}>
          <div className={classes.rowLinkItem} onClick={() => { sessionStorage.clear(); window.location.reload(); }}>
            <span className="fa fa-home" />Home
          </div>
          {/* Add more links here */}
        </div>
        <div className={classes.body}>
          <button
          //  className={classes.button} 
           onClick={() => { window.location = '/login/vrb/registration/full'; }}>
            Full Registration
          </button>


          <button onClick={() => { window.location = '/login/vrb/registration/temporary' }}>
            Temporary Registration
          </button>
          <button onClick={() => { window.location = '/login/vrb/registration/provision' }}>
            Provision Registration
          </button>
          <button onClick={() => { window.location = '/login/vrb/registration/enlistment' }}>
            Enlistment Registration
          </button>
          <button onClick={() => { window.location = '/login/vrb/registration/firm' }}>
            Firm Registration
          </button>



        </div>
      </Container>
    </div>
  );
}

export default Landing;




