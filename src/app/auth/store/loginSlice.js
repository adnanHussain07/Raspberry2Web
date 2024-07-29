import { createSlice } from '@reduxjs/toolkit'
import { showMessage } from 'app/store/fuse/messageSlice'
import { setUser } from './userSlice'
import history from '@history'
import ds from '../../services/DataService'
import jwt from '../../services/jwtService'
import { setLoginLoader } from './loadersSlice'
import { logoutUser } from './userSlice'
import { Menus, RoleMenus, Roles } from './constants'
import { Menu } from '@mui/material'
import { handleResponse, isEmptyObject } from './commonMethods'
import { displayPopup } from './commonData'

export const submitLogin = body => async dispatch => {
  return ds
    .loginService(body)
    .then(res => {
      dispatch(setLoginLoader(false))
      if (res && res.user && res.user.userId && res.user.role) {
        dispatch(handleResponse('SUCCESSLOGIN', true))
        jwt.setSession(res.user.userId)
        const body = {
          role: [], // guest
          roleid: res.user.role,
          company: res.user.company,
          data: {
            displayName: res.user.name ? res.user.name : 'User',
            photoURL: '',
            email: res.user.name ? res.user.name : '',
            shortcuts: setShortcutMenus(res.user.role)
          }
        }
        localStorage.setItem('ghuid', JSON.stringify(body))
        dispatch(setUser(body))
        dispatch(signedInDefaultRedirect(res.user.role))
      } else {
        if (res && res.error) {
          dispatch(displayPopup(res.error, 'warning', 3000))
        } else {
          dispatch(handleResponse('TRYLATER', false))
        }
      }
    })
    .catch(errors => {
      dispatch(setLoginLoader(false))
      dispatch(handleResponse(errors, false))
      return dispatch(loginError(errors))
    })
}

export const signedInDefaultRedirect = id => (dispatch, getState) => {
  const role = getState().auth.user.roleid ? getState().auth.user.roleid : id
  history.push({
    pathname: '/apps/dashboards/sgp'
    // pathname: '/apps/jic/items',
  })
  // if (Roles.admin == role || Roles.charity == role) {
  //   history.push({
  //     pathname: '/apps/dashboards/redc',
  //   });
  // }
  // else {
  //   history.push({
  //     pathname: '/apps/redc/requests',
  //   });
  // }
}

export const checkGimminie = roleid => dispatch => {
  const isSignIn =
    location.pathname == '' ||
    location.pathname == '/' ||
    location.pathname == '/login'
  const token = localStorage.getItem('userguid')
    ? localStorage.getItem('userguid')
    : false
  if (!token) {
    if (isSignIn) {
      localStorage.clear()
    } else {
      // dispatch(logoutUser());
    }
    return
  }
  if (isSignIn) {
    dispatch(signedInDefaultRedirect(roleid))
  }
}

function setShortcutMenus (role) {
  let result = []
  // if (Roles.admin == role || Roles.staff == role || Roles.charity == role || Roles.external == role) {
  //   result = ['dashboard', 'requests', 'weights', 'customers', 'feedback', 'drivers'];
  // }
  // else if (Roles.driver == role) {
  //   result = ['requests', 'weights', 'feedback', 'drivers'];
  // }
  return result
}

export const assignTiesto = (path, isShorts) => (dispatch, getState) => {
  const role = getState().auth.user.roleid ? getState().auth.user.roleid : ''
  let res = {
    navigation: [],
    shorts: []
  }
  if (role && path && path.length > 0) {
    let pathCheck = path.filter(ax => ax.id == Menus.APP)
    const paths = pathCheck.length > 0 ? pathCheck[0].children : path
    const loginRole =
      RoleMenus.filter(a => a.id == role).length > 0
        ? RoleMenus.filter(a => a.id == role)[0]
        : {}
    if (loginRole && !isEmptyObject(loginRole)) {
      if (isShorts) {
        paths &&
          paths.map(ii => {
            loginRole.access
              .filter(pp => pp == ii.id)
              .map(qq => {
                res.shorts.push(qq)
              })
          })
      } else {
        if (
          pathCheck &&
          pathCheck.length > 0 &&
          pathCheck[0].children &&
          pathCheck[0].children.length > 0
        ) {
          const navis = []
          paths &&
            paths.map(ii => {
              loginRole.access
                .filter(pp => pp == ii.id)
                .map(qq => {
                  if (!ii.children) {
                    navis.push(ii)
                    return
                  } else {
                    const allowedChildren = []
                    ii.children.map(xx => {
                      loginRole.access
                        .filter(zz => zz == xx.id)
                        .map(cc => {
                          allowedChildren.push(xx)
                          return
                        })
                    })
                    ii.children = allowedChildren
                    navis.push(ii)
                    return
                  }
                })
            })
          pathCheck[0].children = navis
          res.navigation = pathCheck
        }
      }
    }
  }
  // if (Roles.admin == role || Roles.staff == role || Roles.charity == role || Roles.external == role) {

  //   res.shorts = [Menus.ITEMS, Menus.REQUESTS, Menus.WEIGHT, Menus.CUSTOMERS, Menus.FEEDBACK, Menus.DRIVERS, Menus.SETTING];
  // }
  // else if (Roles.driver == role) {
  //   res.shorts = [Menus.REQUESTS, Menus.WEIGHT, Menus.CUSTOMERS, Menus.FEEDBACK, Menus.DRIVERS];
  // }
  return res
}

export const checkAccess = path => (dispatch, getState) => {
  const role = getState().auth.user.roleid ? getState().auth.user.roleid : ''
  let res = 'not_allow'
  if (role && path) {
    const loginRole =
      RoleMenus.filter(a => a.id == role).length > 0
        ? RoleMenus.filter(a => a.id == role)[0]
        : {}
    if (loginRole && !isEmptyObject(loginRole)) {
      loginRole.access
        .filter(bb => bb == path)
        .map(aa => {
          res = 'allowed'
          return
        })
    }
  }
  return res
}

export const checkPermission = perm => (dispatch, getState) => {
  const role = getState().auth.user.roleid ? getState().auth.user.roleid : ''
  let res = 'not_allow'
  if (role && perm) {
    const loginRole =
      RoleMenus.filter(a => a.id == role).length > 0
        ? RoleMenus.filter(a => a.id == role)[0]
        : {}
    if (loginRole && !isEmptyObject(loginRole)) {
      loginRole.permissions
        .filter(bb => bb == perm)
        .map(aa => {
          res = 'allowed'
          return
        })
    }
  }
  return res
}

const initialState = {
  success: false,
  errors: []
}

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true
      state.errors = []
    },
    loginError: (state, action) => {
      state.success = false
      state.errors = action.payload
    }
  },
  extraReducers: {}
})

export const { loginSuccess, loginError } = loginSlice.actions

export default loginSlice.reducer
