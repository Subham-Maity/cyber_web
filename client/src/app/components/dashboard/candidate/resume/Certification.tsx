"use client";
import React from "react";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import Image from "next/image";

import EditCertificate from "@/app/components/candidate-details/popup/EditCertificate";

const Certificates = ({ certificate }: { certificate: string[] }) => {
  return (
    <>
      <h4 className="dash-title-three">Certificates and Qualifications</h4>
      <div className="dash-input-wrapper mb-40">       

        <div className="skills-wrapper">
          <ul className="style-none d-flex flex-wrap align-items-center">
            {certificate?.map((val, index) => (
              <li key={index} className="is_tag" style={{ padding: "0 22px" }}>
                <button>
                  {val}              
                </button>
              </li>
            ))}

            <li className="more_tag ">
              <button
                data-bs-toggle="modal"
                data-bs-target="#certificationModal"
                type="button"
                className="d-flex mt-2 justify-content-center align-items-center "
              >
                <Image src={icon_3} height={24} width={24} alt="icon" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <EditCertificate certificates={certificate} />
    </>
  );
};

export default Certificates;
