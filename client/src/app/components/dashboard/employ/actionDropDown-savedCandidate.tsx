import React from "react";
import Image from "next/image";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import { removeCandidate } from "@/redux/features/employer/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const ActionDropdown = ({ id }: { id: string }) => {
  const { page, loading } = useAppSelector(
    (state) => state.employer
  );
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    removeCandidate(dispatch, {
      candidateId:id,
      employerId:currUser,
      page: page,
    });
  };
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
