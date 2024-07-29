import Divider from '@mui/material/Divider'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { memo } from 'react'
import i18next from 'i18next'
import { useSelector } from 'react-redux'

function WidgetWeather (props) {
  const { dashDataList, getRole } = props

  return (
    <Paper className='w-full rounded-20 shadow flex flex-col justify-between'>
      <div className='flex items-center justify-between px-4 pt-0'>
        <div className='flex items-center px-16'>
          <Icon color='action'>location_on</Icon>
          <Typography
            className='text-16 mx-8 font-medium'
            color='textSecondary'
          >
            {getRole == 'superadmin'
              ? i18next.t(`navigation:TOTALSTORES`)
              : 'Total Modules'}
          </Typography>
        </div>
        <IconButton aria-label='more' size='large'>
          <Icon>layers</Icon>
        </IconButton>
      </div>
      <div className='flex items-center justify-center p-6'>
        <Typography
          className='text-44 font-medium tracking-tighter'
          color='textSecondary'
        >
          {dashDataList && dashDataList.length > 0 ? dashDataList.length : 0}
        </Typography>
      </div>
      <div className='flex items-center justify-center pb-12'>
        <Typography className='font-semibold'>
          {getRole == 'superadmin'
            ? 'Total Number of Companies'
            : 'Total Number of Modules'}
        </Typography>
      </div>
      <Divider />
    </Paper>
  )
}

export default memo(WidgetWeather)
