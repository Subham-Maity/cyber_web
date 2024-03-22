"use client";
import React, { useState } from "react";
import Image from "next/image";
import AdminRegisterForm from "../forms/admin-login";
import google from "@/assets/images/icon/google.png";
import { useDispatch } from "react-redux";
import { setLoggerWithLn } from "@/redux/features/userSlice";

const RegisterArea = () => {
  //   const [activeTab, setActiveTab] = useState("candidate");
  //   const handleTabChange = (tab: string) => {
  //     setActiveTab(tab);
  //   };
  //   console.log(activeTab);
  const dispatch = useDispatch();

  return (
    <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
      <div className="container">
        <div className="user-data-form">
          <div className="text-center">
            <h2>Login</h2>
          </div>
          <div className="form-wrapper m-auto">
            {/* <ul className="nav nav-tabs border-0 w-100 mt-30" role="tablist">
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
                  Candidates
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
            </ul> */}
            <div className="tab-content mt-40">
              <div
                className="tab-pane fade show active"
                role="tabpanel"
                id="fc1"
              >
                <AdminRegisterForm role="admin" />
              </div>
              {/* <div className="tab-pane fade" role="tabpanel" id="fc2">
                <RegisterForm role="employer" />
              </div> */}
            </div>

            {/* <div className="d-flex align-items-center mt-30 mb-10">
              <div className="line"></div>
              <span className="pe-3 ps-3">OR</span>
              <div className="line"></div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <a
                  href="#"
                  className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                >
                  <Image src={google} alt="google-img" />
                  <span className="ps-2">Signup with Google</span>
                </a>
              </div>
              <div className="col-sm-6">
                <a
                  onClick={() => dispatch(setLoggerWithLn(activeTab))}
                  href={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/candidate/auth/linkedin`}
                  className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                >
                  <Image
                    height={30}
                    width={30}
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/800px-LinkedIn_icon_circle.svg.png"
                    }
                    alt="linkedIn-img"
                  />
                  <span className="ps-2">Signup with LinkedIn</span>
                </a>
              </div>
            </div>
            <p className="text-center mt-10">
              Have an account?{" "}
              <a
                href="#"
                className="fw-500"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Sign In
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterArea;
