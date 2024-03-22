import React from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import EditProfile from "@/app/components/employer/popup/EditProfile";

const Profile = () => {
  const { currEmployer, loading } = useAppSelector((state) => state.employer);
  const user = currEmployer;
  return (
    <>
      <div className="d-flex flex-wrap gap-3 justify-content-between     ">
        <div className="dash-input-wrapper mb-30 col-5">
          <label htmlFor="firstName">First Name</label>
          <div className="d-flex align-items-center position-relative">
            <input
              type="text"
              placeholder="James"
              value={user?.firstName}
              readOnly
            />
          </div>
        </div>
        <div className="dash-input-wrapper mb-30 col-5">
          <label htmlFor="lastName">Last Name</label>
          <div className="d-flex  align-items-center position-relative">
            <input
              type="text"
              placeholder="brown"
              value={user?.lastName}
              readOnly
            />
          </div>
        </div>
        <div className="dash-input-wrapper mb-30 col-5">
          <label htmlFor="">Email</label>
          <div className="d-flex align-items-center position-relative">
            <input type="text" value={user?.email} readOnly />
          </div>
        </div>
        <div className="dash-input-wrapper mb-30 col-5">
          <label htmlFor="">Phone Number</label>
          <input
            type="text"
            placeholder="+880 0172380172"
            value={user?.phoneNumber}
            readOnly
          />
          {/* <PhoneInput
          // flags={flags}
          placeholder="Enter phone number"
          value={value}
          onChange={(value: any) => setValue(value)}
        /> */}
          {/* <input type="text" placeholder="Brower" /> */}
        </div>
        <div className="dash-input-wrapper mb-30 col-5">
          <label htmlFor="">Company Name</label>
          <div className="d-flex align-items-center position-relative">
            <input
              type="text"
              placeholder="xyz group"
              value={user?.company?.name}
              readOnly
            />
          </div>
        </div>
        <div className="dash-input-wrapper mb-30 col-5">
          <label htmlFor="">Gender</label>
          <div className="d-flex align-items-center position-relative">
            <input type="text" placeholder="select" value={user?.gender} readOnly />
          </div>
        </div>
        <div className="dash-input-wrapper w-100 ">
          <label htmlFor="bio">Bio</label>

          <div className="d-flex  position-relative">
            <textarea
              value={user?.bio}
              readOnly
              className="size-lg"
              placeholder="Write something interesting about you...."
            ></textarea>
          </div>
        </div>
      </div>
      <EditProfile />
    </>
  );
};

export default Profile;
