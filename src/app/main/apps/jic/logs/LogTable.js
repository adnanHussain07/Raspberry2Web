import * as React from 'react'
import FuseScrollbars from '@fuse/core/FuseScrollbars'
import _ from '@lodash'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import Chip from '@mui/material/Chip'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import i18next from 'i18next'
import { withRouter } from 'react-router-dom'
import FuseLoading from '@fuse/core/FuseLoading'
import DriverTableHead from './LogTableHead'
import { setRequestLoader } from 'app/auth/store/loadersSlice'
import { setDriverPagination, setReqRadio } from 'app/auth/store/commonData'
import Button from '@mui/material/Button'
import history from '@history'
import { DateTimeFormat, DefFilters } from 'app/auth/store/constants'
import moment from 'moment'
import {
  changeItemPagination,
  changeLogsPagination
} from 'app/auth/store/sharedData'
import { getStoreName } from 'app/auth/store/commonMethods'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton
} from '@mui/material'
import Slide from '@mui/material/Slide'
import { showMessage } from 'app/store/fuse/messageSlice'
import { env } from '../../../../../env'
const { REACT_APP_API_ENDPOINT } = env
const serverUri = REACT_APP_API_ENDPOINT

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

function LogTable (props) {
  const dispatch = useDispatch()
  const loader = useSelector(({ auth }) => auth.loaders.logsLoader)
  const data = useSelector(({ auth }) =>
    auth.shared.logsData ? auth.shared.logsData : []
  )
  const language = useSelector(({ i18n }) =>
    i18n.language ? i18n.language : ''
  )
  const totalCount = useSelector(({ auth }) =>
    auth.shared.logsTotalCount ? auth.shared.logsTotalCount : 0
  )

  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [open, setOpen] = useState(false)
  const [logData, setDelData] = useState({})
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null
  })

  useEffect(() => {
    let mounted = true
    if (mounted) {
      // setTimeout(() => {
      //   dispatch(setRequestLoader(false));
      // }, 2000);
    }
  }, [])

  function handleChangePage (event, value) {
    const body = {
      pageNo: value + 1,
      pageSize: rowsPerPage
    }
    dispatch(changeLogsPagination(body))
    setPage(value)
  }

  function handleChangeRowsPerPage (event) {
    const body = {
      pageNo: page + 1,
      pageSize: event.target.value
    }
    dispatch(changeLogsPagination(body))
    setRowsPerPage(event.target.value)
  }

  const handleClickOpen = n => {
    if (!open) {
      setDelData(n)
    } else {
      setDelData({})
    }
    setOpen(!open)
  }

  const handleClose = () => {
    handleClickOpen()
  }

  function openVideo (data) {
    if (data && data.videolink) {
      const url = `${serverUri}/video/download/?name=${data.videolink}`
      window.open(url, '_blank')
    } else {
      dispatch(
        showMessage({
          message: `There is no video`,
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          variant: 'info' //success error info warning null
        })
      )
    }
  }

  return loader ? (
    <FuseLoading />
  ) : (
    <div className='w-full flex flex-col'>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
          fullWidth
        >
          <DialogTitle>
            LOG DAY{' '}
            {logData.createdAt
              ? moment(logData.createdAt).format(DateTimeFormat)
              : '--'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id='alert-dialog-slide-description'
              style={{ color: 'black' }}
            >
              {logData.logs}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='primary' onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table stickyHeader className='min-w-xl' aria-labelledby='tableTitle'>
          <DriverTableHead />

          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((n, key) => {
                return (
                  <TableRow
                    className='h-72 cursor-pointer'
                    hover
                    // tabIndex={-1}
                    key={key}
                  >
                    <TableCell
                      className='p-4 md:p-16'
                      component='th'
                      scope='row'
                      align='center'
                    >
                      {n.company ? n.company : ''}
                    </TableCell>
                    <TableCell
                      className='p-4 md:p-16'
                      component='th'
                      scope='row'
                      align='center'
                    >
                      {n.modules ? n.modules : ''}
                    </TableCell>
                    <TableCell
                      className='p-4 md:p-16'
                      component='th'
                      scope='row'
                      align='center'
                    >
                      <IconButton
                        onClick={() => handleClickOpen(n)}
                        color='inherit'
                      >
                        <Icon color='inherit'>history</Icon>
                      </IconButton>
                    </TableCell>
                    <TableCell
                      className='p-4 md:p-16'
                      component='th'
                      scope='row'
                      align='center'
                    >
                      {n.createdAt
                        ? moment(n.createdAt).format(DateTimeFormat)
                        : '--'}
                    </TableCell>
                    <TableCell
                      className='p-4 md:p-16'
                      component='th'
                      scope='row'
                      align='center'
                    >
                      <IconButton onClick={() => openVideo(n)} color='inherit'>
                        <Icon color='inherit'>remove_red_eye</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className='flex-shrink-0 border-t-1'
        component='div'
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default withRouter(LogTable)
