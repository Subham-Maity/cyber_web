import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Currency{
  abbreviation:string,
  name:string,
  symbol:string
}
export interface currencyState {
  currencies: Currency[];
  loading: boolean;
  error: string;
}

const initialState: currencyState = {
  currencies: [],
  loading: false,
  error: "",
};

export const currencySlice = createSlice({
  name: "Currency",
  initialState,
  reducers: {
    fetchCurrenciesRequest: (state) => {
      state.loading = true;
    },
    fetchCurrenciesSuccess: (state, action: PayloadAction<Currency[]>) => {
      state.loading = false;
      state.currencies = action.payload;
    },
    fetchCurrenciesError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCurrenciesRequest,
  fetchCurrenciesSuccess,
  fetchCurrenciesError,
} = currencySlice.actions;
export default currencySlice.reducer;
