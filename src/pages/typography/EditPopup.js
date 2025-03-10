import React, { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material"
import AuthService from "../../services/auth/auth_service"

const EditPopup = ({ open, onClose, education, onSubmit }) => {
  const [editedEducation, setEditedEducation] = useState(education || {})
  console.log(education)

  useEffect(() => {
    if (education) {
      setEditedEducation({
        id: education.id || "",
        levelName: education.levelName || "",
        institution: education.institution || "",
        yearOfRegistration: education.yearOfRegistration || "",
        yearOfGraduation: education.yearOfGraduation || "",
        award: education.award || "",
        country: education.country?.name || "",
      })
    }
  }, [education])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedEducation((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {

    AuthService.upgateAcademicInfo(editedEducation).then(res => {
      console.log(res)
      alert("Updated successfully")
      onSubmit(editedEducation)

    }).catch(e => console.log(e))
  }

  const handleClose = () => {
    setEditedEducation({})
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Education</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          margin="normal"
          name="levelName"
          label="Education Level"
          value={editedEducation.levelName || ""}
          onChange={handleChange}
        >
                                <MenuItem value="primary">PRIMARY SCHOOL</MenuItem>
                                <MenuItem value="o-level">O LEVEL</MenuItem>
                                <MenuItem value="a-level">A LEVEL</MenuItem>
                                <MenuItem value="certificate">CERTIFICATE</MenuItem>
                                <MenuItem value="diploma">DIPLOMA</MenuItem>
                                <MenuItem value="degree">DEGREE</MenuItem>
                                <MenuItem value="masters">MASTERS</MenuItem>
                                <MenuItem value="phd">PHD</MenuItem>
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          name="institution"
          label="Name of School"
          value={editedEducation.institution || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="yearOfRegistration"
          label="Year of Registration"
          type="number"
          value={editedEducation.yearOfRegistration || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="yearOfGraduation"
          label="Year of Graduation"
          type="number"
          value={editedEducation.yearOfGraduation || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="award"
          label="Award"
          value={editedEducation.award || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="country"
          label="Country"
          value={editedEducation.country || ""}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditPopup

