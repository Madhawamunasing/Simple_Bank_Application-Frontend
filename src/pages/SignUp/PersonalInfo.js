import * as React from 'react'
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
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import RadioBox from '../../components/RadioBox/Title'
import Gender from '../../components/RadioBox/Gender'
import DatePicker from '../../components/DatePicker/DatePicker'

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit'>FIT19</Link> {new Date().getFullYear()}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function PersonalInfo({
  changeStep,
  handleChange,
  userDetails,
}) {
  const validateData = () => {
    if (
      userDetails.initials == '' ||
      userDetails.fullName == '' ||
      userDetails.otherName == '' ||
      userDetails.NIC == '' ||
      userDetails.passportNo == '' ||
      userDetails.birthday == '' ||
      userDetails.noDependents == ''
    ) {
      console.log(userDetails)
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
        Personal Information
      </Typography>
      <Box component='form' sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <RadioBox handleChange={handleChange} userDetails={userDetails} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='given-name'
              name='initials'
              required={true}
              fullWidth
              id='initials'
              label='Initials'
              autoFocus
              value={userDetails.initials}
              onChange={handleChange('initials')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required={true}
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              autoComplete='family-name'
              value={userDetails.lastName}
              onChange={handleChange('lastName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              id='fullName'
              label='Full Name'
              name='fullName'
              value={userDetails.fullName}
              onChange={handleChange('fullName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              id='otherName'
              label='Other Name'
              name='otherName'
              value={userDetails.otherName}
              onChange={handleChange('otherName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              id='nic'
              label='NIC'
              name='nic'
              value={userDetails.NIC}
              onChange={handleChange('NIC')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              id='passportNo'
              label='Passport No'
              name='passportNo'
              value={userDetails.passportNo}
              onChange={handleChange('passportNo')}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker handleChange={handleChange} userDetails={userDetails} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Gender handleChange={handleChange} userDetails={userDetails} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              type='number'
              id='noDependents'
              label='No of Dependents'
              name='noDependents'
              value={userDetails.noDependents}
              onChange={handleChange('noDependents')}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled
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
