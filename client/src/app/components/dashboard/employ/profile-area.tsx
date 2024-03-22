"use client";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import DropZone from "@/layouts/dropZone";
import { updateAvatar } from "@/redux/features/employer/api";
import { setFile, setUploadProgress } from "@/redux/features/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IEmployer } from "@/types/user-type";
import { notifyError } from "@/utils/toast";
import Image from "next/image";
import React, { useState } from "react";
import avatar from "@/assets/dashboard/images/avatar_04.jpg";
import DashboardHeader from "../candidate/dashboard-header";
import Location from "./profile/Location";
import Social from "./profile/Social";
import Profile from "./profile/Profile";
import ChangePasswordAreaForEmployer from "./ChangePasswordArea";
import userLogo from "@/assets/images/logo/user-icon.png";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const { currEmployer, loading } = useAppSelector((state) => state.employer);
  const dispatch = useAppDispatch();
  const user = currEmployer as IEmployer;

  const { file } = useAppSelector((s) => s.global);

  const handleProfilePhoto = async () => {
    if (!user) {
      notifyError("please Login to upload your resume.");
      notifyError;
      return;
    }

    const supportedFormat = ["image/jpeg", "image/png"];
    if (!file || !supportedFormat.includes(file?.type) || file.size > 1048576) {
      notifyError("Please upload Profile Photo in supported format.");
      dispatch(setFile(null));
      return;
    }

    const nameArr = file.name.split(".");
    const extension = nameArr[nameArr.length - 1];
    const metaData = {
      extension: extension,
      type: file.type,
      userId: user._id,
      folder: user.role,
    };
    await updateAvatar(dispatch, file, metaData);

    dispatch(setFile(null));
    dispatch(setUploadProgress(0));
  };

  const handleFile = (file: File | null) => {
    dispatch(setFile(file));
  };

  return (
    <>
      {currEmployer && (
        <div className="dashboard-body">
          <div className="position-relative">
            {/* header start */}
            <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
            {/* header end */}

            {/* Profile start */}
            <h2 className="main-title">My Profile</h2>
            <div className="bg-white card-box border-20 ">
              <div className="d-flex justify-content-between ">
                <div className="user-avatar-setting d-flex align-items-center mb-30">
                  <Image
                    width={50}
                    height={50}
                    // src={user?.avatar}
                    src={
                      user?.avatar !== ""
                        ? (user?.avatar as string)
                        : userLogo
                    }
                    alt="avatar"
                    className="lazy-img user-img"
                  />
                  {!file && (
                    <div className=" upload-btn position-relative tran3s ms-4 me-3">
                      <DropZone
                        setFile={handleFile}
                        text={
                          user?.avatar
                            ? "Update profile photo"
                            : "Upload profile photo"
                        }
                      />
                    </div>
                  )}
                  {file && (
                    <>
                      <div className="d-flex flex-column justify-content-center   ">
                      <div className="btn-group">
                        <button
                          onClick={handleProfilePhoto}
                          className="upload-btn position-relative tran3s ms-4 me-3"
                        >
                          {"Save"}
                        </button>
                        <button onClick={() => dispatch(setFile(null))}>
                          Cancel
                        </button>
                      </div>
                        <div className="ms-4 mt-1 ">
                          <small>
                            Upload square image in .png, .jpeg, max 1mb sized
                          </small>
                        </div>
                      </div>
                      <p className="dash-title-three">{file?.name}</p>
                    </>
                  )}
                </div>
                <div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#empProfileModal"
                    type="button"
                    className="apply-btn text-center tran3s"
                  >
                    <Image
                      height={24}
                      width={24}
                      src={icon_3}
                      title="Edit Profile"
                      alt="edit"
                    />
                  </button>
                </div>
              </div>
              <Profile />
            </div>
            {/* Profile end */}

            {/* on the web start */}
            <div className="bg-white card-box border-20 mt-40">
              <div className=" d-flex justify-content-between ">
                <h4 className="dash-title-three">On the web</h4>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#empSocialModal"
                  type="button"
                  className="apply-btn text-center tran3s"
                >
                  <Image
                    height={24}
                    width={24}
                    src={icon_3}
                    title="Edit Social"
                    alt="Edit Social"
                  />
                </button>
              </div>
              <Social />
            </div>
            {/* on the web end */}

            {/*location start */}
            <Location />
            {/*location end */}
            {currEmployer?.provider==="Admin" && <ChangePasswordAreaForEmployer />}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardProfileArea;
