"use client";

import EditLocation from "@/app/components/employer/popup/EditLocation";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";

const Location = () => {
  const { currEmployer, loading } = useAppSelector((state) => state.employer);
  const user = currEmployer;

  return (
    <>
      <div className="bg-white card-box border-20 mt-40">
        <div className=" d-flex  justify-content-between ">
          <h4 className="dash-title-three">Address & Location</h4>
          <button
            data-bs-toggle="modal"
            data-bs-target="#empLocationModal"
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
        <div className="row">
          <div className="col-lg-3">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="city">City</label>
              <input
                type="text"
                placeholder="Toronto"
                value={user?.location?.city}
                readOnly
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="">Country</label>
              <input
                type="text"
                placeholder="Canada"
                value={user?.location?.country}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <EditLocation />
    </>
  );
};

export default Location;
