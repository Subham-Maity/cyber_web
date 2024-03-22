"use client";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import DropZone from "@/layouts/dropZone";
import { updateAvatar } from "@/redux/features/candidate/api";
import { setFile, setUploadProgress } from "@/redux/features/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ICandidate } from "@/types/user-type";
import { notifyError, notifySuccess } from "@/utils/toast";
import Image from "next/image";
import avatar from "@/assets/dashboard/images/avatar_04.jpg";
import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboard-header";
import Location from "./profile/Location";
import Social from "./profile/OnTheWeb";
import Profile from "./profile/Profile";
import UploadResume from "./resume/uploadResume";
import Skills from "./resume/Skills";
import Softskills from "./resume/Softskills";
import Experience from "./resume/Experience";
import Education from "./resume/Education";
import Certificate from "./resume/Certification";
import {
  setPhotoFile,
  setPhotoUploadProgress,
} from "@/redux/features/candidate/dashboardSlice";

import SelfDeclaration from "./profile/SelfDecalration";
import Preferences from "./profile/Preferences";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  const user = currCandidate as ICandidate;

  const { photoFile: file } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );

  const handleProfilePhoto = async () => {
    if (!user) {
      notifyError("please Login to upload your resume.");

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
  const handlePhotoChange = (file: File | null) => {
    dispatch(setPhotoFile(file));
  };
     
     const [profileCompletedNotificationShown, setProfileCompletedNotificationShown] = useState(false);

     useEffect(() => {
       if (user?.isProfileCompleted && !profileCompletedNotificationShown) {
        
         notifySuccess("Your profile is completed");
        
         setProfileCompletedNotificationShown(true);
       }
     }, [user?.isProfileCompleted, profileCompletedNotificationShown]);
   

  return (
    <>
      <div className="dashboard-body">
        <div className="position-relative candidates-profile-details">
          {/* header start */}
          <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
          {/* header end */}

          {/* Profile start */}
          <h2 className="main-title">My Profile</h2>
          <div className="bg-white card-box border-20 ">
            <div className="d-flex justify-content-between ">
              <div className="user-avatar-setting d-flex align-items-center mb-30">
                <img
                  width={50}
                  height={50}
                  src={user?.avatar}
                  // src={
                  //   user?.avatar !== "none" || false
                  //     ? (user?.avatar as string)
                  //     : avatar
                  // }
                  alt="avatar"
                  className="lazy-img user-img"
                />
                {!file && (
                  <div className=" upload-btn position-relative tran3s ms-4 me-3">
                    <DropZone
                      setFile={handlePhotoChange}
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
                        <button onClick={() => dispatch(setPhotoFile(null))}>
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
                  data-bs-target="#profileModal"
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

          {/* resume start */}
          <UploadResume resume={user?.resumes} />
          {/* resume end */}

          <div className="bg-white card-box border-20 mt-40">
            {<Skills skills={user?.skills || []} />}
            {<Softskills skills={user?.softSkills || []} />}
          </div>

          <Experience />
          <Education />

          <div className="bg-white card-box border-20 mt-40">
            <Certificate certificate={user?.certificate} />
          </div>

          <div className="bg-white card-box border-20 mt-40">
            <div className=" d-flex justify-content-between ">
              <h4 className="dash-title-three">On the web</h4>
              <button
                data-bs-toggle="modal"
                data-bs-target="#socialModal"
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

          <Location />
          {/* <SelfDeclaration /> */}
          <Preferences />
        </div>
      </div>
    </>
  );
};

export default DashboardProfileArea;
