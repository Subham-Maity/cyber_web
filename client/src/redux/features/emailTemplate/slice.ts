import { PayloadAction,createSlice } from "@reduxjs/toolkit";

export interface EmailTemplate{
    _id?: string;
    id:string;
    templateType: string;
    templateName: string;
    subject: string;
    body: string;
    beingUsedFor?:string
    
}
type IForGetAllTemplates = {
  templates: EmailTemplate[];
  totalNumOfPage: number;
  totalTemplate: number;
  
}

export interface EmailTemplateState {
    templates: EmailTemplate[];
    loading: boolean;
    error: string;
    page: number;
    totalNumOfPage: number;
    totalTemplate: number;
    login:string;
    signup:string;
    paymentSuccess:string;
    
    
  }
  
  const initialState: EmailTemplateState = {
    templates: [],
    loading: false,
    error: "",
    page:1,
    totalNumOfPage:1,
    totalTemplate:0,
    login:"",
    signup:"",
    paymentSuccess:"",
    
  };

  export const emailTemplateSlice = createSlice({
    name: "EmailTemplate",
    initialState,
    reducers: {
      fetchEmailTemplateRequest: (state) => {
        state.loading = true;
      },
      setEmailTemplates: (state, action: PayloadAction<IForGetAllTemplates>) => {
        state.templates = action.payload.templates;
      },
      fetchEmailTemplateSuccess: (state, action: PayloadAction<IForGetAllTemplates>) => {
        state.loading = false;
        state.templates = action.payload.templates;
        state.totalNumOfPage = action.payload.totalNumOfPage;
        state.totalTemplate = action.payload.totalTemplate;
        

      },
      addEmailTemplateSuccess: (state, action: PayloadAction<EmailTemplate>) =>{
        state.loading = false;
        state.templates.push(action.payload);
      },
      updateEmailTemplateSuccess: (state, action: PayloadAction<EmailTemplate>) => {
        state.loading = false;
        state.templates = state.templates.map((template) =>
          template.id === action.payload.id ? action.payload : template
        );
      },
      deleteEmailTemplateSuccess: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.templates = state.templates.filter((template) => template.id !== action.payload);
      },
      fetchEmailTemplateError: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
      setPage: (state, action: PayloadAction<number>) => {
        state.page = action.payload;
    },
    setBeingUsedFor: (state,action:PayloadAction<any>) => {
      if(action.payload.usedFor === "login"){
        state.login = action.payload.id as string;
      }
      if(action.payload.usedFor === "signup"){
        state.signup = action.payload.id as string;
      }
      if(action.payload.usedFor === "paymentSuccess"){
        state.paymentSuccess = action.payload.id as string;
      }
    },
    fetchTemplateUsedFor:(state) => {
      state.login = state.login;
      state.signup= state.signup;
      state.paymentSuccess = state.paymentSuccess;
    }
    },
  });

  export const {
    fetchEmailTemplateRequest,
    fetchEmailTemplateSuccess,
    addEmailTemplateSuccess,
    updateEmailTemplateSuccess,
    deleteEmailTemplateSuccess,
    fetchEmailTemplateError,
    setEmailTemplates,
    setPage,
    setBeingUsedFor,
    fetchTemplateUsedFor,
  } = emailTemplateSlice.actions;

  export default emailTemplateSlice.reducer;