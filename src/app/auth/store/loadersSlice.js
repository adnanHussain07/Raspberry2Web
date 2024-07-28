import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginLoader: false,
  createProfileLoader: true,
  dashboardLoader: true,
  requestLoader: true,
  assignLoader: false,
  accessLoader: true,
  authLoader: false,
  driversLoader: true,
  usersLoader: true,
  customersLoader: true,
  feedbackLoader: true,
  weightLoader: true,
  notifyLoader: true,
  sendNotifyLoader: false,
  /////////old
  registerLoader: false,
  addItemLoader: false,
  addUserLoader: false,
  logsLoader: false,
  usersListLoader: false,
  rentUsersListLoader: false,
};

const invitesSlice = createSlice({
  name: 'auth/loaders',
  initialState,
  reducers: {
    setLoginLoader: (state, action) => {
      state.loginLoader = action.payload;
    },
    setProfileLoader: (state, action) => {
      state.createProfileLoader = action.payload;
    },
    setRequestLoader: (state, action) => {
      state.requestLoader = action.payload;
    },
    setDashboardLoader: (state, action) => {
      state.dashboardLoader = action.payload;
    },
    setAssignLoader: (state, action) => {
      state.assignLoader = action.payload;
    },
    setAccessLoader: (state, action) => {
      state.accessLoader = action.payload;
    },
    setAuthLoader: (state, action) => {
      state.authLoader = action.payload;
    },
    setProductsLoader: (state, action) => {
      state.driversLoader = action.payload;
    },
    setUsersLoader: (state, action) => {
      state.usersLoader = action.payload;
    },
    setLoadersInitial: (state, action) => initialState,
    setCustomersLoader: (state, action) => {
      state.customersLoader = action.payload;
    },
    setFeedbackLoader: (state, action) => {
      state.feedbackLoader = action.payload;
    },
    setWeightLoader: (state, action) => {
      state.weightLoader = action.payload;
    },
    setNotifyLoader: (state, action) => {
      state.notifyLoader = action.payload;
    },
    setSendNotifyLoader: (state, action) => {
      state.sendNotifyLoader = action.payload;
    },
    //////////old
    setRegisterLoader: (state, action) => {
      state.registerLoader = action.payload;
    },
    setAddItemLoader: (state, action) => {
      state.addItemLoader = action.payload;
    },
    setAddUserLoader: (state, action) => {
      state.addUserLoader = action.payload;
    },
    setLogsLoader: (state, action) => {
      state.logsLoader = action.payload;
    },
    setUsersListLoader: (state, action) => {
      state.usersListLoader = action.payload;
    },
    setRentUsersListLoader: (state, action) => {
      state.rentUsersListLoader = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setLoginLoader,
  setProfileLoader,
  setRequestLoader,
  setDashboardLoader,
  setAssignLoader,
  setAccessLoader,
  setAuthLoader,
  setProductsLoader,
  setUsersLoader,
  setLoadersInitial,
  setCustomersLoader,
  setFeedbackLoader,
  setWeightLoader,
  setNotifyLoader,
  setSendNotifyLoader,
  ///////old
  setRegisterLoader,
  setAddItemLoader,
  setAddUserLoader,
  setLogsLoader,
  setUsersListLoader,
  setRentUsersListLoader,
} = invitesSlice.actions;

export default invitesSlice.reducer;
