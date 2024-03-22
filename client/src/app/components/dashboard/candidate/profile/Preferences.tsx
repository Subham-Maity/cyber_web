"use client";

import EditPreferences from "@/app/components/candidate-details/popup/EditPreferences";
// import EditSelfDeclaration from "@/app/components/candidate-details/popup/EditSelfDeclaration";
// import EditLocation from "@/app/components/candidate-details/popup/LocationEdit";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";

const Preferences = () => {
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const user = currCandidate;

  return (
    <>
      <div className="bg-white card-box border-20 mt-40">
        <div className=" d-flex  justify-content-between ">
          <h4 className="dash-title-three">Preferences</h4>
          <button
            data-bs-toggle="modal"
            data-bs-target="#preferencesModal"
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
          <div className="col-12 row">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="Expected Salaray">Expected Salary</label>
              <input
                type="text"
                placeholder="Currency"
                value={
                  user?.expectedSalary?.currency
                    ? `${user.expectedSalary.currency.symbol} ${user.expectedSalary.currency.name}`
                    : undefined
                }
                readOnly
              />
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-25">
                <input
                  type="text"
                  placeholder="Period"
                  value={user?.expectedSalary?.period}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-25">
                <input
                  type="text"
                  placeholder="minimum"
                  value={user?.expectedSalary?.min}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-25">
                <input
                  type="text"
                  placeholder="Maximum"
                  value={user?.expectedSalary?.max}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="Preferred Job Locations">
                Preferred Job Locations
              </label>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "row",
                }}
                className="skill-input-data align-items-center flex-wrap"
              >
                {user?.preferredLocations?.map((value) => (
                  <button
                    key={value}
                    // onClick={() => removeLocation(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="">Preferred Languages</label>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "row",
                }}
                className="skill-input-data align-items-center flex-wrap"
              >
                {user?.preferredLanguages?.map((value) => (
                  <button
                    key={value}
                    // onClick={() => removeprefLanguages(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditPreferences />
    </>
  );
};

export default Preferences;
