import React, { useState, useEffect } from "react";
// import {
//   Grid,
//   LinearProgress,
//   Select,
//   OutlinedInput,
//   MenuItem,
//   Button
// } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
    ResponsiveContainer,
    ComposedChart,
    AreaChart,
    LineChart,
    Line,
    Area,
    PieChart,
    Pie,
    Cell,
    YAxis,
    XAxis,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";

import { Container, Grid, Card, CardHeader, CardContent, FormControl, CircularProgress, InputLabel, Select, MenuItem, TextareaAutosize, TextField, Checkbox, Button, Link, Breadcrumbs, Stepper, Step, StepLabel, RadioGroup, Radio, FormControlLabel, FormLabel } from '@mui/material';
import { Box } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';

import Avatar from '@mui/material/Avatar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AuthService from "../../services/auth/auth_service";



const mainChartData = getMainChartData();
const PieChartData = [
    { name: "Group A", value: 400, color: "primary" },
    { name: "Group B", value: 300, color: "secondary" },
    { name: "Group C", value: 300, color: "warning" },
    { name: "Group D", value: 200, color: "success" },
];


export default function Dashboard(props) {
    //console.log('props', props);
    //const root_id = props.location && props.location.state.root_id;
    //console.log('root_id', root_id);

    var classes = useStyles();
    var theme = useTheme();

    const [activeStep, setActiveStep] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [gender, setGender] = useState('');
    const [regInfo, setRegInfo] = useState([]);
    const [countries, setCountries] = useState([]);
    const [region, setRegion] = useState([]);
    const [district, setDistrict] = useState([]);
    const [isLoadingRegInfo, setIsLoadingRegInfo] = useState(false);

    const [formData, setFormData] = useState({
        fname: '',
        mname: '',
        lname: '',
        country: '',
        dob: '',
        gender: '',
        address: '',
        pobox: '',
        phone: '',
        region: '',
        district: '',
        location: '',
        block: '',
        physicalAddress: ''
    });
    const [errors, setErrors] = useState({});




    const fetchData = async () => {
        const response = await AuthService.getRegistrationInfo();
        setRegInfo(response.data);
        setIsLoadingRegInfo(false);

        // AuthService.getRegistrationInfo().then((response) => {
        //   console.log('nnnnnnnnnnnnnnnnn', response.data);
        //   setRegInfo(response.data);
        // });
    }

    const getCountries = async () => {
        const response = await AuthService.getCountries();
        console.log('countries', response.data);
        setCountries(response.data);
    }

    const getRegion = async () => {
        const response = await AuthService.getRegion();
        console.log('region', response.data);
        setRegion(response.data);

    }

    useEffect(() => {

        console.log(sessionStorage.getItem('token'));

        setIsLoadingRegInfo(true);

        fetchData();
        getCountries();
        getRegion();
        
    }, []);

    const getDistricts = async (region_id) => {
        const response = await AuthService.getDistricts(region_id);
        console.log('district', response.data || []);
        setDistrict(response.data);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFormData({ ...formData, dob: date });
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setFormData({ ...formData, gender: event.target.value });
    };

    // const handleChange = (event) => {
    //   console.log(event.target.name, event.target.value);
    //   const { name, value } = event.target;
    //   setFormData(prevFormData => ({
    //     ...prevFormData,
    //     [name]: value
    //   }));
    // }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        if (name === "region") {
            getDistricts(value);
            setFormData(prevFormData => ({
                ...prevFormData,
                district: ''  // Reset district when region changes
            }));
        }
    }

    const validateForm = () => {
        let formErrors = {};
        if (!formData.fname) formErrors.fname = "First Name is required";
        if (!formData.lname) formErrors.lname = "Last Name is required";

        if (!formData.country) formErrors.country = "Nationality is required";
        if (!formData.dob) formErrors.dob = "Date of Birth is required";
        if (!formData.gender) formErrors.gender = "Gender is required";
        if (!formData.address) formErrors.address = "Address is required";
        if (!formData.phone) formErrors.phone = "Phone is required";
        if (!formData.region) formErrors.region = "Region is required";
        if (!formData.district) formErrors.district = "District is required";
        if (!formData.location) formErrors.location = "Location is required";
        if (!formData.block) formErrors.block = "Block No is required";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSave = () => {
        console.log(formData);

        if (validateForm()) {
            console.log("Form Data:", formData);

            // Create a new object with the renamed fields
            const renamedData = {
                firstName: formData.fname,
                middleName: formData.mname,
                surName: formData.lname,
                dob: formData.dob,
                gender: formData.gender,
                pox: formData.pobox,
                districtId: formData.district,
                //subModuleId: root_id, // If this field exists in formData, otherwise add it accordingly
                countryId: formData.country,
                location: formData.location,
                blockNo: formData.block,
                physicalAddress: formData.physicalAddress,
                address: formData.address,
                telephone: formData.phone,
            };




            AuthService.createApplicationInfo(renamedData).then((response) => {
                console.log('Response:', response.data);
                fetchData();
                window.location.reload();
                setRegInfo(response.data);
            });
        }
    };


    const renderField = (label, value) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="body2" color="textSecondary">{label}</Typography>
            <Typography style={{ fontWeight: 'bold' }} variant="body1">{value ?? 'N/A'}</Typography>
        </Grid>
    );

    return (


        <>
            <>
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
                            Application-Info
                        </li>
                    </ol>
                </Box>
                <Grid container spacing={3}>

                    <Grid item xs={12} md={12} lg={12} xl={12}>

                        <Grid container spacing={3} className="mb-4">
                            <Grid item spacing={3} xs={12} md={12} lg={12} xl={12}>
                                <Card>
                                    <Stepper activeStep={activeStep} alternativeLabel className="mb-8 mt-8">
                                        {['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'].map((label, index) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Card>
                            </Grid>
                        </Grid>

                        {isLoadingRegInfo ? <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '50vh' // Adjust if needed
                            }}
                        ><CircularProgress size={60} /></div> :
                            <>
                                {regInfo.firstName == null ?
                                    <Card>
                                        <CardHeader title="Fill Application Information" />
                                        <CardContent>
                                            <form>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <TextField id="fname" name="fname" label="First Name"
                                                            required
                                                            fullWidth
                                                            value={formData.fname}
                                                            onChange={handleChange}
                                                            error={!!errors.fname}
                                                            helperText={errors.fname}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <TextField id="mname" name="mname" label="Middle Name"
                                                            fullWidth
                                                            value={formData.mname}
                                                            onChange={handleChange}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <TextField id="lname" label="Last Name" fullWidth
                                                            value={formData.lname}
                                                            name="lname"
                                                            onChange={handleChange}
                                                            error={!!errors.lname}
                                                            helperText={errors.lname} />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>

                                                        <FormControl fullWidth error={!!errors.nationality}>
                                                            <InputLabel id="country-label">Nationality</InputLabel>
                                                            <Select
                                                                labelId="country-label"
                                                                id="country"
                                                                name="country" // Make sure the name matches the form data
                                                                onChange={handleChange}
                                                                value={formData.country || ''}

                                                            >
                                                                {countries.map((country) => (
                                                                    <MenuItem key={country.id} value={country.id}>{country.nationality}</MenuItem>
                                                                ))}
                                                            </Select>
                                                            {errors.country && <Typography color="error">{errors.country}</Typography>}

                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <FormLabel component="legend">Date of Birth</FormLabel>
                                                        <div className="relative w-full">

                                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                                </svg>
                                                            </div>
                                                            <input datepicker name="dob" onChange={handleChange} type="date" id="date-picker" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                                                        </div>
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={4}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Gender</FormLabel>
                          <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={handleGenderChange}>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                          </RadioGroup>
                        </FormControl>
                      </Grid> */}

                                                    <Grid item xs={12} md={4}>
                                                        <FormControl component="fieldset" error={!!errors.gender}>
                                                            <FormLabel component="legend">Gender</FormLabel>
                                                            <RadioGroup row
                                                                aria-label="gender"
                                                                name="gender"
                                                                value={formData.gender}
                                                                onChange={handleGenderChange}
                                                            >
                                                                <FormControlLabel value="F" control={<Radio />} label="Female" />
                                                                <FormControlLabel value="M" control={<Radio />} label="Male" />
                                                            </RadioGroup>
                                                            {errors.gender && <Typography color="error">{errors.gender}</Typography>}
                                                        </FormControl>
                                                    </Grid>


                                                    <Grid item xs={12}>
                                                        <TextField
                                                            placeholder="Address (For registration and future correspondence)"
                                                            multiline
                                                            rows={4}
                                                            maxRows={6}
                                                            required
                                                            fullWidth
                                                            name="address"
                                                            value={formData.address}
                                                            onChange={handleChange}
                                                            error={!!errors.address}
                                                            helperText={errors.address} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <TextField id="pobox" label="P.O.BOX" fullWidth
                                                            value={formData.pobox}
                                                            name="pobox"
                                                            onChange={handleChange} />
                                                    </Grid>
                                                    <Grid item style={{ cursor: 'not-allowed' }} xs={12} md={4}>
                                                        <TextField id="outlined-disabled" label="Email" fullWidth disabled value={regInfo.email}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }} />


                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <TextField id="phone" label="Phone" required
                                                            fullWidth
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            name="phone"
                                                            error={!!errors.phone}
                                                            helperText={errors.phone} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <FormControl fullWidth error={!!errors.region}>
                                                            <InputLabel id="region-label">Region</InputLabel>
                                                            <Select
                                                                labelId="region-label"
                                                                id="region"
                                                                name="region"
                                                                value={formData.region || ''} // Ensure the value is not undefined
                                                                onChange={handleChange}

                                                            >

                                                                {region.map((region) => (
                                                                    <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                            {errors.region && <Typography color="error">{errors.region}</Typography>}
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <FormControl fullWidth required error={!!errors.district}>
                                                            <InputLabel>District</InputLabel>
                                                            <Select
                                                                id="district"
                                                                name="district"
                                                                value={formData.district}
                                                                onChange={handleChange}
                                                            // disabled={!formData.region} 
                                                            >
                                                                {!formData.region && (
                                                                    <MenuItem value="" disabled>
                                                                        Choose region first
                                                                    </MenuItem>
                                                                )}
                                                                {district.map((district) => (
                                                                    <MenuItem key={district.id} value={district.id}>
                                                                        {district.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                            {errors.district && <Typography color="error">{errors.district}</Typography>}
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <TextField id="location" label="Location" required
                                                            fullWidth
                                                            value={formData.location}
                                                            onChange={handleChange}
                                                            name="location"
                                                            error={!!errors.district}
                                                            helperText={errors.district} />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField id="block" label="Block No" required
                                                            fullWidth
                                                            value={formData.block}
                                                            onChange={handleChange}
                                                            name="block"
                                                            error={!!errors.block}
                                                            helperText={errors.block} />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            placeholder="Physical Address : Plot / House No"
                                                            multiline
                                                            rows={4}
                                                            maxRows={6}
                                                            name="physicalAddress"
                                                            fullWidth
                                                            value={formData.physicalAddress}
                                                            onChange={handleChange} />
                                                    </Grid>
                                                </Grid>
                                                <Box mt={2}>
                                                    <hr />
                                                    {/* <h5>Security</h5>
                    <TextField id="uname" label="User Name" fullWidth />
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField id="pass" label="Password" type="password" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField id="rpass" label="Repeat Password" type="password" fullWidth />
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <Checkbox id="flexCheckChecked" defaultChecked />
                      <label htmlFor="flexCheckChecked">Enable Two-Factor-Authentication</label>
                    </Box> */}
                                                    <Box mt={2}>
                                                        <Button variant="contained" color="success" onClick={handleSave}>
                                                            Save
                                                        </Button>

                                                        <Button variant="contained" onClick={handleNext} style={{ marginLeft: '10px' }} color="primary">
                                                            Next
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </form>
                                        </CardContent>
                                    </Card>
                                    :
                                    <Card>
                                        <CardHeader title="Application Information" />
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                {renderField('Registration No', regInfo.regnNo)}
                                                {renderField('First Name', regInfo.firstName)}
                                                {renderField('Middle Name', regInfo.middleName)}
                                                {renderField('Surname', regInfo.surName)}
                                                {renderField('Membership Type', regInfo.membershipType)}
                                                {renderField('Email', regInfo.email)}
                                                {renderField('Telephone', regInfo.telephone)}
                                                {renderField('Address', regInfo.address)}
                                                {renderField('Gender', regInfo.gender)}
                                                {renderField('Index No', regInfo.indexNo)}




                                                {renderField('Nationality', regInfo.nationality?.nationality)}
                                                {renderField('Certificate No', regInfo.certificateNo)}
                                                {renderField('District', regInfo.district?.name)}

                                                {/* {renderField('ID', regInfo.id)} */}
                                                {renderField('Location', regInfo.location)}
                                                {renderField('Physical Address', regInfo.physicalAddress)}
                                                {renderField('P.O. Box', regInfo.pobox)}
                                                {renderField('Print Date', regInfo.printDate)}
                                                {renderField('Print Status', regInfo.printStatus)}
                                                {renderField('Region', regInfo.region?.name)}

                                                {renderField('Block', regInfo.block)}


                                            </Grid>
                                        </CardContent>
                                    </Card>
                                }
                            </>

                        }

                    </Grid>
                </Grid>
            </>
        </>
    );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
    var array = new Array(length).fill();
    let lastValue;

    return array.map((item, index) => {
        let randomValue = Math.floor(Math.random() * multiplier + 1);

        while (
            randomValue <= min ||
            randomValue >= max ||
            (lastValue && randomValue - lastValue > maxDiff)
        ) {
            randomValue = Math.floor(Math.random() * multiplier + 1);
        }

        lastValue = randomValue;

        return { value: randomValue };
    });
}

function getMainChartData() {
    var resultArray = [];
    var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
    var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
    var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

    for (let i = 0; i < tablet.length; i++) {
        resultArray.push({
            tablet: tablet[i].value,
            desktop: desktop[i].value,
            mobile: mobile[i].value,
        });
    }

    return resultArray;
}






