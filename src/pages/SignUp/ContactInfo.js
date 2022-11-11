import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'

export default function PersonalInfo({
  changeStep,
  setUserDetails,
  userDetails,
  handleChange,
}) {
  const [address, setAddress] = useState({
    street1: userDetails.address.street1 || '',
    street2: userDetails.address.street2 || '',
    town: userDetails.address.town || '',
    city: userDetails.address.city || '',
    postalCode: userDetails.address.postalCode || '',
  })

  const handleChangeAdress = (prop) => (event) => {
    setAddress({ ...address, [prop]: event.target.value })
    setUserDetails({ ...userDetails, ['address']: address })
  }
  const validateData = () => {
    if (
      userDetails.address.street1 == '' ||
      userDetails.address.postalCode == '' ||
      userDetails.phoneNumber == '' ||
      userDetails.town == '' ||
      userDetails.city == ''
    ) {
      console.log(userDetails.address)
      return false
    } else {
      return true
    }
  }
  return (
    <>
      <Avatar sx={{ m: 1 }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Contact Information
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='given-name'
              name='street1'
              required={true}
              fullWidth
              id='street1'
              label='Street 1'
              autoFocus
              value={address.street1}
              onChange={handleChangeAdress('street1')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='street2'
              label='Street 2'
              name='street2'
              autoComplete='family-name'
              value={address.street2}
              onChange={handleChangeAdress('street2')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required={true}
              fullWidth
              id='town'
              label='Town'
              name='town'
              value={address.town}
              onChange={handleChangeAdress('town')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required={true}
              fullWidth
              id='city'
              label='City'
              name='city'
              value={address.city}
              onChange={handleChangeAdress('city')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              id='postalCode'
              label='Postal Code'
              name='postalCode'
              type='number'
              value={address.postalCode}
              onChange={handleChangeAdress('postalCode')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              id='phoneNumber'
              label='phone Number'
              name='phoneNumber'
              value={userDetails.phoneNumber}
              onChange={handleChange('phoneNumber')}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                changeStep('minus')
              }}
            >
              previous
            </Button>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                if (validateData()) {
                  changeStep('plus')
                } else {
                  alert('Please fill requiled fields')
                }
              }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
