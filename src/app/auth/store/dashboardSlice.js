import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dashStatus: '-1',
};

const sharedData = createSlice({
  name: 'auth/dash',
  initialState,
  reducers: {
    changeDashStatus: (state, action) => {
      state.dashStatus = action.payload;
    },
    setSharedInitial: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { changeDashStatus, setSharedInitial } = sharedData.actions;

export default sharedData.reducer;
