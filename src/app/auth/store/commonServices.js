import ds from 'app/services/DataService'
import { setInitialSettings } from 'app/store/fuse/settingsSlice'
import {
  setAllUsers,
  setCustomerData,
  setCustomerTotalCount,
  setDashboardDriverData,
  setDashboardEmiData,
  setProductsData,
  setProductsTotalCount,
  setFeedbackData,
  setFeedbackTotalCount,
  setNotificationTotalCount,
  setNotifyData,
  setReqColorData,
  setReqCusName,
  setReqData,
  setReqDriverName,
  setReqStateName,
  setReqTotalCount,
  setSelReqData,
  setUserTotalCount,
  setWeightData,
  setWeightTotalCount,
  setCommonInitial
} from './commonData'
import { evenOrOdd, handleResponse, isEmptyObject } from './commonMethods'
import { ReqColorCodes } from './constants'
import {
  changeLogsData,
  setSharedInitial,
  changeLogsTotalCount,
  changeUsersTotalCount,
  changeUsersData,
  changeItemPagination,
  loadDashData,
  changeUsersPagination,
  loadUsersData,
  loadListCompanies,
  loadListModules
} from './sharedData'
import {
  setAssignLoader,
  setCustomersLoader,
  setDashboardLoader,
  setProductsLoader,
  setFeedbackLoader,
  setNotifyLoader,
  setRequestLoader,
  setSendNotifyLoader,
  setUsersLoader,
  setWeightLoader,
  setLoadersInitial,
  setLogsLoader,
  setUsersListLoader,
  setRentUsersListLoader
} from './loadersSlice'
import history from '@history'
import fs from 'fs'

export const logoutServiceProvider = () => async dispatch => {
  return ds
    .logoutService()
    .then(res => {
      dispatch(setLoadersInitial())
      dispatch(setSharedInitial())
      dispatch(setInitialSettings())
      history.push({
        pathname: '/login'
      })
      console.log('LOGOUT_DONE')
    })
    .catch(e => {
      dispatch(setLoadersInitial())
      dispatch(setSharedInitial())
      dispatch(setInitialSettings())
      history.push({
        pathname: '/login'
      })
    })
}

export const getProducts = body => async dispatch => {
  dispatch(setProductsLoader(true))
  return ds
    .getAllProductsService(body)
    .then(res => {
      dispatch(setProductsLoader(false))
      if (res.total) {
        dispatch(setProductsTotalCount(res.total))
      } else dispatch(setProductsTotalCount(50))
      if (res && res.products && res.products.length > 0) {
        dispatch(setProductsData(res.products))
      } else {
        dispatch(setProductsData([]))
      }
    })
    .catch(e => {
      dispatch(setProductsTotalCount(0))
      dispatch(setProductsData([]))
      dispatch(setProductsLoader(false))
      dispatch(handleResponse(e, false))
    })
}

export const getUsers = (body, role) => async dispatch => {
  dispatch(setUsersListLoader(true))
  return ds
    .getAllUsersService(body, role)
    .then(res => {
      const data = res.user
      dispatch(setUsersListLoader(false))
      if (res.total) {
        dispatch(changeUsersTotalCount(res.total))
      } else dispatch(changeUsersTotalCount(50))
      if (data && data.length > 0) {
        dispatch(changeUsersData(data))
      } else {
        dispatch(changeUsersData([]))
      }
    })
    .catch(e => {
      dispatch(changeUsersTotalCount(0))
      dispatch(changeUsersData([]))
      dispatch(setUsersListLoader(false))
      dispatch(handleResponse(e, false))
    })
}

export const deleteItem = (body, data, pagination) => async dispatch => {
  dispatch(setProductsLoader(true))
  return ds
    .deleteItemService(body)
    .then(res => {
      dispatch(setProductsLoader(false))
      if (res && res == 'item is removed') {
        dispatch(handleResponse('Success', true, false))
        const bodsy = {
          changeOccur: true,
          pageNo: pagination.pageNo,
          pageSize: pagination.pageSize
        }
        dispatch(changeItemPagination(bodsy))
      }
    })
    .catch(e => {
      dispatch(setProductsLoader(false))
      dispatch(handleResponse(e, false))
    })
}

