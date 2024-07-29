import { useSelector } from 'react-redux'
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

function HomeTab (props) {
  const { dashDataList, getRole } = props
  const widgets = useSelector(selectWidgets)

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
                      a == 1
                        ? 'blue'
                        : a == 2
                        ? 'orange'
                        : a == 3
                        ? 'green'
                        : a == 4
                        ? 'red'
                        : 'green'
                    } tracking-tighter`}
                  >
                    {getRole == 'superadmin'
                      ? `${data.company ? data.company : ''}`
                      : `${data.name ? data.name : ''}`}
                  </Typography>
                  {getRole == 'superadmin' && (
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
                    {getRole == 'superadmin' ? 'Created Date' : 'Head Name'}
                  </span>
                  :
                  <b className='px-8'>
                    {getRole == 'superadmin'
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
