import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SmtpConfig } from './api';



interface SmtpConfigState {
  data: SmtpConfig | null;
  loading: boolean;
  error: string | null;
}

const initialState: SmtpConfigState = {
  data: null,
  loading: false,
  error: null,
};

const smtpConfigSlice = createSlice({
    name: 'smtpConfig',
    initialState,
        // host: '',
        // port: 0,
        // admin: '',
        // password: '',
        // loading,
        // error,
      
    reducers: {
        setSmtpConfig: (state, action) => {
            return { ...state, ...action.payload };
          },
      fetchSmtpConfigRequest: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchSmtpConfigSuccess: (state, action: PayloadAction<SmtpConfig>) => {
        state.loading = false;
        state.data = action.payload;
      },
      fetchSmtpConfigError: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
      addSmtpConfigSuccess: (state, action: PayloadAction<SmtpConfig>) => {
        state.loading = false;
        state.data=action.payload;
      },
      updateSmtpConfigSuccess: (state, action: PayloadAction<SmtpConfig>) => {
        state.loading = false;
        state.data = action.payload;
        // state.data = state.data.map((config) =>
        //   config.host === action.payload.host ? action.payload : config
        // );
      },
    },
});

export const{
    setSmtpConfig,
    fetchSmtpConfigRequest,
  fetchSmtpConfigSuccess,
  fetchSmtpConfigError,
  addSmtpConfigSuccess,
  updateSmtpConfigSuccess,
} =smtpConfigSlice.actions;

export default smtpConfigSlice.reducer;