export const deleteUser = (body, data, pagination) => async dispatch => {
  dispatch(setUsersListLoader(true))
  return ds
    .deleteUserService(body)
    .then(res => {
      dispatch(setUsersListLoader(false))
      if (res && res == 'User is removed') {
        dispatch(handleResponse('Success', true, false))
        const bodys = {
          changeOccur: true,
          pageNo: pagination.pageNo,
          pageSize: pagination.pageSize
        }
        dispatch(changeUsersPagination(bodys))
      }
    })
    .catch(e => {
      dispatch(setUsersListLoader(false))
      dispatch(handleResponse(e, false))
    })
}

export const deleteRegister = (body, data, pagination) => async dispatch => {
  dispatch(setUsersListLoader(true))
  return ds
    .deleteRegisterService(body)
    .then(res => {
      dispatch(setUsersListLoader(false))
      if (res && res.msg && res.msg == 'Success! Register User Removed') {
        dispatch(handleResponse('Success', true, false))
        const bosdy = {
          changeOccur: true,
          pageNo: pagination.pageNo,
          pageSize: pagination.pageSize
        }
        dispatch(changeUsersPagination(bosdy))
      }
    })
    .catch(e => {
      dispatch(setUsersListLoader(false))
      dispatch(handleResponse(e, false))
    })
}

export const editStatusItem =
  (body, data, type, pagination) => async dispatch => {
    dispatch(setProductsLoader(true))
    return ds
      .changeStatusService(body, type)
      .then(res => {
        dispatch(setProductsLoader(false))
        dispatch(handleResponse('Success', true))
        if (data && data.length > 0) {
          const sbody = {
            changeOccur: true,
            pageNo: pagination.pageNo,
            pageSize: pagination.pageSize
          }
          dispatch(changeItemPagination(sbody))
          // const daataa = [];
          // data.map(zx => {
          //   let da = { ...zx };
          //   if (da && da.itemid == body.itemid) {
          //     const statuss = type == 'rent' ? 'rented' :
          //       type == 'avail' ? 'available' :
          //         type == 'maint' ? 'maintenance' : '';
          //     da.status = statuss ? statuss : da.status;
          //   }
          //   daataa.push(da);
          // });
          // dispatch(changeUsersData(daataa));
        }
      })
      .catch(e => {
        dispatch(setProductsLoader(false))
        if (e && e.response && e.response.data) {
          dispatch(handleResponse(e.response.data, true, true))
        } else {
          dispatch(handleResponse(e, false))
        }
      })
  }

