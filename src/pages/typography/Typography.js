import React, { useEffect, useState } from "react";
import {
    Box, Breadcrumbs, Button, Card, CardContent, CardHeader, FormControl, FormLabel, InputLabel, Grid, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography,
    TableBody, TableCell, TableContainer, Table, TableHead, TableRow, Paper, Icon
} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { useDropzone } from 'react-dropzone';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AuthService from "../../services/auth/auth_service";
import Widget from "../../components/Widget";

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}));

const TypographyPage = (props) => {
    const root_id = props.location && props.location.state.root_id;
    const classes = useStyles();
    const [educationInfo, setEducationInfo] = useState([]);
    const [file, setFile] = useState(null);
    const [level, setLevel] = useState('');
    const [school, setSchool] = useState('');
    const [countryId, setCountryId] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [award, setAward] = useState('');
    const [activeStep, setActiveStep] = useState(2);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [country, setCountry] = useState([]);
    const [registrationNo, setRegistrationNo] = useState('');
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');
    const [showAdd,setShowAdd] = useState(false);

    useEffect(() => {
        loadCountries();
        getAcademicResultsInfo();
    }, []);

    const submit = async () => {
        
        if (level === '' || school === '' || from === '' || to === '' || award === '' || registrationNo === '' || countryId === '' || root_id === '' || uploadedFile === null) {
            setError("All fields are required and file must be uploaded");
            return;
        }

        const formData = new FormData();
        formData.append('file', uploadedFile);
        
            const extraData = {
                levelName: level,
                institution: school,
                yearOfRegistration: from,
                yearOfGraduation: to,
                countryId: countryId,
                award: award,
                registrationNo: registrationNo,
                subModuleId: root_id
        };
    
        formData.append('extra', JSON.stringify(extraData));


        try {
            const response = await AuthService.createEdoction(formData);
            
            if (response.data.success === true) {
                alert("Education info submitted successfully");
                setShowAdd(false);
                getAcademicResultsInfo();
                setLevel('');
                setSchool('');
                setFrom('');
                setTo('');
                setAward('');
                setCountryId('');
                setRegistrationNo('');
                setUploadedFile(null);
                setFileName('');
                setError(null); // Clear error if any
                window.location.reload();
            } else {
                setError("Failed to save education info");
            }
        } catch (err) {
            console.error("Failed to submit education info", err);
            setError("Failed to submit education info");
        }
    };


    // const submit = async () => {
    //     console.log(school, from, to, natureOfValuation, capacity, nameOfSupervisor, uploadedFile);
    //     // Validate form fields
    //     if (school === '' || from === '' || to === '' || natureOfValuation === '' || capacity === '' || nameOfSupervisor === '' || uploadedFile === null) {
    //       setError("All fields are required and file must be uploaded");
    //       return;
    //     }
    
    //     // Convert year fields to integers
    //     const fromYear = parseInt(from, 10);
    //     const toYear = parseInt(to, 10);
    
    //     if (isNaN(fromYear) || isNaN(toYear)) {
    //       setError("Please enter valid years for 'From' and 'To'");
    //       return;
    //     }
    
    //     const formData = new FormData();
    //     formData.append('file', uploadedFile);
    
    //     const extraData = {
    //       school: school,
    //       from: fromYear,
    //       to: toYear,
    //       natureOfValuation: natureOfValuation,
    //       capacity: capacity,
    //       nameOfSupervisor: nameOfSupervisor
    //     };
    
    //     formData.append('extra', JSON.stringify(extraData));
    
    //     try {
    //       const response = await AuthService.createEducation(formData);
    //       console.log('response', response);
    //       if (response.data.message === 'saved') {
    //         // Clear form fields
    //         setSchool('');
    //         setFrom('');
    //         setTo('');
    //         setNatureOfValuation('');
    //         setCapacity('');
    //         setNameOfSupervisor('');
    //         setUploadedFile(null);
    //         setFileName('');
    
    //         // Handle success response
    //         setError(null); // Clear error if any
    //         alert("Education info saved successfully");
    //       } else {
    //         setError("Failed to save education info");
    //       }
    //     } catch (err) {
    //       console.error("Failed to submit education info", err);
    //       setError("Failed to submit education info");
    //     }
    //   };
    
      const handleFileUpload = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        setFileName(file.name);
      };

    const handleCountryChange = (event) => {
        setCountryId(event.target.value);
    };


  

    const loadCountries = () => {
        // Load country data from server
        AuthService.getCountries().then((response) => {
            console.log('response', response.data);
            setCountry(response.data);

        })
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // const handleFileUpload = (acceptedFiles) => {
    //     const file = acceptedFiles[0];
    //     setUploadedFile(file);
    //     setFileName(file.name);
    // };

    const { getRootProps, getInputProps } = useDropzone({ onDrop: handleFileUpload });

    const getAcademicResultsInfo = () => {
        
        AuthService.getAcademicResultsInfo().then(res => {
            console.log('res', res.data);
            try{
                let data = res.data.content;
                setEducationInfo(data);
                if(data.length>0){
                    setShowAdd(false)
                }else{
                    setShowAdd(true)
                }
            }catch(err){
                console.log(err);
            }
        });
    };

    // useEffect(() => {
    //     AuthService.getAcademicResultsInfo().then(res => {
    //         console.log('res', res);
    //         setEducationInfo(res.data.content);
    //     });
    // }, []);

    return (
        <Box>
            <Box className="mb-6">
                <ol className="flex items-center whitespace-nowrap">
                    <li className="inline-flex items-center">
                        <Link to="/" className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
                            Home
                        </Link>
                        <svg className="flex-shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path>
                        </svg>
                    </li>
                    <li className="inline-flex items-center">
                        <Link to="#" className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
                            Registration
                            <svg className="flex-shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path>
                            </svg>
                        </Link>
                    </li>
                    <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
                        Education Background
                    </li>
                </ol>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={3} className="mb-4">
                        <Grid item xs={12}>
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
                    
                    <Button  variant="contained" style={{display: !showAdd ? 'block' : 'none',float:'right'}} onClick={()=>{
                        setShowAdd(true);
                    }}>Add New</Button>

                    <Card style={{display: showAdd ? 'block' : 'none'}}>
                        <CardHeader title="Fill Education Background" />
                        <CardContent>
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="level" select label="Education Background" value={level} onChange={(e) => setLevel(e.target.value)} fullWidth>
                                            <MenuItem value="">- Choose One -</MenuItem>
                                            <MenuItem value="primary">Primary School</MenuItem>
                                            <MenuItem value="o-level">O Level</MenuItem>
                                            <MenuItem value="a-level">A Level</MenuItem>
                                            <MenuItem value="certificate">Certificate</MenuItem>
                                            <MenuItem value="diploma">Diploma</MenuItem>
                                            <MenuItem value="degree">Degree</MenuItem>
                                            <MenuItem value="masters">Masters</MenuItem>
                                            <MenuItem value="phd">PHD</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="school" label="Name Of School" value={school} onChange={(e) => setSchool(e.target.value)} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="registrationNo" label="Registrstion Number" value={registrationNo} onChange={(e) => setRegistrationNo(e.target.value)} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>

                                        <FormControl fullWidth >
                                            <InputLabel id="country-label">Country</InputLabel>
                                            <Select
                                                labelId="country-label"
                                                id="country"
                                                name="country" // Make sure the name matches the form data
                                                onChange={handleCountryChange}
                                                // onChange={handleChange}
                                                value={countryId || ''}

                                            >
                                                {country.map((d) => (
                                                    <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                                                ))}
                                            </Select>
                                            {/* {errors.country && <Typography color="error">{errors.country}</Typography>} */}

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="from" type="number" label="Year From" value={from} onChange={(e) => setFrom(e.target.value)} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="to" type="number" label="Year To" value={to} onChange={(e) => setTo(e.target.value)} fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="award" label="Award" value={award} onChange={(e) => setAward(e.target.value)} fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div {...getRootProps()} style={{ border: '2px dashed #aaa', borderRadius: '4px', padding: '40px', textAlign: 'center', cursor: 'pointer' }}>
                                            <input {...getInputProps()} />
                                            {fileName ? (
                                                <div>
                                                    <InsertDriveFileIcon style={{ fontSize: '48px', marginBottom: '1px' }} />
                                                    <p>{fileName}</p>
                                                </div>
                                            ) : (
                                                <p>Drag & drop Certificate file here, or click to select one</p>
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
                <Grid item xs={12}>
                    <Widget title="Education levels" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Education Level</TableCell>
                                        <TableCell>Country</TableCell>
                                        <TableCell>Name Of School</TableCell>
                                        <TableCell>Year of Registration</TableCell>
                                        <TableCell>Year of Graduation</TableCell>
                                        <TableCell>Award</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {educationInfo.length > 0 ? educationInfo.map((education, index) => (
                                        <TableRow key={index}>
                                            <TableCell style={{ color: 'green', fontWeight: 'bold' }}>{education.levelName}</TableCell>
                                            <TableCell>{education.country?.name}</TableCell>
                                            <TableCell>{education.institution}</TableCell>
                                            <TableCell>{education.yearOfGraduation}</TableCell>
                                            <TableCell>{education.yearOfRegistration}</TableCell>
                                            <TableCell>{education.award}</TableCell>
                                            <TableCell>
                                                Edit
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={6} style={{ textAlign: 'center' }}>No education data available</TableCell>
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
};

export default TypographyPage;

