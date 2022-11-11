import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function Gender({ userDetails, handleChange }) {
  const [gender, setGender] = useState('MR')
  return (
    <FormControl>
      <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        value={userDetails.gender}
        onChange={handleChange('gender')}
      >
        <FormControlLabel value='MALE' control={<Radio />} label='Male' />
        <FormControlLabel value='FEMALE' control={<Radio />} label='Female' />
      </RadioGroup>
    </FormControl>
  )
}
