import { changePassword } from "@/redux/features/employer/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Loader from "@/ui/loader";
import { notifyError } from "@/utils/toast";
import React, { useState } from "react";


const ChangePasswordAreaForEmployer = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {loading} = useAppSelector((state) => state.employer)
    const dispatch = useAppDispatch();
    const handleChangePassword = async () => {
        if(!currentPassword){
            notifyError("Please enter current password")
            return ;
        } 
        if(!newPassword){
            notifyError("Please enter new password")
            return ;
        }
        if(!confirmPassword){
            notifyError("Please enter confirm password")
            return ;
        }
        const bodyObj = {
            currentPassword,
            newPassword,
            confirmPassword,
        }
        await changePassword(dispatch,bodyObj);

    }
  return (
    <div className="mt-45">
      <div className="position-relative">

        <h2 className="main-title">Change Password</h2>

        <div className="bg-white card-box border-20">
          <form >
            <div className="row">
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Old Password*</label>
                  <input type="password" onChange={(e) => setCurrentPassword(e.target.value)}/>
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">New Password*</label>
                  <input type="password" onChange={(e) => setNewPassword(e.target.value)}/>
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Confirm Password*</label>
                  <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
              </div>
            </div>

            <div className="button-group d-inline-flex align-items-center">
              <button className="dash-btn-two tran3s rounded-3" onClick={handleChangePassword} type="button">
                {loading? <Loader />:"Save & Updated"}
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default ChangePasswordAreaForEmployer;
