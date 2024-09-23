import React, { useEffect, useState } from "react";
import {
  Box, Breadcrumbs, Button, Card, CardContent, CardHeader, FormControl, FormLabel, Grid, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  Icon,
  Radio
} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import mock from "../dashboard/mock";
import Widget from "../../components/Widget/Widget";
import { makeStyles } from "@material-ui/styles";

import { useDropzone } from 'react-dropzone';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const TemporaryRegistration = (props) => {
  const classes = useStyles();
  const [education, setEducation] = useState([]);
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState('');
  const [school, setSchool] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [award, setAward] = useState('');
  const [activeStep, setActiveStep] = useState(4);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };




  return (
    <Box>
      <Box className="mb-6">
        {/* <Card>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="#" underline="hover">
              Home
            </Link>
            <Link color="inherit" href="#" underline="hover">
              Users
            </Link>
            <Link color="textPrimary" href="#" underline="none">
              Add New User
            </Link>
          </Breadcrumbs>
          </Card> */}

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
            Temporary-Registration
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
          <Card>
            <CardHeader title="Temporary Registration" />
            <CardContent>

              <Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date of Stay</TableCell>
                        <TableCell>Registration Number</TableCell>
                        <TableCell>Assignment Undertaken</TableCell>
                        <TableCell>Consulting Firm</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Placeholder for table rows */}
                      <TableRow>
                        <TableCell align="center" colSpan={4}>
                          <Icon fontSize="small" color="disabled" style={{ marginRight: '10px', width: '100%', }}>No data available</Icon>

                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

              
              </Box>
            </CardContent>
          </Card>

          <Card  style={{ marginTop: '24px' }}>
            <CardContent>
              <Box>

                  <Box>
                    <Typography variant="body1">Are you currently stationed in Tanzania?</Typography>
                    <Box>
                      <Radio /> YES
                    </Box>
                    <Box>
                      <Radio /> NO
                    </Box>
                    <Box marginTop="24px">
                      <Typography className="mt-5" variant="body1">Dates of intended arrival (From)</Typography>
                      <TextField type="date" fullWidth />
                    </Box>
                    <Box marginTop="12px">
                      <Typography variant="body1">Expected duration of Stay (To)</Typography>
                      <TextField type="date" fullWidth />
                    </Box>
                  </Box>

                </Box>

                <Box marginTop="24px">
                  <Button variant="contained" color="primary" style={{ marginRight: '12px' }}>
                    Save
                  </Button>
                  <Button variant="contained" color="primary">
                    Next
                  </Button>
                </Box>
            </CardContent>
          </Card>
        </Grid>


      </Grid>
    </Box>
  );
}

export default TemporaryRegistration;

