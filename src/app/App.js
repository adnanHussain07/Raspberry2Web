import FuseAuthorization from '@fuse/core/FuseAuthorization'
import FuseLayout from '@fuse/core/FuseLayout'
import FuseTheme from '@fuse/core/FuseTheme'
import history from '@history'
import { Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import rtlPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { selectCurrLangDir } from 'app/store/i18nSlice'
import withAppProviders from './withAppProviders'
import { Auth } from './auth'
import { useEffect } from 'react'
import { getCompanies, getModule } from './auth/store/commonServices'

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
  rtl: {
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
    prepend: true
  },
  ltr: {
    key: 'muiltr',
    stylisPlugins: [],
    prepend: true
  }
}

const App = () => {
  const langDirection = useSelector(selectCurrLangDir)
  const dispatch = useDispatch()

  useEffect(() => {
    const da = localStorage.getItem('ghuid')
    if (da) {
      const ad = JSON.parse(da)
      if (ad && ad.roleid) {
        if (ad.roleid == 'superadmin') dispatch(getCompanies())
        else dispatch(getModule({ company: ad.company ? ad.company : '' }))
      }
    }
  }, [localStorage.getItem('ghuid')])

  return (
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <Auth>
        <Router history={history}>
          <FuseAuthorization>
            <FuseTheme>
              <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                classes={{
                  containerRoot:
                    'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
                }}
              >
                <FuseLayout />
              </SnackbarProvider>
            </FuseTheme>
          </FuseAuthorization>
        </Router>
      </Auth>
    </CacheProvider>
  )
}

export default withAppProviders(App)()
