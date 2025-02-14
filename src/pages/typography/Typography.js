import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  InputLabel,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import { useDropzone } from "react-dropzone"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import AuthService from "../../services/auth/auth_service"
import Widget from "../../components/Widget"
import EditPopup from "./EditPopup"
import ConfirmationModal from "./ConfirmationModal"

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
  actionLink: {
    color: "#3B82F6",
    background: "none",
    border: "none",
    padding: "4px 8px",
    cursor: "pointer",
    fontSize: "14px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}))

const TypographyPage = (props) => {
  const root_id = props.location && props.location.state.root_id
  const classes = useStyles()
  const [educationInfo, setEducationInfo] = useState([])
  const [file, setFile] = useState(null)
  const [level, setLevel] = useState("")
  const [school, setSchool] = useState("")
  const [countryId, setCountryId] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [award, setAward] = useState("")
  const [activeStep, setActiveStep] = useState(2)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [country, setCountry] = useState([])
  const [registrationNo, setRegistrationNo] = useState("")
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState("")
  const [showAdd, setShowAdd] = useState(false)

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedEducation, setSelectedEducation] = useState(null)

  // Modal states
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    loadCountries()
    getAcademicResultsInfo()
  }, [])



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





  const handleFileUpload = (acceptedFiles) => {
    const file = acceptedFiles[0]
    setUploadedFile(file)
    setFileName(file.name)
  }

  const handleCountryChange = (event) => {
    setCountryId(event.target.value)
  }

  const loadCountries = () => {
    AuthService.getCountries().then((response) => {
      setCountry(response.data)
    })
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleFileUpload })

  const getAcademicResultsInfo = () => {
    AuthService.getAcademicResultsInfo().then((res) => {
      try {
        const data = res.data.content
        setEducationInfo(data)
        setShowAdd(data.length === 0)
      } catch (err) {
        console.log(err)
      }
    })
  }

  // Menu handlers
  const handleMenuOpen = (event, education) => {
    setAnchorEl(event.currentTarget)
    setSelectedEducation(education)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedEducation(null)
  }

  const handleEditClick = () => {
    handleMenuClose()
    console.log("Editing education:", selectedEducation)
    setIsEditPopupOpen(true)
  }

  const handleDeleteClick = () => {
    handleMenuClose()
    setIsDeleteModalOpen(true)
  }

  const handleEditSubmit = (editedData) => {
    console.log("Edited data:", editedData)
    setIsEditPopupOpen(false)
    getAcademicResultsInfo()
  }

  const handleDeleteConfirm = () => {
    console.log("Deleting education:", selectedEducation)
    console.log("Deleted education data:", selectedEducation)
    setIsDeleteModalOpen(false)
    setSelectedEducation(null)
    getAcademicResultsInfo()
  }

  return (
    <Box>
      <Box className="mb-6">
        <ol className="flex items-center whitespace-nowrap">
          <li className="inline-flex items-center">
            <Link to="/" className="flex items-center text-sm text-gray-500 hover:text-blue-600">
              Home
            </Link>
            <svg
              className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </li>
          <li className="inline-flex items-center">
            <Link to="#" className="flex items-center text-sm text-gray-500 hover:text-blue-600">
              Registration
            </Link>
            <svg
              className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </li>
          <li className="inline-flex items-center text-sm font-semibold text-gray-800">Education Background</li>
        </ol>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3} className="mb-4">
            <Grid item xs={12}>
              <Card>
                <Stepper activeStep={activeStep - 1} alternativeLabel className="mb-8 mt-8">
                  {["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"].map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Card>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            style={{ display: !showAdd ? "block" : "none", float: "right" }}
            onClick={() => setShowAdd(true)}
          >
            ADD NEW
          </Button>

          <Card style={{ display: showAdd ? "block" : "none" }}>
            <CardHeader title="Fill Education Background" />
            <CardContent>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="level"
                      select
                      label="Education Background"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="">- Choose One -</MenuItem>
                      <MenuItem value="primary">PRIMARY SCHOOL</MenuItem>
                      <MenuItem value="o-level">O LEVEL</MenuItem>
                      <MenuItem value="a-level">A LEVEL</MenuItem>
                      <MenuItem value="certificate">CERTIFICATE</MenuItem>
                      <MenuItem value="diploma">DIPLOMA</MenuItem>
                      <MenuItem value="degree">DEGREE</MenuItem>
                      <MenuItem value="masters">MASTERS</MenuItem>
                      <MenuItem value="phd">PHD</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="school"
                      label="Name Of School"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="registrationNo"
                      label="Registration Number"
                      value={registrationNo}
                      onChange={(e) => setRegistrationNo(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="country-label">Country</InputLabel>
                      <Select
                        labelId="country-label"
                        id="country"
                        name="country"
                        value={countryId || ""}
                        onChange={handleCountryChange}
                      >
                        {country.map((d) => (
                          <MenuItem key={d.id} value={d.id}>
                            {d.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="from"
                      type="number"
                      label="Year From"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="to"
                      type="number"
                      label="Year To"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="award"
                      label="Award"
                      value={award}
                      onChange={(e) => setAward(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div
                      {...getRootProps()}
                      style={{
                        border: "2px dashed #aaa",
                        borderRadius: "4px",
                        padding: "40px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <input {...getInputProps()} />
                      {fileName ? (
                        <div>
                          <InsertDriveFileIcon style={{ fontSize: "48px", marginBottom: "1px" }} />
                          <p>{fileName}</p>
                        </div>
                      ) : (
                        <p>Drag & drop Certificate file here, or click to select one</p>
                      )}
                    </div>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Button variant="contained" onClick={submit} color="primary">
                    Submit
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Education levels" />
            <CardContent>
              <TableContainer>
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
                    {educationInfo.length > 0 ? (
                      educationInfo.map((education, index) => (
                        <TableRow key={index}>
                          <TableCell style={{ color: "#22C55E", fontWeight: "bold" }}>{education.levelName}</TableCell>
                          <TableCell>{education.country?.name}</TableCell>
                          <TableCell>{education.institution}</TableCell>
                          <TableCell>{education.yearOfRegistration}</TableCell>
                          <TableCell>{education.yearOfGraduation}</TableCell>
                          <TableCell>{education.award}</TableCell>
                          <TableCell>
                            <IconButton size="small" onClick={(event) => handleMenuOpen(event, education)}>
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No education data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditClick}>
          <span className={classes.actionLink}>EDIT</span>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <span className={classes.actionLink}>DELETE</span>
        </MenuItem>
      </Menu>

      {/* Modals */}
      <EditPopup
        open={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        education={selectedEducation}
        onSubmit={handleEditSubmit}
      />

      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        content="Are you sure you want to delete this education entry?"
      />
    </Box>
  )
}

export default TypographyPage

