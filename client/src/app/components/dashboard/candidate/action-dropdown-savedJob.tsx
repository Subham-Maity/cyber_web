import React from "react";
import Image from "next/image";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import Link from "next/link";
import { removeSavedJob } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCompanyBeingEdited } from "@/redux/features/company/slice";
import { deleteCandidateByAdmin, deletedEmployerByAdmin, getAllCandidate, getAllCompany, getAllEmployer, updateCompany } from "@/redux/features/admin/api";
import { notifySuccess } from "@/utils/toast";

const ActionDropdown = ({ id }: { id: string}) => {
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const dispatch = useAppDispatch();
  const{savedJobsPage,loading}=useAppSelector((state) => state.candidate.candidateDashboard);
  const handleDelete = async () => {
    removeSavedJob(dispatch, {
      jobPostId: id, 
      candidateId: currUser,
      page: savedJobsPage,
    });
}  

  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button className="dropdown-item" type="button" onClick={handleDelete}>
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Remove
        </button>
      </li>
    </ul>
  );
};

export default ActionDropdown;
