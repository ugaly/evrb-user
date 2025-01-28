import React, { useState, useEffect } from "react";
import {
  Box, Breadcrumbs, Button, Card, CardContent, CardHeader, Grid, Step, StepLabel, Stepper, TextField, Typography,
  TableBody, TableCell, TableContainer, Table, TableHead, TableRow, Paper, Icon
} from "@mui/material";
import AuthService from "../../services/auth/auth_service";


const Tables = (props) => {
  const root_id = props.location && props.location.state.root_id;
  const [activeStep, setActiveStep] = useState(3);
  const [membershipInfo, setMembershipInfo] = useState('');
  const [membership, setMembership] = useState('');


  useEffect(() => {
    loadMemberShip();
  }, []);

  const loadMemberShip = () => {
    AuthService.getMembership().then(res => {
      console.log('membership', res.data);
      if (res.data.success === true) {
        setMembership(res.data.membership);
      } else {
        setMembership('');
      }
    }).catch(err => {
      console.error("Failed to load referees", err);
      // setReferees([]);
    });
  };



  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (membershipInfo.trim() === '') {
      // Handle validation error (e.g., show a message or highlight the input)
      console.error("Please enter membership information.");
      return;
    }

    const data = {
      subModuleId: root_id,
      membership: membershipInfo,
    };

    AuthService.createMembership(data).then((response) => {
      console.log(response);
      if (response.data.message === 'saved') {
        handleNext();
      }
    });
  
};

return (
  <Box>
    <Box className="mb-6">
      <ol className="flex items-center whitespace-nowrap">
        <li className="inline-flex items-center">
          <a className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" href="#">
            Home
          </a>
          <svg className="flex-shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path>
          </svg>
        </li>
        <li className="inline-flex items-center">
          <a className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" href="#">
            Registration
            <svg className="flex-shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path>
            </svg>
          </a>
        </li>
        <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
          Professional Bodies
        </li>
      </ol>
    </Box>
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Grid container spacing={3} className="mb-4">
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Card>
              <Stepper activeStep={activeStep - 1} alternativeLabel className="mb-8 mt-8">
                {['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'].map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Card>
          </Grid>
        </Grid>
        <Card>
          <CardHeader title="Membership in Professional Bodies" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={8}
                    maxRows={10}
                    fullWidth
                    defaultValue={membership}
                    value={membershipInfo}
                    onChange={(e) => setMembershipInfo(e.target.value)}
                    label="Membership Information"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
                {/* <Button variant="contained" onClick={handleNext} style={{ marginLeft: '10px' }} color="primary">Next</Button> */}
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);
}

export default Tables;
