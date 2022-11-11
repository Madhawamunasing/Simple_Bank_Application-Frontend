import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function Role({ handleChange, userDetails }) {
  return (
    <FormControl>
      <FormLabel id='demo-row-radio-buttons-group-label'>
        Select Employee Section
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        value={userDetails.role}
        onChange={handleChange('role')}
      >
        <FormControlLabel
          value='CUSTOMER'
          control={<Radio />}
          label='Front Desk'
        />
        <FormControlLabel
          value='FRONT_DESK'
          control={<Radio />}
          label='Front Desk'
        />
        <FormControlLabel
          value='LOAN_SECTION'
          control={<Radio />}
          label='Loan Section'
        />
        <FormControlLabel value='MANAGER' control={<Radio />} label='Manager' />
      </RadioGroup>
    </FormControl>
  )
}
