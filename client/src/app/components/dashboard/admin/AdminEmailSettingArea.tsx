import React, { useEffect, useState } from "react";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import {
  addSmtpConfig,
  getSmtpConfigs,
  updateSmtpConfig,
} from "@/redux/features/smtpConfig/api";
import {
  addSmtpConfigSuccess,
  fetchSmtpConfigError,
  fetchSmtpConfigRequest,
  fetchSmtpConfigSuccess,
  updateSmtpConfigSuccess,
} from "@/redux/features/smtpConfig/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
//   import EditProfile from "@/app/components/candidate-details/popup/EditProfile";
import Edit_SMTP_Settings from "../../candidate-details/popup/Edit_SMTP_Settings";

const AdminEmailSettingArea = () => {
  const dispatch = useAppDispatch();
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const {data} = useAppSelector((state) => state.smtpConfig);
    // console.log(data,"smtp")
//   const [host, setHost] = useState("");
//   const [port, setPort] = useState(587);
//   const [secure, setSecure] = useState(false);
//   const [user, setUser] = useState("");
//   const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch(fetchSmtpConfigRequest());
//         const data = await getSmtpConfigs(dispatch);

//         // Dispatch success action
//         dispatch(fetchSmtpConfigSuccess(data));

//         // Update state based on the fetched SMTP configuration
//         setHost(data.host);
//         setPort(data.port);
//         setSecure(data.secure);
//         setUser(data.user);
//         setPass(data.pass);
//       } catch (error: any) {
//         // Dispatch error action
//         dispatch(fetchSmtpConfigError(error.message));

//         // Handle error
//         console.error("Error fetching SMTP configuration:", error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   const handleSaveSmtp = async () => {
//     const smtpConfig = {
//       host,
//       port,
//       secure,
//       user,
//       pass,
//     };
//     try {
//       const addedSmtp = await updateSmtpConfig(dispatch, smtpConfig);
//       if (addedSmtp) {
//         dispatch(updateSmtpConfigSuccess(addedSmtp));
//         console.log("SMTP Configuration added successfully");
//       }
//     } catch (error) {
//       console.error("Error adding SMTP Configuration:", error);
//       // Handle error, e.g., show an error message to the user
//     }
//   };
useEffect(()=>{
    getSmtpConfigs(dispatch)
  },[])
  return (
    <div className="bg-white card-box border-20 ">
      <div className="d-flex justify-content-between ">
        <div className="user-avatar-setting d-flex align-items-center mb-30">
          {/* <img
            width={50}
            height={50}
            src={currCandidate?.avatar}
            // src={
            //   user?.avatar !== "none" || false
            //     ? (user?.avatar as string)
            //     : avatar
            // }
            alt="avatar"
            className="lazy-img user-img"
          /> */}
          {/* {!file && (
          <div className=" upload-btn position-relative tran3s ms-4 me-3">
            <DropZone
              text={
                user.avatar
                  ? "Update profile photo"
                  : "Upload profile photo"
              }
            />
          </div>
        )} */}
          {/* {file && (
          <>
            <div className="d-flex flex-column justify-content-center   ">
              <button
              //   onClick={handleProfilePhoto}
                className="upload-btn position-relative tran3s ms-4 me-3"
              >
                {"Save"}
              </button>
              <div className="ms-4 mt-1 ">
                <small>
                  Upload square image in .png, .jpeg, max 1mb sized
                </small>
              </div>
            </div>
            <p className="dash-title-three">{file?.name}</p>
          </>
        )} */}
        </div>
        <div>
          <button
            data-bs-toggle="modal"
            data-bs-target="#SMTPEditModel"
            type="button"
            className="apply-btn text-center tran3s"
          >
            <Image
              height={24}
              width={24}
              src={icon_3}
              title="Edit SMTP Settings"
              alt="edit"
            />
          </button>
        </div>
      </div>
      <div className="dash-input-wrapper input">
        <label htmlFor="host">
          Host:
          <input
            type="text"
            id="host"
            value={data?.host}
            //   onChange={(e) => setHost(e.target.value)}
            readOnly
          />
        </label>
        <br />
        <label>
          Port:
          <input
            type="number"
            value={data?.port}
            //   onChange={(e) => setPort(parseInt(e.target.value, 10))}
            readOnly
          />
        </label>
        <br />
      </div>
      <div className="d-flex ">
        <label className="me-3">Secure:</label>
        <input
          className="form-check d-flex"
          type="checkbox"
          checked={data?.secure}
          disabled
          // onChange={(e) => setSecure(e.target.checked)}
          readOnly
        />
      </div>

      <div className="mt-3">
        <div className="dash-input-wrapper input">
          <label>
            User:
            <input
              type="text"
              value={data?.user}
              // onChange={(e) => setUser(e.target.value)}
              readOnly
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type={showPassword ? "text" : "password"}
              value={data?.pass}
              // onChange={(e) => setPass(e.target.value)}
              readOnly
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
        //   onClick={handleSaveSmtp}
        >
          Save
        </button>
      </div>
      {/* <Profile /> */}
      <Edit_SMTP_Settings />
    </div>
  );
};

export default AdminEmailSettingArea;
