import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import Role from '../../components/RadioBox/Role'
import DatePicker from '../../components/DatePicker/DatePicker'
import HeaderCard from '../../components/HeaderCard/HeaderCard'
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

export default function Account({ changeStep, step }) {
  const navigate = useNavigate()
  const { id } = useParams()

  const [userDetails, setUserDetails] = useState({
    userId: '',
    title: 'MR',
    gender: 'MALE',
    lastName: '',
    initials: '',
    fullName: '',
    otherName: '',
    NIC: '',
    passportNo: '',
    birthday: new Date('2022-11-01T21:11:54'),
    status: 'SINGLE',
    noDependents: '',
    address: '',
    phoneNumber: '',
    email: '',
    isActivate: 'true',
    password: '',
    role: 'FRONT_DESK',
    remark: '',
    createdAt: '',
  })

  const handleChange = (prop) => (event) => {
    if (prop === 'birthday') {
      setUserDetails({ ...userDetails, [prop]: event })
    } else if (prop === 'address') {
      setUserDetails({ ...userDetails, [prop]: event })
      alert(':Asd')
    } else {
      setUserDetails({ ...userDetails, [prop]: event.target.value })
    }
  }
  const updateUser = async () => {
    axios
      .post('/api/v1/users/update', userDetails, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('v_'), //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log(res)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getUserDetails = async () => {
    await axios
      .get(`/api/v1/users/getUserById?user_Id=${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('v_'), //the token is a variable which holds the token
        },
      })
      .then((res) => {
        let currentuser = res.data.message
        setUserDetails({
          userId: currentuser?.userId || '',
          title: currentuser?.title || 'MR',
          gender: currentuser?.gender || 'MALE',
          lastName: currentuser?.lastName || '',
          initials: currentuser?.initials || '',
          fullName: currentuser?.fullName || '',
          otherName: currentuser?.otherName || '',
          NIC: currentuser?.NIC || '',
          passportNo: currentuser?.passportNo || '',
          birthday: currentuser?.birthday || new Date('2022-11-01T21:11:54'),
          status: currentuser?.status || 'SINGLE',
          noDependents: currentuser?.noDependents || '',
          address: currentuser?.address || '',
          phoneNumber: currentuser?.phoneNumber || '',
          email: currentuser?.email || '',
          isActivate: currentuser?.isActivate || 'true',
          password: currentuser?.password || '',
          role: currentuser?.role || 'FRONT_DESK',
          remark: currentuser?.remark || '',
          createdAt: currentuser?.createdAt || '',
        })
        console.log(currentuser)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getUserDetails()
  }, [])
  return (
    <Box>
      <HeaderCard
        title={'You are accessing ' + id + ' Account'}
        subheader={
          'You can get all details about the user and also update the user details '
        }
      />
      <Box>
        <Grid container spacing={2} sx={{ marginTop: '10px' }}>
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
              id='passport'
              label='Passport No'
              name='passport'
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
              id='noDependents'
              label='No of Dependents'
              name='noDependents'
              value={userDetails.noDependents}
              onChange={handleChange('noDependents')}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='given-name'
              name='street1'
              required={true}
              fullWidth
              id='street1'
              autoFocus
              value={userDetails.address.street1}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required={true}
              fullWidth
              id='street2'
              name='street2'
              autoComplete='family-name'
              value={userDetails.address.street2}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required={true}
              fullWidth
              id='town'
              name='town'
              value={userDetails.address.town}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required={true}
              fullWidth
              id='city'
              name='city'
              value={userDetails.address.city}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              id='postalCode'
              name='postalCode'
              value={userDetails.address.postalCode}
              disabled={true}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6} sm={6}>
            <TextField
              fullWidth
              name='email'
              type='email'
              id='email'
              value={userDetails.email}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name='password'
              type='password'
              id='password'
              autoComplete='new-password'
              value={userDetails.password}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Role handleChange={handleChange} userDetails={userDetails} />
          </Grid>
        </Grid>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                navigate('/')
              }}
            >
              Discard changes
            </Button>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                updateUser()
              }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
