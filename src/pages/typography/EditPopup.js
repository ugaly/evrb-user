import React, { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material"

const EditPopup = ({ open, onClose, education, onSubmit }) => {
  const [editedEducation, setEditedEducation] = useState(education || {})

  useEffect(() => {
    if (education) {
      setEditedEducation({
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
    onSubmit(editedEducation)
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
          <MenuItem value="primary">Primary School</MenuItem>
          <MenuItem value="o-level">O Level</MenuItem>
          <MenuItem value="a-level">A Level</MenuItem>
          <MenuItem value="certificate">Certificate</MenuItem>
          <MenuItem value="diploma">Diploma</MenuItem>
          <MenuItem value="degree">Degree</MenuItem>
          <MenuItem value="masters">Masters</MenuItem>
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

