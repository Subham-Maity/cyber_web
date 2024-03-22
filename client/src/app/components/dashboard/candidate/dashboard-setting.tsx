import React from "react";
import DashboardHeader from "./dashboard-header";
import ChangePasswordArea from "./change-password";
// import { ColorProvider } from '../../themeSelector';
import { AppProps } from 'next/app';
// import YourComponent from "./myApp";
import {handleBackup} from "../../../../redux/backupButton";
import App from "../../themeSelector"

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const DashboardSettingArea = ({setIsOpenSidebar}:IProps,{Component,pageProps}: AppProps) => {
  
  const backup =async () => {
    try{
      const backup = await handleBackup();
      console.log(backup);
    } catch(error){
      console.log(error);
    }
  };
 
  return (
    // <ColorProvider>
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}
        
        <div className="d-flex justify-content-end">
        <button className="dash-btn-two tran3s me-3 rounded-3 " onClick={backup}>backup</button>
        </div>
        <h2 className="main-title">Account Settings</h2>
     
       
     
   

        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Edit & Update</h4>
          <form action="#">
            <div className="row">
              <div className="col-lg-6">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">First Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Last Name</label>
                  <input type="text" placeholder="Kabir" />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Email</label>
                  <input type="email" placeholder="johndoe@example.com" />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Phone Number</label>
                  <input type="tel" placeholder="+810 321 889 021" />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Password</label>
                  <input type="password" />
                </div>
              </div>
            </div>

            <div className="button-group d-inline-flex align-items-center mt-30">
              <a href="#" className="dash-btn-two tran3s me-3 rounded-3">
                Save
              </a>
              <a href="#" className="dash-cancel-btn tran3s">
                Cancel
              </a>
            </div>
          </form>
        </div>


        {/* change password area */}
        <ChangePasswordArea />
        {/* change password area */}
      </div>
      <div className="mt-3">
      <div className="bg-white card-box border-20">             
        <App />
      </div>
      </div> 
    </div>
    // </ColorProvider>
  );
};

export default DashboardSettingArea;
