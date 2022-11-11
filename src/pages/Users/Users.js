import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import UpdateIcon from '@mui/icons-material/Update'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Checkbox from '@mui/material/Checkbox'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import CreditScoreIcon from '@mui/icons-material/CreditScore'
import IOSSwitche from '../../components/Switch/Switch'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import HeaderCard from '../../components/HeaderCard/HeaderCard'
import UserContext from '../../Utils/UserContext'
import DeleteIcon from '@mui/icons-material/Delete'
function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

function createData(userId, fullName, isActivate, createdAt) {
  return { userId, fullName, isActivate, createdAt }
}

let rows = []
const rearange = (users) => {
  let data = users?.map((user) => {
    return createData(
      user.userId,
      user.fullName,
      user.isActivate,
      user.createdAt
    )
  })
  rows = data.sort((a, b) => (a.calories < b.calories ? -1 : 1))
}

export default function PaginationTable({ orders, getOrders }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [userList, setUsers] = useState(null)
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  React.useEffect(() => {
    getUsers()
  }, [])
  const getUsers = () => {
    axios
      .get('/api/v1/users', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('v_'), //the token is a variable which holds the token
        },
      })
      .then((res) => {
        setUsers(res.data?.message)
        rearange(res.data?.message)
      })
      .catch((errr) => {
        console.log(errr)
      })
  }
  const deleteUser = (userId) => {
    axios
      .delete(`/api/v1/users/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('v_'), //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log(res)
        getUsers()
        alert('User deleted')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <HeaderCard
        title={'All Users '}
        subheader={
          'You can find all the users.You can manage  every individual user accounts  and loans wich they have. '
        }
      />
      <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
        <TableBody>
          <TableRow>
            <TableCell component='th' scope='row' align='center'>
              User Id
            </TableCell>
            <TableCell component='th' scope='row' align='center'>
              AC Holder Name
            </TableCell>
            <TableCell component='th' scope='row' align='center'>
              Created At
            </TableCell>
            {user.role != 'LOAN_SECTION' ? (
              <>
                <TableCell style={{ width: 60 }} align='center'>
                  Manage Account
                </TableCell>
              </>
            ) : (
              <></>
            )}

            {user.role == 'LOAN_SECTION' || user.role == 'MANAGER' ? (
              <>
                <TableCell style={{ width: 60 }} align='center'>
                  Loans
                </TableCell>
              </>
            ) : (
              <></>
            )}
            {user.role == 'MANAGER' ? (
              <>
                <TableCell style={{ width: 60 }} align='center'></TableCell>
              </>
            ) : (
              <></>
            )}
          </TableRow>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.userId}>
              <TableCell scope='row' align='center'>
                #{row.userId}
              </TableCell>
              <TableCell scope='row' align='center'>
                {/* {moment(row.createdAt).utc().format('YYYY-MM-DD')} */}
                {row.fullName}
              </TableCell>

              <TableCell align='center'>2022-10-25</TableCell>
              {user.role != 'LOAN_SECTION' ? (
                <>
                  <TableCell style={{ width: 60 }} align='center'>
                    <ManageAccountsIcon
                      onClick={() => {
                        navigate(`/account/${row.userId}`)
                      }}
                    />
                  </TableCell>
                </>
              ) : (
                <></>
              )}

              {user.role == 'LOAN_SECTION' || user.role == 'MANAGER' ? (
                <>
                  <TableCell style={{ width: 60 }} align='center'>
                    <CreditScoreIcon
                      onClick={() => {
                        navigate(`/loan/${row.userId}`)
                      }}
                    />
                  </TableCell>
                </>
              ) : (
                <></>
              )}
              {user.role == 'MANAGER' ? (
                <>
                  <TableCell style={{ width: 60 }} align='center'>
                    <DeleteIcon
                      onClick={() => {
                        deleteUser(row.userId)
                      }}
                    />
                  </TableCell>
                </>
              ) : (
                <></>
              )}
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
