import React, { useEffect, useState } from "react";

import DashboardHeader from "../candidate/dashboard-header";
import AdminEmailSettingArea from "./AdminEmailSettingArea";


type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminEmailSettings = ({ setIsOpenSidebar }: IProps) => {
  
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        <div className="d-flex justify-content-between align-items-center  ">
          <div className=" d-flex gap-3 py-4">
            <h2 className="main-title mb-0">SMTP Settings</h2>
          </div>
        </div>
        {/* <div>
          <div className="dash-input-wrapper input">
            <label htmlFor="host">
              Host:
              <input
                type="text"
                id="host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </label>
            <br />
            <label>
              Port:
              <input
                type="number"
                value={port}
                onChange={(e) => setPort(parseInt(e.target.value, 10))}
              />
            </label>
            <br />
          </div>
          <div className="d-flex ">
            <label className="me-3">Secure:</label>
            <input
              className="form-check d-flex"
              type="checkbox"
              checked={secure}
              onChange={(e) => setSecure(e.target.checked)}
            />
          </div>
   
          <div className="mt-3">
            <div className="dash-input-wrapper input">
              <label>
                User:
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type={showPassword ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </label>
            </div>

            <div className="d-flex ">
              <input
                className="form-check d-flex me-2"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="fs-6 fw-light">Show Password</label>
            </div>
          </div>

          <div className="d-flex justify-content-end ">
            <button
              className="d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center mt-5 "
              onClick={handleSaveSmtp}
            >
              Save
            </button>
          </div>
        </div>*/}
       <AdminEmailSettingArea />
      </div> 
    </div>
  );
};

export default AdminEmailSettings;
