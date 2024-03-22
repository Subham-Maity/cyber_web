import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelState {
  profileCompleteModel: boolean;
  subscriptionModel: boolean;
  subscriptionModelEmployer: boolean;
}

const initialState: ModelState = {
  profileCompleteModel: false,
  subscriptionModel: false,
  subscriptionModelEmployer: false,
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setProfileCompleteModel: (state, action: PayloadAction<boolean>) => {
      state.profileCompleteModel = action.payload;
    },
    setSubscriptionModel: (state, action: PayloadAction<boolean>) => {
      state.subscriptionModel = action.payload;
    },
    setSubscriptionModelEmployer: (state, action: PayloadAction<boolean>) => {
      state.subscriptionModelEmployer = action.payload;
    },
  },
});

export const {
  setProfileCompleteModel,
  setSubscriptionModel,
  setSubscriptionModelEmployer,
} = modelSlice.actions;
export default modelSlice.reducer;
