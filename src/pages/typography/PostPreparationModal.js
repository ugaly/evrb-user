import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material"

const PostPreparationModal = ({ open, onClose, onSubmit, educationData }) => {
  const [selectedEducation, setSelectedEducation] = useState({})

  const handleChange = (event) => {
    const { name, checked } = event.target
    setSelectedEducation((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = () => {
    const dataToPost = educationData.filter((edu, index) => selectedEducation[`edu-${index}`])
    onSubmit(dataToPost)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Prepare Post</DialogTitle>
      <DialogContent>
        {educationData.map((edu, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedEducation[`edu-${index}`] || false}
                onChange={handleChange}
                name={`edu-${index}`}
              />
            }
            label={`${edu.levelName} - ${edu.institution} (${edu.yearOfGraduation})`}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Post
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PostPreparationModal

