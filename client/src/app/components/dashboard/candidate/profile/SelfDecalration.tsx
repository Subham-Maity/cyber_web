"use client";

import EditSelfDeclaration from "@/app/components/candidate-details/popup/EditSelfDeclaration";
// import EditLocation from "@/app/components/candidate-details/popup/LocationEdit";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";

const SelfDeclaration = () => {
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const user = currCandidate;

  return (
    <>
      <div className="bg-white card-box border-20 mt-40">
        <div className=" d-flex  justify-content-between ">
          <h4 className="dash-title-three">Self Declaration</h4>
          <button
            data-bs-toggle="modal"
            data-bs-target="#selfDeclarationModal"
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
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                placeholder="M/F/O"
                value={user?.selfDeclaration?.gender}
                readOnly
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="race">Race</label>
              <input
                type="text"
                placeholder="Race"
                value={user?.selfDeclaration?.race}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <EditSelfDeclaration />
    </>
  );
};

export default SelfDeclaration;
