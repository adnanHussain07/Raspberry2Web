import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import moment from 'moment';

export const displayPopup = (msg, type, duration) => (dispatch) => {
  dispatch(showMessage({
    message: msg,
    autoHideDuration: duration ? duration : 2000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    variant: type //success error info warning null
  }));
}

const initialState = {
  dashEmiData: [],
  dashDriverData: [],
  roles: [],
  states: [],
  feedbackFilters: [],
  categories: [],
  filtersData: [],
  reqData: [],
  weightData: [],
  feedbackData: [],
  custData: [],
  notifyData: [],
  shortcuts: [],
  driversData: [],
  usersData: [],
  reqRadio: 14,
  isShowDriver: false,
  isShowUser: false,
  isShowChangePass: false,
  selReqData: {},
  reqPagination: {
    pageNo: 1,
    pageSize: 10,
  },
  userPagination: {
    pageNo: 1,
    pageSize: 10,
  },
  feedbackPagination: {
    pageNo: 1,
    pageSize: 10,
  },
  customerPagination: {
    pageNo: 1,
    pageSize: 10,
  },
  driverPagination: {
    pageNo: 1,
    pageSize: 10,
  },
  weightPagination: {
    pageNo: 1,
    pageSize: 10,
  },
  notificationPagination: {
    pageNo: 1,
    pageSize: 10,
  },
  dashEmiPagination: {
    pageNo: 1,
    pageSize: 10,
  },
  dashDriverPagination: {
    pageNo: 1,
    pageSize: 10,
  },
  userTotalCount: 0,
  reqTotalCount: 0,
  customerTotalCount: 0,
  feedbackTotalCount: 0,
  notificationTotalCount: 0,
  productsTotalCount: 0,
  weightTotalCount: 0,
  dashEmiTotalCount: 0,
  dashDriverTotalCount: 0,
  weightDate: moment(),
  isUserUpdate: false,
  isWeightUpdate: false,
  reqColorData: [],
  reqDriverName: "",
  reqCusName: "",
  reqStateName: "",
  isReqFeed: false,
  weightDateFilter: false,
};

const invitesSlice = createSlice({
  name: 'auth/common',
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setStates: (state, action) => {
      state.states = action.payload;
    },
    setReqData: (state, action) => {
      state.reqData = action.payload;
    },
    setReqRadio: (state, action) => {
      state.reqRadio = action.payload;
    },
    setShortcuts: (state, action) => {
      state.shortcuts = action.payload;
    },
    setShowDriver: (state, action) => {
      state.isShowDriver = action.payload;
    },
    setShowUser: (state, action) => {
      state.isShowUser = action.payload;
    },
    setShowChangePass: (state, action) => {
      state.isShowChangePass = action.payload;
    },
    setSelReqData: (state, action) => {
      state.selReqData = action.payload;
    },
    setFiltersData: (state, action) => {
      state.filtersData = action.payload;
    },
    setProductsData: (state, action) => {
      state.driversData = action.payload;
    },
    setAllUsers: (state, action) => {
      state.usersData = action.payload;
    },
    setCommonInitial: (state, action) => initialState,
    setReqTotalCount: (state, action) => {
      state.reqTotalCount = action.payload;
    },
    setUserTotalCount: (state, action) => {
      state.userTotalCount = action.payload;
    },
    setFeedbackTotalCount: (state, action) => {
      state.feedbackTotalCount = action.payload;
    },
    setCustomerTotalCount: (state, action) => {
      state.customerTotalCount = action.payload;
    },
    setNotificationTotalCount: (state, action) => {
      state.notificationTotalCount = action.payload;
    },
    setProductsTotalCount: (state, action) => {
      state.productsTotalCount = action.payload;
    },
    setDashEmiotalCount: (state, action) => {
      state.dashEmiTotalCount = action.payload;
    },
    setDashDriverotalCount: (state, action) => {
      state.dashDriverTotalCount = action.payload;
    },
    setWeightTotalCount: (state, action) => {
      state.weightTotalCount = action.payload;
    },
    setReqPagination: (state, action) => {
      state.reqPagination = action.payload;
    },
    setUserPagination: (state, action) => {
      state.userPagination = action.payload;
    },
    setFeedbackPagination: (state, action) => {
      state.feedbackPagination = action.payload;
    },
    setCustomerPagination: (state, action) => {
      state.customerPagination = action.payload;
    },
    setNotificationPagination: (state, action) => {
      state.notificationPagination = action.payload;
    },
    setWeightPagination: (state, action) => {
      state.weightPagination = action.payload;
    },
    setDriverPagination: (state, action) => {
      state.driverPagination = action.payload;
    },
    setDashEmiPagination: (state, action) => {
      state.dashEmiPagination = action.payload;
    },
    setDashDriverPagination: (state, action) => {
      state.dashDriverPagination = action.payload;
    },
    setCustomerData: (state, action) => {
      state.custData = action.payload;
    },
    setFeedbackData: (state, action) => {
      state.feedbackData = action.payload;
    },
    setFeedbackFilters: (state, action) => {
      state.feedbackFilters = action.payload;
    },
    setWeightData: (state, action) => {
      state.weightData = action.payload;
    },
    setWeightDate: (state, action) => {
      state.weightDate = action.payload;
    },
    setIsUpdateUser: (state, action) => {
      state.isUserUpdate = action.payload;
    },
    setIsWeightUpdate: (state, action) => {
      state.isWeightUpdate = action.payload;
    },
    setNotifyData: (state, action) => {
      state.notifyData = action.payload;
    },
    setDashboardEmiData: (state, action) => {
      state.dashEmiData = action.payload;
    },
    setDashboardDriverData: (state, action) => {
      state.dashDriverData = action.payload;
    },
    setReqColorData: (state, action) => {
      state.reqColorData = action.payload;
    },
    setReqDriverName: (state, action) => {
      state.reqDriverName = action.payload;
    },
    setReqCusName: (state, action) => {
      state.reqCusName = action.payload;
    },
    setIsReqFeed: (state, action) => {
      state.isReqFeed = action.payload;
    },
    setWeightDateFilter: (state, action) => {
      state.weightDateFilter = action.payload;
    },
    setReqStateName: (state, action) => {
      state.reqStateName = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setRoles,
  setStates,
  setReqData,
  setReqRadio,
  setShortcuts,
  setShowDriver,
  setShowUser,
  setShowChangePass,
  setSelReqData,
  setCategories,
  setFiltersData,
  setProductsData,
  setAllUsers,
  setCommonInitial,
  setUserTotalCount,
  setReqTotalCount,
  setFeedbackTotalCount,
  setCustomerTotalCount,
  setNotificationTotalCount,
  setDashEmiotalCount,
  setDashDriverotalCount,
  setProductsTotalCount,
  setWeightTotalCount,
  setReqPagination,
  setUserPagination,
  setFeedbackPagination,
  setCustomerPagination,
  setNotificationPagination,
  setWeightPagination,
  setDriverPagination,
  setDashEmiPagination,
  setDashDriverPagination,
  setCustomerData,
  setFeedbackData,
  setFeedbackFilters,
  setWeightData,
  setWeightDate,
  setIsUpdateUser,
  setIsWeightUpdate,
  setNotifyData,
  setDashboardEmiData,
  setDashboardDriverData,
  setReqColorData,
  setReqCusName,
  setReqDriverName,
  setIsReqFeed,
  setWeightDateFilter,
  setReqStateName,
} = invitesSlice.actions;

export default invitesSlice.reducer;
