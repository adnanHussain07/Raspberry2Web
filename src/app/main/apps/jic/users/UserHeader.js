import * as React from 'react'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import Input from '@mui/material/Input'
import Paper from '@mui/material/Paper'
import { ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { selectMainTheme } from 'app/store/fuse/settingsSlice'
import { setProductsSearchText } from '../store/productsSlice'
import i18next from 'i18next'
import ds from 'app/services/DataService'
import {
  setProductsLoader,
  setUsersListLoader
} from 'app/auth/store/loadersSlice'
import {
  setProductsData,
  setProductsTotalCount
} from 'app/auth/store/commonData'
import { getUsers } from 'app/auth/store/commonServices'
import { isEmptyObject } from 'app/auth/store/commonMethods'
import moment from 'moment'
import Tooltip from '@mui/material/Tooltip'
import FuseScrollbars from '@fuse/core/FuseScrollbars'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import {
  changeItemStatus,
  changeStoreNbr,
  changeUsersPagination,
  changeUserStatus
} from 'app/auth/store/sharedData'
import { Permissions } from 'app/auth/store/constants'
import { checkPermission } from 'app/auth/store/loginSlice'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

function UserHeader (props) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const mainTheme = useSelector(selectMainTheme)
  const usersPagination = useSelector(({ auth }) => auth.shared.usersPagination)
  const userStatus = useSelector(({ auth }) => auth.shared.userStatus)

  const mdDown = useMediaQuery(theme.breakpoints.down('lg'))

  const [valueFrom, setValueFrom] = React.useState(
    moment().subtract(6, 'months')
  )
  // const [company, setCompany] = useState('')

  // React.useEffect(() => {
  //   let mounted = true;
  //   if (mounted) {
  //     callGo();
  //   }

  //   return () => mounted = false;
  // }, []);

  React.useEffect(() => {
    let mounted = true
    if (mounted) {
      const da = localStorage.getItem('ghuid')
      let company = ''
      if (da) {
        const ad = JSON.parse(da)
        if (ad && ad.roleid && ad.roleid != 'superadmin') {
          company = ad.company
        }
      }
      if (
        usersPagination &&
        !isEmptyObject(usersPagination) &&
        usersPagination.pageNo &&
        usersPagination.pageSize
      ) {
        callGo(company)
      }
    }

    return () => (mounted = false)
  }, [usersPagination])

  function callGo (company) {
    dispatch(setUsersListLoader(true))
    const body = `?pageNo=${usersPagination.pageNo}&count=${usersPagination.pageSize}`
    dispatch(getUsers(body, company))
  }

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className='flex items-center'>
          <Icon
            component={motion.span}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.2 } }}
            className='text-54 md:text-72'
          >
            people
          </Icon>
          <div className='flex flex-col items-center sm:items-start mb-16 sm:mb-0'>
            <Typography
              component={motion.span}
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.2 } }}
              delay={300}
              className='text-16 md:text-24 mx-12 font-semibold'
            >
              Users
            </Typography>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserHeader
