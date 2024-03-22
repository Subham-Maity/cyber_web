import { SmtpConfig, getSmtpConfigs, updateSmtpConfig } from "@/redux/features/smtpConfig/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError, notifySuccess } from "@/utils/toast";
import React, { useEffect, useState } from "react";

const Edit_SMTP_Settings = () => {
    const {data} = useAppSelector((state) => state.smtpConfig)
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<SmtpConfig>({
    host: data?.host||"",
    port: data?.port||"",
    secure: data?.secure||false,
    user: data?.user||"",
    pass: data?.pass||"",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "secure") {
        return {
          ...form,
          [name]: !prev[name],
        };
      } else {
        return {
          ...form,
          [name]: value,
        };
      }
    });
  };
  const handleSaveBtn = async () => {
    try {
        await updateSmtpConfig(dispatch,form)
        notifySuccess("Data Saved")
        await getSmtpConfigs(dispatch);
    } catch (error) {
        notifyError("Data Not Updated.")
    }
  }
 useEffect(() => {
    getSmtpConfigs(dispatch);
 },[])
  return (
    <div
      className="modal fade"
      id="SMTPEditModel"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container-fluid">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="form-wrapper m-auto w-100 ">
              <div>
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor="firstName">Host</label>
                  <input
                    type="text"
                    name="host"
                    onChange={handleInputChange}
                    value={form.host}
                    placeholder="Host"
                  />
                </div>
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor="port">Port</label>
                  <input
                    type="text"
                    name="port"
                    onChange={handleInputChange}
                    value={form.port}
                    placeholder="Port number"
                  />
                </div>

                <div className="d-flex" style={{ alignItems: "center" }}>
                  <label className="me-3">Secure:</label>
                  <input
                    className="form-check d-flex mt-1"
                    type="checkbox"
                    checked={form.secure}
                    //   disabled
                    name="secure"
                    onChange={handleInputChange}
                    //   readOnly
                  />
                </div>
                <div className="mt-3">
                  <div className="dash-input-wrapper input">
                    <label>User:</label>
                    <input
                      type="text"
                      value={form.user}
                      name="user"
                      onChange={handleInputChange}
                      placeholder="Enter User"
                    //   readOnly
                    />
                    <br />
                    <label>Password:</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.pass}
                      name="pass"
                      placeholder="Enter Password"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className=" d-flex ">
                    <input
                      className="form-check d-flex me-2"
                      type="checkbox"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="fs-6 fw-light">Show Password</label>
                  </div>
                </div>
                <div className="button-group d-inline-flex align-items-center mt-30">
                  <button
                    // onClick={handleSave}
                    className="dash-btn-two tran3s me-3"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleSaveBtn}
                  >
                    Save
                  </button>
                  <button
                    className="dash-cancel-btn tran3s"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_SMTP_Settings;
