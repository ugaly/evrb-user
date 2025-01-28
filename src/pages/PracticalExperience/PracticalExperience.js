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
  Icon
} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import mock from "../dashboard/mock";
import Widget from "../../components/Widget";
import { makeStyles } from "@material-ui/styles";

import { useDropzone } from 'react-dropzone';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AuthService from "../../services/auth/auth_service";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const PracticalExperiencePage = (props) => {
  const root_id = props.location && props.location.state.root_id;
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState('');
  const [school, setSchool] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [natureOfValuation, setNatureOfValuation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [nameOfSupervisor, setNameOfSupervisor] = useState('');
  const [activeStep, setActiveStep] = useState(4);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loadedData, setLoadedData] = useState([]);
  const [showAdd,setShowAdd] = useState(false);

  useEffect(() => {
    loadEducation();
    loadExperience();
  }, []);


  const loadExperience = () => {
    AuthService.getPracticalExperience().then(res => {
      console.log('res', res);
      if (res.data.success === true) {
        
        try{
          let data = res.data.results
          setLoadedData(data);

          if(data.length>0){
            setShowAdd(false)
          }else{
            setShowAdd(true)
          }
        }catch(err){
          console.log('err', err);
        }

        

      }
    })
  }

  const submit = async () => {
    console.log('submit', file, level, school, from, to, natureOfValuation, capacity, nameOfSupervisor, uploadedFile);
    // Validate form fields
    if (school === '' || from === '' || to === '' || natureOfValuation === '' || capacity === '' || nameOfSupervisor === '' || uploadedFile === null) {
      // Handle validation error
      alert("All fields are required and file must be uploaded");
      return;
    }

    // Convert year fields to integers
    const fromYear = parseInt(from, 10);
    const toYear = parseInt(to, 10);

    if (isNaN(fromYear) || isNaN(toYear)) {
      alert("Please enter valid years for 'From' and 'To'");
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFile);
   

    const extraData = {
      institution: school,  
      from: fromYear,
      to: toYear,
      nature: natureOfValuation,
      capacity: capacity,
      supervisor: nameOfSupervisor,
      subModuleId: root_id

    };

    formData.append('extra', JSON.stringify(extraData));


    try {
      const response = await AuthService.createPracticalExperience(formData);
      console.log('response', response);
      if (response.data.message === 'saved') {
        // Handle success response
        alert("Saved successfully");
        setShowAdd(false)
        loadExperience();
        setCapacity('');
        setNatureOfValuation('');
        setNameOfSupervisor('');
        setSchool('');
        setFrom('');
        setTo('');
        setUploadedFile(null);
        setFileName('');

      } else {
        alert("Failed to save education info");
      }
    } catch (err) {
      console.error("Failed to submit education info", err);
      alert("Failed to submit education info");
    }
  };

  const handleFileUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    setFileName(file.name);
  };
  const loadEducation = () => {
    // Load education data from server
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  // const handleFileUpload = (acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   setUploadedFile(file);
  //   setFileName(file.name);
  // };

  


  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleFileUpload });




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
          Practical experience
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
            <CardHeader title="Fill Practical experience and training" />
            <CardContent>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField id="school" label="Institution/Firm" value={school} onChange={(e) => setSchool(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField id="from" type="number" label="From" value={from} onChange={(e) => setFrom(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField id="to" type="number" label="To" value={to} onChange={(e) => setTo(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField id="natureOfValuation" label="Nature of Valuation" value={natureOfValuation} onChange={(e) => setNatureOfValuation(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField id="capacity" type="number" label="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField id="nameOfSupervisor" label="Name Of Supervisor" value={nameOfSupervisor} onChange={(e) => setNameOfSupervisor(e.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <div {...getRootProps()} style={{ border: '2px dashed #aaa', borderRadius: '4px', padding: '40px', textAlign: 'center', cursor: 'pointer' }}>
                      <input {...getInputProps()} />
                      {fileName ? (
                        <div>
                          <InsertDriveFileIcon style={{ fontSize: '48px', marginBottom: '1px' }} />
                          <p>{fileName}</p>
                        </div>
                      ) : (
                        <p>Drag & drop Attachment file here, or click to select one</p>
                      )}
                    </div>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Button variant="contained" onClick={submit} color="primary">Submit</Button>
                  {/* <Button variant="contained" onClick={handleNext} style={{ marginLeft: '10px' }} color="primary">Next</Button> */}
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item spacing={3} xs={12}>
          {/* <Widget title="Education levels" upperTitle noBodyPadding bodyClass={classes.tableOverflow}> */}
          <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Institution/Firm</TableCell>
        <TableCell>From</TableCell>
        <TableCell>To</TableCell>
        <TableCell>Nature of Valuation</TableCell>
        <TableCell>Capacity</TableCell>
        <TableCell>Name Of Supervisor</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {loadedData.length > 0 ? (
        loadedData.map(item => (
          <TableRow key={item.id}>
            <TableCell style={{color: 'green', fontWeight: 'bold'}}>{item.institution}</TableCell>
            <TableCell>{item.from}</TableCell>
            <TableCell>{item.to}</TableCell>
            <TableCell>{item.nature}</TableCell>
            <TableCell>{item.capacity}</TableCell>
            <TableCell>{item.supervisor}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell align="center" colSpan={6}>
            <Icon fontSize="small" color="disabled" style={{marginRight: '10px', width: '100%', height: '48px'}}>
              No data available
            </Icon>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>

          {/* </Widget> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default PracticalExperiencePage;
