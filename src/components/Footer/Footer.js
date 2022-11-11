import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'

function Copyright() {
  return (
    <Typography variant='body2' style={{ color: 'white' }}>
      {'Copyright © '}
      FIT19 {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box
        component='footer'
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#0E0701',
        }}
      >
        <Container maxWidth='sm'>
          <Copyright />
        </Container>
      </Box>
    </Box>
  )
}