export const exportService = body => async dispatch => {
  if (body && body.type) dispatch(setLogsLoader(true))
  else dispatch(setProductsLoader(true))
  return ds
    .spreadSheetService(body)
    .then(res => {
      if (body && body.type) dispatch(setLogsLoader(false))
      else dispatch(setProductsLoader(false))
      if (res) {
        dispatch(handleResponse('Success', true))
        const outputFilename = `${
          body && body.type ? 'logs' : 'items'
        } ${Date.now()}.xlsx`

        // If you want to download file automatically using link attribute.
        const url = URL.createObjectURL(new Blob([res]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', outputFilename)
        document.body.appendChild(link)
        link.click()

        // OR you can save/write file locally.
        // fs.writeFileSync(outputFilename, res);
      }
    })
    .catch(e => {
      if (body && body.type) dispatch(setLogsLoader(false))
      else dispatch(setProductsLoader(false))
      dispatch(handleResponse(e, false))
    })
}

export const dashboardData = () => async dispatch => {
  dispatch(setDashboardLoader(true))
  return ds
    .dashboardService()
    .then(res => {
      dispatch(setDashboardLoader(false))
      if (res && !isEmptyObject(res)) {
        dispatch(loadDashData(res))
      } else {
        dispatch(loadDashData({}))
      }
    })
    .catch(e => {
      dispatch(setDashboardLoader(false))
      dispatch(handleResponse(e, false))
    })
}

export const rentUsersService = body => async dispatch => {
  dispatch(setRentUsersListLoader(true))
  return ds
    .getAllUsersService(body)
    .then(res => {
      dispatch(setRentUsersListLoader(false))
      if (res && res.users && res.users) {
        const data = res.users.map(a => {
          return {
            label: a.name,
            id: a.userid
          }
        })
        dispatch(loadUsersData(data))
      }
    })
    .catch(e => {
      dispatch(setRentUsersListLoader(false))
      dispatch(handleResponse(e, false))
    })
}

export const getLogs = body => async dispatch => {
  dispatch(setLogsLoader(true))
  return ds
    .getAllLogsService(body)
    .then(res => {
      dispatch(setLogsLoader(false))
      if (res.total) {
        dispatch(changeLogsTotalCount(res.total))
      } else dispatch(changeLogsTotalCount(50))
      if (res && res.logs && res.logs.length > 0) {
        dispatch(changeLogsData(res.logs))
      } else {
        dispatch(changeLogsData([]))
      }
    })
    .catch(e => {
      dispatch(changeLogsTotalCount(0))
      dispatch(changeLogsData([]))
      dispatch(setLogsLoader(false))
      dispatch(handleResponse(e, false))
    })
}

////////////////////////////////////////////////////////////////////////////////////////////

export const getCompanies = body => async dispatch => {
  dispatch(setDashboardLoader(true))
  return ds
    .getAllCompaniesService(body)
    .then(res => {
      dispatch(setDashboardLoader(false))
      if (res.company && res.company.length > 0) {
        dispatch(loadListCompanies(res.company))
      }
    })
    .catch(e => {
      dispatch(loadListCompanies([]))
      dispatch(setDashboardLoader(false))
      dispatch(handleResponse(e, false))
    })
}

export const getModule = body => async dispatch => {
  dispatch(setDashboardLoader(true))
  return ds
    .getCompanyModuleService(body)
    .then(res => {
      dispatch(setDashboardLoader(false))
      if (res.modules && res.modules.length > 0) {
        dispatch(loadListModules(res.modules))
      }
    })
    .catch(e => {
      dispatch(loadListModules([]))
      dispatch(setDashboardLoader(false))
      dispatch(handleResponse(e, false))
    })
}

// export const getCompanies = (body) => async (dispatch) => {
//   dispatch(setDashboardLoader(true));
//   return ds
//     .getAllCompaniesService(body)
//     .then(res => {
//       dispatch(setDashboardLoader(false));
//       if (res.company && res.company.length > 0) {
//         dispatch(loadListCompanies(res.company));
//       } else dispatch(setProductsTotalCount(50));
//       if (res && res.products && res.products.length > 0) {
//         dispatch(setProductsData(res.products));
//       } else {
//         dispatch(setProductsData([]));
//       }
//     })
//     .catch(e => {
//       dispatch(setProductsTotalCount(0));
//       dispatch(setProductsData([]));
//       dispatch(setDashboardLoader(false));
//       dispatch(handleResponse(e, false));
//     });
// };

function toFindDuplicates (arry) {
  const result = []
  const reqNos = arry.map(a => {
    return a.reqNo
  })
  if (reqNos && reqNos.length > 0) {
    const dups = reqNos.filter(onlyUnique)
    // const find = xc => xc.filter((item, index) => xc.indexOf(item) !== index)
    // const dups = find(reqNos);
    if (dups && dups.length > 0) {
      dups.map((qq, ii) => {
        const isEven = evenOrOdd(ii)
        const da = {
          id: qq,
          clrCode: isEven == 'even' ? ReqColorCodes.code1 : ReqColorCodes.code2
        }
        result.push(da)
      })
    }
  }

  return result
}

function onlyUnique (value, index, self) {
  return self.indexOf(value) === index
}
