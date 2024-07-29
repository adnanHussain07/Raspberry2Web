import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  itemStatus: '0',
  storeNbr: '0',
  itemPagination: {
    pageNo: 1,
    pageSize: 10
  },
  logsPagination: {
    pageNo: 1,
    pageSize: 10
  },
  usersPagination: {
    pageNo: 1,
    pageSize: 10
  },
  logsTotalCount: 0,
  usersTotalCount: 0,
  logsData: [],
  usersData: [],
  showAddRegister: false,
  showAddItem: false,
  showAddModule: false,
  showAddUser: false,
  showChangePass: false,
  userStatus: '0',
  logItemName: '',
  dashbaordData: {},
  usersDataList: [],

  ////////////////////////////

  listCompanies: [],
  listModules: []
}

const sharedData = createSlice({
  name: 'auth/shared',
  initialState,
  reducers: {
    changeItemStatus: (state, action) => {
      state.itemStatus = action.payload
    },
    changeStoreNbr: (state, action) => {
      state.storeNbr = action.payload
    },
    changeItemPagination: (state, action) => {
      state.itemPagination = action.payload
    },
    changeshowAddRegister: (state, action) => {
      state.showAddRegister = action.payload
    },
    changeshowAddItem: (state, action) => {
      state.showAddItem = action.payload
    },
    changeshowAddModule: (state, action) => {
      state.showAddModule = action.payload
    },
    changeshowAddUser: (state, action) => {
      state.showAddUser = action.payload
    },
    changeShowResetPass: (state, action) => {
      state.showChangePass = action.payload
    },
    changeLogsData: (state, action) => {
      state.logsData = action.payload
    },
    changeLogsPagination: (state, action) => {
      state.logsPagination = action.payload
    },
    changeLogsTotalCount: (state, action) => {
      state.logsTotalCount = action.payload
    },
    changeUsersData: (state, action) => {
      state.usersData = action.payload
    },
    changeUsersPagination: (state, action) => {
      state.usersPagination = action.payload
    },
    changeUsersTotalCount: (state, action) => {
      state.usersTotalCount = action.payload
    },
    changeUserStatus: (state, action) => {
      state.userStatus = action.payload
    },
    changeLogItemName: (state, action) => {
      state.logItemName = action.payload
    },
    loadDashData: (state, action) => {
      state.dashbaordData = action.payload
    },
    loadUsersData: (state, action) => {
      state.usersDataList = action.payload
    },

    ///////////////////////////

    loadListCompanies: (state, action) => {
      state.listCompanies = action.payload
    },
    loadListModules: (state, action) => {
      state.listModules = action.payload
    },

    setSharedInitial: (state, action) => initialState
  },
  extraReducers: {}
})

export const {
  setSharedInitial,
  changeStoreNbr,
  changeItemStatus,
  changeItemPagination,
  changeshowAddRegister,
  changeshowAddItem,
  changeshowAddUser,
  changeShowResetPass,
  changeLogsData,
  changeLogsPagination,
  changeLogsTotalCount,
  changeUsersData,
  changeUsersPagination,
  changeUsersTotalCount,
  changeUserStatus,
  changeLogItemName,
  loadDashData,
  loadUsersData,
  changeshowAddModule,
  loadListCompanies,
  loadListModules
} = sharedData.actions

export default sharedData.reducer
