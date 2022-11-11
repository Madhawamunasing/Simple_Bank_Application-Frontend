import { Button, Card, CardHeader } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../Utils/UserContext'

const HeaderCard = ({ title, subheader }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  return (
    <Card
      variant='elevation'
      sx={{
        overflow: 'visible',
        '& .MuiCardHeader-subheader	': {
          color: 'white',
        },
        paddingLeft: '20px',
      }}
    >
      <CardHeader
        sx={{
          background: 'linear-gradient(to right bottom, #4caf50, #2e7d32)',
          marginLeft: '-20px',
          marginRight: '-20px',
          borderRadius: '5px',
          color: 'white',
        }}
        title={title}
        subheader={subheader}
      />
      {user.role != 'LOAN_SECTION' ? (
        <>
          <Button
            sx={{ width: '100%', fontWeight: 'bolder' }}
            variant='text'
            onClick={() => {
              navigate('/register')
            }}
          >
            Add New Employee or AC Holder
          </Button>
        </>
      ) : (
        <></>
      )}
    </Card>
  )
}

export default HeaderCard
