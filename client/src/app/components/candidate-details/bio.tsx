import { ICandidate } from "@/types/user-type";
import React, { useState } from "react";

const CandidateBio = ({ candidate }: { candidate: ICandidate }) => {
  const abbreviatedEmail =
  (candidate.email?.substring(0, 3) || "") + "***@gmail.com";
  return (
    <ul className="style-none">
      <li>
        <span>Location: </span>
        <div>
          {candidate?.location?.city}, {candidate?.location?.country}{" "}
        </div>
      </li>
      {/* <li>
        <span>Age: </span>
        <div>28</div>
      </li> */}
      <li>
        <span>Email: </span>
        <div>
          <a>{abbreviatedEmail}</a>
        </div>
      </li>
      <li>
        <span>Qualification: </span>
        {candidate.education.length > 0 && (
          <div>{candidate.education[0].degree}</div>
        )}
      </li>
      {/* <li>
        <span>Gender: </span>
        <div>{candidate?.gender}</div>
      </li> */}
      <li>
        <span>Expected Salary: </span>
        <div>{candidate?.expectedSalary?.currency?.symbol}{candidate?.expectedSalary?.min}-{candidate?.expectedSalary?.currency?.symbol}{candidate?.expectedSalary?.max} {candidate?.expectedSalary?.period}</div>
      </li>
      {/* <li>
        <span>Social:</span>
        <div>
          <a 
          target="_blank"
          href={candidate?.socialSites?.website} className="me-3">
            <i className="bi bi-globe"></i>
          </a>
          <a 
          target="_blank"
          href={candidate?.socialSites?.github} className="me-3">
            <i className="bi bi-github"></i>
          </a>
          <a
          target="_blank"
          href={candidate?.socialSites?.twitter} className="me-3">
            <i className="bi bi-twitter"></i>
          </a>
          <a
          target="_blank"
          href={candidate?.socialSites?.linkedIn}>
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </li> */}
    </ul>
  );
};

export default CandidateBio;
