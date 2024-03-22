"use client";
import React from "react";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import Image from "next/image";
// import EditSkill from "@/app/components/candidate-details/popup/EditSkill";
import EditSoftSkill from "@/app/components/candidate-details/popup/EditSoftSkill";

const Softskills = ({ skills }: { skills: string[] }) => {
  return (
    <>
      <h4 className="dash-title-three">Secondary Skills*</h4>
      <div className="dash-input-wrapper mb-40">
        {/* <label htmlFor="">Add Skills*</label> */}

        <div className="skills-wrapper">
          <ul className="style-none d-flex flex-wrap align-items-center">
            {skills?.map((val, index) => (
              <li key={index} className="is_tag" style={{ padding: "0 22px" }}>
                <button>
                  {val}
                  {/* <i className="bi bi-x"></i> */}
                </button>
              </li>
            ))}

            <li className="more_tag ">
              <button
                data-bs-toggle="modal"
                data-bs-target="#softSkillModal"
                type="button"
                className="d-flex mt-2 justify-content-center align-items-center "
              >
                <Image src={icon_3} height={24} width={24} alt="icon" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <EditSoftSkill />
    </>
  );
};

export default Softskills;
