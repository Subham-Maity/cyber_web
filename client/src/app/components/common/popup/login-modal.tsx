import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../../forms/login-form";
import google from "@/assets/images/icon/google.png";
import { useDispatch } from "react-redux";
import {
  setLoggerWithLn,
  setLoggerWithGoogle,
} from "@/redux/features/userSlice";
// import {  } from "@/redux/features/user/slice";

const LoginModal = () => {
  const [activeTab, setActiveTab] = useState("candidate");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    setIsCheckboxChecked((prev) => !prev);
  };

  const googleHref = isCheckboxChecked
    ? `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/candidate/auth/google`
    : "#";

    const linkedinHref = isCheckboxChecked
    ? `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/candidate/auth/linkedin`
    : "#";

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center">
              <h2>Hi, Welcome Back!</h2>
              {activeTab === "employer" && (
                <p>
                  Still do not have an account?{" "}
                  <a href="#">contact us at register@cyberlevels.com</a>
                </p>
              )}
            </div>
            <div className="form-wrapper m-auto">
              <ul className="nav nav-tabs border-0 mt-30" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#fc1"
                    role="tab"
                    aria-selected="true"
                    tabIndex={-1}
                    onClick={() => handleTabChange("candidate")}
                  >
                    Candidate
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#fc2"
                    role="tab"
                    aria-selected="false"
                    tabIndex={-1}
                    onClick={() => handleTabChange("employer")}
                  >
                    Employer
                  </button>
                </li>
              </ul>
            </div>
            <div className="form-wrapper m-auto">
              {activeTab === "employer" && isCheckboxChecked && <LoginForm />}
              {activeTab === "employer" ? (
                <div className="d-flex align-items-center mt-30 mb-10">
                  <div className="line"></div>
                  <span className="pe-3 ps-3">OR</span>
                  <div className="line"></div>
                </div>
              ) : (
                <div className="d-flex align-items-center mt-30 mb-10">
                  <div className="line"></div>
                  <span className="pe-1 ps-3">*</span>
                  <span className="pe-1 ps-1">*</span>
                  <span className="pe-3 ps-1">*</span>
                  <div className="line"></div>
                </div>
              )}
              
              <div className="row " style={{ padding: "20px" }}>              
                <div className="col-md-6 ">
                <a
          onClick={() => {
            if (isCheckboxChecked) {
              dispatch(setLoggerWithGoogle(activeTab));
            }
          }}
          href={googleHref}
          className={`social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10 ${
            !isCheckboxChecked ? "disabled " : ""
          }`}
          style={{ padding: "20px",  backgroundColor: !isCheckboxChecked ? "lightgrey" : ""   }}
        >
          <Image src={google} alt="google-img" />
          <span className="ps-2">Login with Google</span>
        </a>
                </div>
                <div className="col-md-6">
        <a
          onClick={() => {
            if (isCheckboxChecked) {
              dispatch(setLoggerWithLn(activeTab));
            }
          }}
          href={linkedinHref}
          className={`social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10 ${
            !isCheckboxChecked ? "disabled" : ""
          }`}
          style={{ padding: "20px",  backgroundColor: !isCheckboxChecked ? "lightgrey" : ""  }}
        >
          <Image
            height={30}
            width={30}
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/800px-LinkedIn_icon_circle.svg.png"
            }
            alt="linkedIn-img"
          />
          <span className="ps-2 " style={{ whiteSpace: "nowrap" }}>
            Login with LinkedIn
          </span>
        </a>
      </div>
              </div>
              {/* <p className="text-center mt-10">
                Do not have an account?{" "}
                <Link href="/register" className="fw-500">
                  Sign up
                </Link>
              </p> */}
            </div>
            <div className="d-flex justify-content-center " style={{fontSize:'small'}}>
        <label>
          <input
            type="checkbox"
            checked={isCheckboxChecked}
            onChange={handleCheckboxChange}
            className="me-2"
          />
           I hereby accepts all the Terms and Conditions.
        </label>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
