import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Button, Card, CardContent, CardHeader, FormControl, FormLabel, Grid, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  Icon } from "@mui/material";
  import Widget from "../../components/Widget";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AuthService from "../../services/auth/auth_service";

const NotificationsPage = (props) => {
  const root_id = props.location && props.location.state.root_id;

  const [activeStep, setActiveStep] = useState(5);

  const [referee1, setReferee1] = useState('');
  const [referee2, setReferee2] = useState('');
  const [referees, setReferees] = useState([]);
  const [showAdd,setShowAdd] = useState(false);


  
  useEffect(() => {
    loadReferees();
  }, []);

  const loadReferees = () => {
    AuthService.getReferees().then(res => {
      console.log('referees', res);
      if (res.data.success === true) {
        setReferees(res.data.results);
      } else {
        setReferees([]);
      }
    }).catch(err => {
      console.error("Failed to load referees", err);
      setReferees([]);
    });
  };
  const submit = () => {
    console.log(referee1, referee2, root_id);
    if (referee1 === '' || referee2 === '') {
      // Handle validation error
      return;
    }

    const data = {
      'referee1': referee1,
      'referee2': referee2,
      'subModuleId': root_id
    };
    
    
    AuthService.createReferee(data).then((response) => {
      console.log(response);
      if (response.data.message === 'saved') {
        alert('Referee created successfully');
        setReferee1('')
        setReferee2('')
        setShowAdd(false)
      }
    })
  };

 
 
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box>
      <Box className="mb-6">

        <ol class="flex items-center whitespace-nowrap">
          <li class="inline-flex items-center">
            <a class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" href="#">
              Home
            </a>
            <svg class="flex-shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round"></path>
            </svg>
          </li>
          <li class="inline-flex items-center">
            <a class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" href="#">
              Registration
              <svg class="flex-shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round"></path>
              </svg>
            </a>
          </li>
          <li class="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
          Referees
          </li>
        </ol>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Grid container spacing={3} className="mb-4">
            <Grid item spacing={3} xs={12} md={12} lg={12} xl={12}>
              <Card>
                <Stepper activeStep={activeStep - 1} alternativeLabel className="mb-8 mt-8">
                  {['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'].map((label, index) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Card>
            </Grid>
          </Grid>

          <Button  variant="contained" style={{display: !showAdd ? 'block' : 'none',float:'right'}} onClick={()=>{
                        setShowAdd(true);
                    }}>Add New</Button>

          <Card style={{display: showAdd ? 'block' : 'none'}}>
            <CardHeader title="Fill Referees Info Below" />
            <CardContent>
              <form>
                <Grid container spacing={3}>
                  
                  <Grid item xs={12} md={12}>
                  <TextField id="referee1" label="Referee No 1 (Registration No)" value={referee1} onChange={(e) => setReferee1(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} md={12}>
                  <TextField id="referee2" label="Referee No 2 (Registration No)" value={referee2} onChange={(e) => setReferee2(e.target.value)} fullWidth />
                  </Grid>
                  
                </Grid>
                <Box mt={2}>
                <Button variant="contained" onClick={submit} color="primary">Submit</Button>
                  <Button variant="contained" onClick={handleNext} style={{ marginLeft: '10px' }} color="primary">Next</Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>


        <Grid item spacing={3} xs={12}>
          <Widget title="Referees" upperTitle noBodyPadding >
          <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Registration Number</TableCell>
                      <TableCell>Full Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {referees.length > 0 ? (
                      referees.map(referee => (
                        <TableRow key={referee.id}>
                          <TableCell>{referee.registrationNo}</TableCell>
                          <TableCell>{referee.fullName}</TableCell>
                          <TableCell>{referee.email}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={4}>
                          <Icon fontSize="small" color="disabled" style={{ marginRight: '10px', width: '100%', height: '48px' }}>No data available</Icon>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
          </Widget>
        </Grid>



      </Grid>
    </Box>
  );
}

export default NotificationsPage;
