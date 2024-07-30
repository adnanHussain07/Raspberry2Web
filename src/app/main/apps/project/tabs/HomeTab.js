import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { selectWidgets } from '../store/widgetsSlice'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import i18next from 'i18next'
import { StoreLabs } from 'app/auth/store/constants'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { loadListModules } from 'app/auth/store/sharedData'
import { Button } from '@mui/material'
import { showMessage } from 'app/store/fuse/messageSlice'
import history from '@history';

const colors = ['blue', 'orange', 'green', 'red']

function HomeTab (props) {
  const { dashDataList, getRole, showModules, setModule, setData } = props
  const widgets = useSelector(selectWidgets)
  const dispatch = useDispatch()

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  function onCardClick (data) {
    if (showModules) {
      history.push({
        pathname: `/apps/sgp/logs`,
        state: data.name
      })
    } else {
      if (data.modules && data.modules.length > 0) {
        setModule(true)
        setData(data.modules)
      } else {
        dispatch(
          showMessage({
            message: `There are no modules`,
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
  }

  return (
    <motion.div
      className='flex flex-wrap'
      variants={container}
      initial='hidden'
      animate='show'
    >
      {dashDataList &&
        dashDataList.length > 0 &&
        dashDataList.map((data, a) => {
          a += 1
          return (
            <motion.div
              variants={item}
              className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'
              onClick={() => onCardClick(data)}
              style={{ cursor: 'pointer' }}
            >
              <Paper
                key={a}
                className='w-full rounded-20 shadow flex flex-col justify-between'
              >
                <div className='flex items-center justify-between px-4 pt-8'>
                  <Typography
                    className='text-16 px-16 font-medium'
                    color='textSecondary'
                  >
                    {/* {StoreLabs.filter(c => c.id == a).length > 0
                    ? StoreLabs.filter(c => c.id == a)[0].name
                    : 'Store Number'} */}
                  </Typography>
                  <IconButton aria-label='more' size='large'>
                    <Icon>addchart</Icon>
                  </IconButton>
                </div>
                <div className='text-center py-12'>
                  <Typography
                    className={`mb-4 text-28 font-semibold leading-none text-${
                      colors[a % colors.length]
                    } tracking-tighter`}
                  >
                    {!showModules
                      ? `${data.company ? data.company : ''}`
                      : `${data.name ? data.name : ''}`}
                  </Typography>
                  {!showModules && (
                    <Typography
                      className={`text-18 font-normal text-${
                        a == 1
                          ? 'blue'
                          : a == 2
                          ? 'orange'
                          : a == 3
                          ? 'green'
                          : a == 4
                          ? 'red'
                          : 'green'
                      }-800`}
                    >
                      {`Total Modules ${
                        data.modules && data.modules.length > 0
                          ? data.modules.length
                          : 0
                      }`}
                    </Typography>
                  )}
                </div>
                <Typography
                  className='p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium'
                  color='textSecondary'
                >
                  <span className='truncate'>
                    {!showModules ? 'Created Date' : 'Head Name'}
                  </span>
                  :
                  <b className='px-8'>
                    {!showModules
                      ? `${
                          data.createdAt
                            ? moment(data.createdAt).format('MMMM D, YYYY h:mm')
                            : ''
                        }`
                      : `${data.head ? data.head : ''}`}
                  </b>
                </Typography>
              </Paper>
            </motion.div>
          )
        })}
    </motion.div>
  )
}

export default HomeTab
