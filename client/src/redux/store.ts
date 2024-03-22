import wishlistSlice from './features/wishlist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterSlice from './features/filterJobPostSlice';
import userSlice from './features/user/slice';
import companySlice from './features/company/slice';
import jobPostSlice from './features/jobPost/slice';
import companyFilterSlice from './features/company/filter';
import candidateSlice from './features/candidate/slice';
import candidateFilterSlice from './features/candidate/filterSlice'
import candidateDashboardSlice from "@/redux/features/candidate/dashboardSlice"
import employerSlice from "./features/employer/dashboardSlice"
import jobApplicationSlice from "./features/jobApp/slice"
import globalSlice from './features/globalSlice';
import companyDashboardSlice from './features/company/dashboardSlice';
import languageSlice from './features/languageProvider/slice';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import currencySlice from './features/currencyProvider/slice'; import templateSlice from './features/template/slice';
import subscriptionSlice from './features/subscription/slice';
import adminSlice from './features/admin/slice'; import emailTemplateSlice from './features/emailTemplate/slice';
import smtpConfigSlice from './features/smtpConfig/slice';
import blogSlice from './features/admin/blogSlice';
import modelSlice from './features/model/slice';
import employerJobPostFilterSlice from './features/employer/employerJobPostFilterSlice';
import candidateFilterByJobPostSlice from './features/jobApp/filter-candidates-by-jobapp/candidateFilterByJobPostSlice';
import couponSlice from './features/Coupons/couponSlice';
import paymentSlice  from './features/payments/Slice';
import userFilterSlice from './features/user/filterSlice/userFilterSlice';

const rootReducer = combineReducers({
  user: userSlice
})


const candidate = combineReducers({
  candidateList: candidateSlice,
  candidateFilter: candidateFilterSlice,
  candidateDashboard: candidateDashboardSlice
})
const company = combineReducers({
  companyList: companySlice,
  companyFilter: companyFilterSlice,
  companyDashboard: companyDashboardSlice
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: {
    persistedReducer,
    company,
    candidate,
    employer: employerSlice,
    jobPost: jobPostSlice,
    filter: filterSlice,
    wishlist: wishlistSlice,
    jobApplication: jobApplicationSlice,
    global: globalSlice,
    subscription: subscriptionSlice,
    template: templateSlice,
    language: languageSlice,
    currency: currencySlice,
    admin: adminSlice,
    emailTemplate: emailTemplateSlice,
    smtpConfig: smtpConfigSlice,
    blog: blogSlice,
    model: modelSlice,
    emplyerJobPostFilter: employerJobPostFilterSlice,
    employerCandidateByJobAppFilter:candidateFilterByJobPostSlice,
    coupon: couponSlice,
    payment:paymentSlice,
    userFilter:userFilterSlice,
  },

})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch