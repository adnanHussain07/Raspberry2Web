import FusePageSimple from '@fuse/core/FusePageSimple'
import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import withReducer from 'app/store/withReducer'
import _ from '@lodash'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import ProjectDashboardAppHeader from './ProjectDashboardAppHeader'
import ProjectDashboardAppSidebar from './ProjectDashboardAppSidebar'
import reducer from './store'
import { getWidgets, selectWidgets } from './store/widgetsSlice'
import BudgetSummaryTab from './tabs/BudgetSummaryTab'
import HomeTab from './tabs/HomeTab'
import TeamMembersTab from './tabs/TeamMembersTab'
import i18next from 'i18next'
import FuseLoading from '@fuse/core/FuseLoading'
import {
  dashboardData,
  getCompanies,
  getModule
} from 'app/auth/store/commonServices'

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 160,
    height: 160,
    [theme.breakpoints.up('lg')]: {
      marginRight: 12,
      borderBottomRightRadius: 20
    }
  },
  '& .FusePageSimple-toolbar': {
    minHeight: 56,
    height: 56,
    alignItems: 'flex-end'
  },
  '& .FusePageSimple-rightSidebar': {
    width: 288,
    border: 0,
    padding: '12px 0'
  },
  '& .FusePageSimple-content': {
    maxHeight: '100%',
    '& canvas': {
      maxHeight: '100%'
    }
  }
}))

function ProjectDashboardApp (props) {
  const dispatch = useDispatch()
  const widgets = useSelector(selectWidgets)
  const loader = useSelector(({ auth }) => auth.loaders.dashboardLoader)
  const listCompanies = useSelector(({ auth }) => auth.shared.listCompanies)
  const modulesCompanies = useSelector(({ auth }) => auth.shared.listCompanies)

  const pageLayout = useRef(null)
  const [tabValue, setTabValue] = useState(0)
  const [getRole, setRole] = useState('')
  const [dashDataList, setDashDataList] = useState([])

  useEffect(() => {
    const da = localStorage.getItem('ghuid')
    if (da) {
      const ad = JSON.parse(da)
      if (ad && ad.roleid) {
        setRole(ad.roleid)
        if (ad.roleid == 'superadmin') dispatch(getCompanies())
        else dispatch(getModule({ company: ad.company ? ad.company : '' }))
      }
    }
  }, [dispatch])

  useEffect(() => {
    let mounted = true
    if (mounted) {
      const da = localStorage.getItem('ghuid')
      debugger
      if (da) {
        const ad = JSON.parse(da)
        if (ad && ad.roleid) {
          setRole(ad.roleid)
          if (ad.roleid == 'superadmin') setDashDataList(listCompanies)
          else setDashDataList(modulesCompanies)
        }
      }
    }
    return () => {
      mounted = false
    }
  }, [listCompanies, modulesCompanies])

  function handleChangeTab (event, value) {
    setTabValue(value)
  }

  return loader ? (
    <FuseLoading />
  ) : (
    <Root
      header={<ProjectDashboardAppHeader pageLayout={pageLayout} />}
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor='secondary'
          textColor='inherit'
          variant='scrollable'
          scrollButtons={false}
          className='w-full px-24 -mx-4 min-h-40'
          classes={{
            indicator: 'flex justify-center bg-transparent w-full h-full'
          }}
          TabIndicatorProps={{
            children: (
              <Box
                sx={{ bgcolor: 'text.disabled' }}
                className='w-full h-full rounded-full opacity-20'
              />
            )
          }}
        >
          <Tab
            className='text-14 font-semibold min-h-40 min-w-64 mx-4 px-12'
            disableRipple
            label={`${
              getRole && getRole == 'superadmin' ? 'Companies' : 'Modules'
            }`}
            key={0}
          />
        </Tabs>
      }
      content={
        <div className='p-12 lg:ltr:pr-0 lg:rtl:pl-0'>
          {tabValue === 0 && <HomeTab dashDataList={dashDataList} getRole={getRole} />}
        </div>
      }
      rightSidebarContent={<ProjectDashboardAppSidebar dashDataList={dashDataList} getRole={getRole} />}
      ref={pageLayout}
    />
  )
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp)
