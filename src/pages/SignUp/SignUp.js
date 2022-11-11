import React, { useEffect, useState } from 'react'
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
import PersonalInfo from './PersonalInfo'
import ConatctInfo from './ContactInfo'
import AccountInfo from './AccountInfo'

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

export default function SignUp() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [password, setPassowrd] = useState(null)
  const [repassword, setRePassowrd] = useState(null)
  const [userDetails, setUserDetails] = useState({
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
  const handleSubmitForm = async (event) => {
    event.preventDefault()
    if (password != repassword) {
      alert('mis')
    } else {
      axios
        .post('/api/v1/users/save', userDetails)
        .then((res) => {
          console.log(res)
          navigate('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const changeStep = (mode) => {
    if (mode === 'plus' && step != 3) {
      setStep((prevStep) => prevStep + 1)
    } else if (mode == 'minus' && step != 1) {
      setStep((prevStep) => prevStep - 1)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main'>
        <CssBaseline />
        <Box
          component='form'
          onSubmit={handleSubmitForm}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {step === 1 ? (
            <>
              <PersonalInfo
                changeStep={changeStep}
                handleChange={handleChange}
                userDetails={userDetails}
              />
            </>
          ) : step === 2 ? (
            <>
              <ConatctInfo
                changeStep={changeStep}
                setUserDetails={setUserDetails}
                userDetails={userDetails}
                handleChange={handleChange}
              />
            </>
          ) : step === 3 ? (
            <>
              <AccountInfo
                changeStep={changeStep}
                step={step}
                handleChange={handleChange}
                userDetails={userDetails}
                setPassowrd={setPassowrd}
                setRePassowrd={setRePassowrd}
                handleSubmitForm={handleSubmitForm}
              />
            </>
          ) : (
            <></>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  )
}
